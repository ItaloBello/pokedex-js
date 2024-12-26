const offset = 0
const limit = 10
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

const pokemonListHTML = document.getElementById('pokemonList')

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon">
                <span class="number">#001</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        <li class="type">Grass</li>
                        <li class="type">Poison</li>
                    </ol>
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
                        alt="${pokemon.name}">
                </div>
            </li>
    `
}

//fetch manda um GET para o servidor da URL
fetch(url)
    //response.json() converte o resultado do GET de um readeableStream para um JSON
    .then((response) => response.json())//se deu tudo certo  
    .then((jsonBody) => jsonBody.results)//este novo then recebe como parametro o retorno do then anterior, pego so o results, onde estao os pokemons no JSON
    .then((pokemonList) => {
        console.log(pokemonList)
        for (let i = 0; i < pokemonList.length; i++) {
            const pokemon = pokemonList[i]
            pokemonListHTML.innerHTML += convertPokemonToLi(pokemon)
        }
    })
    .catch((error) => console.log(error))//se deu erro
    .finally(() => console.log("Requisicao concluida"))//faça isso no fim da requisiçao

