const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" id="pokemon-${pokemon.number}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function openPokemon(pokemon) {
    const modal = document.getElementById('pokemonModal');
    const modalBody = document.getElementById('modalBody');

    const ability = document.getElementById('abilidades');

    modal.style.display = 'block';

    modalBody.innerHTML = convertPokemonToLi(pokemon)
    ability.innerHTML = `<p class="number"># Weight: ${pokemon.weight}</p>
                         <p class="number"># Height: ${pokemon.height}</p>
                         <p class="number"># Experience: ${pokemon.base_experience}</p>
    `
    // Fechar o modal
    const closeButton = document.querySelector('.close');
    closeButton.onclick = function() {
        modal.style.display = 'none';
    }

    // Fechar ao clicar fora do modal
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml

        pokemons.forEach((pokemon) => {
            const pokemonElement = document.getElementById(`pokemon-${pokemon.number}`)
            pokemonElement.addEventListener('click', () => {
                openPokemon(pokemon);
            })
        })

    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})