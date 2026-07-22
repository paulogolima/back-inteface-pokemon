const API_URL = '/api/pokemons'

const coverLeft = document.querySelector('.cover-left')
const coverRight = document.querySelector('.cover-right')
const btnPokemon = document.querySelector('.btnPokemon')
const btnExit = document.querySelector('.btnExit')
const listPokemons = document.querySelector('.list-pokemons')
const pokemonTitle = document.querySelector('.pokemon-title')
const pokemonInfo = document.querySelector('.pokemon-information')
const pokemonTypeContainer = document.querySelector('.pokemon-type-container')
const menuItems = document.querySelectorAll('.menu-item')

const typeColors = {
    normal: '#c6c6a7',
    fogo: '#f5ac78',
    água: '#9db7f5',
    agua: '#9db7f5',
    grama: '#a7db8d',
    eletrico: '#fae078',
    elétrico: '#fae078',
    inseto: '#c6d16e',
    veneneno: '#b97fc9',
    veneno: '#b97fc9',
    terrestre: '#e0c068',
    pedra: '#b8a038',
    voador: '#a890f0',
    psíquico: '#f85888',
    psiquico: '#f85888',
    gelo: '#98d8d8',
    lutador: '#c03028',
    fantasma: '#705898',
    dragão: '#7038f8',
    dragao: '#7038f8',
    fada: '#ee99ac',
    aço: '#b8b8d0',
    aco: '#b8b8d0',
}

let pokemonsCache = []

function formatId(id) {
    return String(id).padStart(3, '0')
}

function normalizeType(type) {
    return String(type || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
}

function colorForType(type) {
    const normalized = normalizeType(type)
    return typeColors[normalized] || '#9ca3af'
}

function openPokedex() {
    if (coverLeft.classList.contains('left-0')) {
        coverLeft.classList.remove('left-0')
        coverRight.classList.remove('left-1/2')
        coverLeft.classList.add('-left-[120%]')
        coverRight.classList.add('left-[120%]')
    }
}

function closePokedex() {
    if (!coverLeft.classList.contains('left-0')) {
        coverLeft.classList.add('left-0')
        coverRight.classList.add('left-1/2')
        coverLeft.classList.remove('-left-[120%]')
        coverRight.classList.remove('left-[120%]')
    }
}

function renderPokemonDetails(pokemon) {
    pokemonTitle.textContent = `${formatId(pokemon.id_pokemon)} ${pokemon.nome_pokemon}`

    const stats = [
        ['HP', pokemon.hp],
        ['Attack', pokemon.ataque],
        ['Defense', pokemon.defesa],
        ['Special Attack', pokemon.ataque_especial],
        ['Special Defense', pokemon.defesa_especial],
        ['Speed', pokemon.velocidade],
    ]

    pokemonInfo.innerHTML = stats
        .map(([label, value]) => `<span class="pokemon-stats">${label}</span><span class="pokemon-stats">${value}</span>`)
        .join('')

    const types = [pokemon.tipo_1, pokemon.tipo_2].filter(Boolean)
    pokemonTypeContainer.innerHTML = types
        .map((type) => {
            const normalized = normalizeType(type)
            const color = colorForType(type)
            return `<div class="pokemon-type ${normalized}" style="background:${color}">${String(type).toUpperCase()}</div>`
        })
        .join('')
}

function renderPokemons(pokemons) {
    if (!listPokemons) return

    listPokemons.innerHTML = ''

    pokemons.forEach((pokemon, index) => {
        const item = document.createElement('li')
        item.className = 'pokemon'
        item.innerHTML = `
            <img src="assets/icons/pokeball_icon.png" alt="">
            <span>${formatId(pokemon.id_pokemon)} ${pokemon.nome_pokemon}</span>
        `

        item.addEventListener('click', () => {
            renderPokemonDetails(pokemon)
        })

        listPokemons.appendChild(item)

        if (index === 0) {
            renderPokemonDetails(pokemon)
        }
    })
}

async function loadPokemons() {
    try {
        if (listPokemons) {
            listPokemons.innerHTML = '<li class="pokemon"><span>Carregando...</span></li>'
        }

        const response = await fetch(API_URL)
        if (!response.ok) {
            throw new Error('Falha ao carregar pokemons')
        }

        pokemonsCache = await response.json()
        renderPokemons(pokemonsCache)
    } catch (error) {
        console.error(error)
        if (listPokemons) {
            listPokemons.innerHTML = '<li class="pokemon"><span>Erro ao carregar a Pokédex</span></li>'
        }
    }
}

btnPokemon?.addEventListener('click', async () => {
    openPokedex()
    if (!pokemonsCache.length) {
        await loadPokemons()
    }
})

btnExit?.addEventListener('click', () => {
    closePokedex()
})

menuItems.forEach((item) => {
    if (item.classList.contains('btnExit') || item.classList.contains('btnPokemon')) {
        return
    }

    item.addEventListener('click', () => {
        closePokedex()
    })
})

loadPokemons()