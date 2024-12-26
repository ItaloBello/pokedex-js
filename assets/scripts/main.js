const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById("loadMoreButton")
const modal = document.getElementById("modal")
const body = document.querySelector('body')

const limit = 10
let offset = 0

const maxRecods =151

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons) => {
        const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
                <button type="button" class="pokemonDetail" id="#${pokemon.number}" onclick="openModal(${pokemon.number})"> More...</button>
            </li>
        `).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordNextPage = offset + limit
    if (qtdRecordNextPage >= maxRecods) {
        const newLimit = maxRecods - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
        //loadMoreButton.style.display = 'none'

    } else
        loadPokemonItens(offset, limit)

})

function openModal(idPokemon){
    modal.style.display = 'flex'
    pokeApi.getPokemons((idPokemon-1), 1)
        .then((pokemons) =>{
            const newModal = pokemons.map((pokemon)=>`
                    <div class="box ${pokemon.type}">
                        <div class="head ${pokemon.type}">
                            <span class="number">#${pokemon.number}</span>
                            <span class="name">${pokemon.name}</span>
                            <button onclick="closeModal()">X</button>
                        </div>
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                        <div class="details">
                            <span class="height">Height: ${pokemon.height} m</span>
                            <span class="weight">Weight: ${pokemon.weight} kg</span>
                            <span class="abilities">Abilities:</span>
                            <ul class="abilitiesList">
                                ${pokemon.abilities.map((ability) => `<li class="ability">${ability}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
            `)
            modal.innerHTML += newModal;
        })

}

function closeModal(){
    modal.style.display = 'none'
    modal.innerHTML = ''
}