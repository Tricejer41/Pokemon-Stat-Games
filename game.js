const allPokemon = [
    { name: 'charizard', id: 6 },
    { name: 'blastoise', id: 9 },
    { name: 'pikachu', id: 25 },
    { name: 'slowpoke', id: 79 },
    { name: 'electrode', id: 101 },
    { name: 'bulbasaur', id: 1 },
    { name: 'squirtle', id: 7 },
    { name: 'jigglypuff', id: 39 },
    { name: 'meowth', id: 52 },
    { name: 'psyduck', id: 54 },
    { name: 'charmander', id: 4 },
    { name: 'wartortle', id: 8 },
    { name: 'raichu', id: 26 },
    { name: 'magikarp', id: 129 },
    { name: 'gengar', id: 94 },
    { name: 'onix', id: 95 },
    { name: 'snorlax', id: 143 },
    { name: 'mewtwo', id: 150 },
    { name: 'mew', id: 151 },
    { name: 'pidgey', id: 16 }
];

const statsList = ['speed', 'attack', 'defense'];

let selectedStat = 'speed';
let currentPokemon = [];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomPokemon() {
    const pokemon = [];
    while (pokemon.length < 8) { // Cambiamos de 10 a 8
        const randomIndex = getRandomInt(allPokemon.length);
        const selected = allPokemon[randomIndex];
        if (!pokemon.includes(selected)) {
            pokemon.push(selected);
        }
    }
    return pokemon;
}

function getRandomStat() {
    return statsList[getRandomInt(statsList.length)];
}

function updateSelectedStat() {
    const selectedStatElement = document.getElementById('selected-stat');
    selectedStatElement.textContent = `Stat: ${selectedStat.charAt(0).toUpperCase() + selectedStat.slice(1)}`;
}

function renderPokemon() {
    const container = document.getElementById('pokemon-container');
    container.innerHTML = '';
    currentPokemon.forEach((p, index) => {
        const pokemonDiv = document.createElement('div');
        pokemonDiv.classList.add('pokemon');
        pokemonDiv.innerHTML = `
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png" alt="${p.name}" class="pokemon-sprite">
            <div class="stat-bar-container">
                <div class="stat-bar bar-${index + 1}" id="${p.name}-bar"></div>
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
        const stat = getRandomInt(100); // Generar un valor aleatorio de 0 a 100 para la estadística

        // Calcular la duración basada en el valor de la estadística (estadística más alta, duración más corta)
        const duration = (100 / stat) * 2; // 2 segundos para llenar el 100% para el valor de estadística de 100

        bar.style.transition = `width ${duration}s linear`;
        bar.style.width = '100%';

        setTimeout(() => {
            value.textContent = stat;
        }, duration * 1000);
    });
}

function resetRace() {
    currentPokemon = getRandomPokemon();
    selectedStat = getRandomStat();
    updateSelectedStat();
    renderPokemon();
}

// Inicialización
resetRace();
