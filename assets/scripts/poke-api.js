/*
    Arquivo para a manipulação da PokeAPI, pegar os dados da API e converter para um JSON formatado
*/
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.number = pokeDetail.id

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.weight = pokeDetail.weight/10.0
    pokemon.height = pokeDetail.height/10.0

    const abilities = pokeDetail.abilities.map((abbSlot)=>abbSlot.ability.name)
    pokemon.abilities = abilities
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        //response.json() converte o resultado do GET de um readeableStream para um JSON
        .then((response) => response.json())//se deu tudo certo no fetch, execute isso
        .then((jsonBody) => jsonBody.results)//este novo then recebe como parametro o retorno do then anterior, pego so o results, onde estao os pokemons no JSON
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))//transformando a lista de Pokemons em uma lista de promisses dos detalhes do pokemon ja transformada em JSON
        .then((detailRequests => Promise.all(detailRequests)))//esperara todas as requesições para ter uma lista de detalhes
        .then((pokemonsDetails => pokemonsDetails))
}