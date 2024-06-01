const maxPokemonID = 1025;
const statsList = ['hp', 'attack', 'defense', 'sp_attack', 'sp_defense', 'speed'];
let currentPokemon = [];
let selectedStat = 'speed';
let currentRound = 1;
const totalRounds = 5;

function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
}

async function getPokemonData(pokemonID) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
    const data = await response.json();
    return {
        name: data.name,
        id: data.id,
        stats: {
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            sp_attack: data.stats[3].base_stat,
            sp_defense: data.stats[4].base_stat,
            speed: data.stats[5].base_stat,
        }
    };
}

async function getRandomPokemon() {
    const pokemonSet = new Set();
    while (pokemonSet.size < 8) {
        const randomID = getRandomInt(maxPokemonID);
        pokemonSet.add(randomID);
    }
    
    const pokemonPromises = Array.from(pokemonSet).map(id => getPokemonData(id));
    const pokemonData = await Promise.all(pokemonPromises);
    return pokemonData;
}

function getRandomStat() {
    return statsList[getRandomInt(statsList.length) - 1];
}

function updateSelectedStat() {
    const selectedStatElement = document.getElementById('selected-stat');
    selectedStatElement.textContent = `Stat: ${selectedStat.charAt(0).toUpperCase() + selectedStat.slice(1)}`;
}

function updateRoundIndicator() {
    const roundIndicator = document.getElementById('round-indicator');
    roundIndicator.textContent = `Ronda: ${currentRound}/${totalRounds}`;
}

function renderPokemon() {
    const container = document.getElementById('pokemon-container');
    container.innerHTML = '';
    currentPokemon.forEach(p => {
        const pokemonDiv = document.createElement('div');
        pokemonDiv.classList.add('pokemon');
        pokemonDiv.innerHTML = `
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png" alt="${p.name}" class="pokemon-sprite">
            <div class="stat-bar-container">
                <div class="stat-bar ${p.name}" id="${p.name}-bar"></div>
            </div>
            <div class="stat-value" id="${p.name}-value"></div>
        `;
        container.appendChild(pokemonDiv);
    });
}

function startRace() {
    currentPokemon.forEach(pokemon => {
        const bar = document.getElementById(`${pokemon.name}-bar`);
        const value = document.getElementById(`${pokemon.name}-value`);
        const stat = pokemon.stats[selectedStat];

        const duration = (100 / stat) * 2;

        bar.style.transition = `width ${duration}s linear`;
        bar.style.width = '100%';

        setTimeout(() => {
            value.textContent = stat;
            if (currentPokemon.every(p => document.getElementById(`${p.name}-value`).textContent)) {
                document.getElementById('next-button').style.display = 'inline-block';
            }
        }, duration * 1000);
    });
}

async function nextRound() {
    if (currentRound < totalRounds) {
        currentRound++;
        document.getElementById('next-button').style.display = 'none';
        await resetRace();
    } else {
        window.location.href = 'end.html';
    }
}

async function resetRace() {
    currentPokemon = await getRandomPokemon();
    selectedStat = getRandomStat();
    updateSelectedStat();
    updateRoundIndicator();
    renderPokemon();
}

// Inicialización
resetRace();
