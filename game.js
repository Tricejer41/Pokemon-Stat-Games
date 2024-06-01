const maxPokemonID = 1025;
const statsList = ['hp', 'attack', 'defense', 'sp_attack', 'sp_defense', 'speed'];

let selectedStat = 'speed';
let currentPokemon = [];

// Función para obtener un entero aleatorio
function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
}

// Función para obtener los datos de los Pokémon desde la API
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

// Función para obtener 8 Pokémon aleatorios
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

// Función para obtener una estadística aleatoria
function getRandomStat() {
    return statsList[getRandomInt(statsList.length) - 1];
}

// Función para actualizar la estadística seleccionada en la interfaz
function updateSelectedStat() {
    const selectedStatElement = document.getElementById('selected-stat');
    selectedStatElement.textContent = `Stat: ${selectedStat.charAt(0).toUpperCase() + selectedStat.slice(1)}`;
}

// Función para renderizar los Pokémon en la interfaz
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

// Función para iniciar la carrera
function startRace() {
    currentPokemon.forEach(pokemon => {
        const bar = document.getElementById(`${pokemon.name}-bar`);
        const value = document.getElementById(`${pokemon.name}-value`);
        const stat = pokemon.stats[selectedStat];

        // Calcular la duración basada en el valor de la estadística (estadística más alta, duración más corta)
        const duration = (100 / stat) * 2; // 2 segundos para llenar el 100% para el valor de estadística de 100

        bar.style.transition = `width ${duration}s linear`;
        bar.style.width = '100%';

        setTimeout(() => {
            value.textContent = stat;
        }, duration * 1000);
    });
}

// Función para reiniciar la carrera
async function resetRace() {
    currentPokemon = await getRandomPokemon();
    selectedStat = getRandomStat();
    updateSelectedStat();
    renderPokemon();
}

// Inicialización
resetRace();
