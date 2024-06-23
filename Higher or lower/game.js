const maxPokemonID = 1025;
const statsList = ['hp', 'attack', 'defense', 'sp_attack', 'sp_defense', 'speed'];
let leftPokemon = {};
let rightPokemon = {};
let leftStat = 'hp';
let rightStat = 'hp';
let score = 0;

function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
}

async function getPokemonData(pokemonID) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
    const data = await response.json();
    return {
        name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
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

async function startGame() {
    leftPokemon = await getRandomPokemon();
    rightPokemon = await getRandomPokemon();
    leftStat = getRandomStat();
    rightStat = getRandomStat();
    displayPokemons();
    updateScore();
}

async function getRandomPokemon() {
    const randomID = getRandomInt(maxPokemonID);
    return await getPokemonData(randomID);
}

function getRandomStat() {
    return statsList[getRandomInt(statsList.length) - 1];
}

function displayPokemons() {
    const leftPokemonImg = document.getElementById('left-pokemon-img');
    const leftPokemonName = document.getElementById('left-pokemon-name');
    const leftPokemonStat = document.getElementById('left-pokemon-stat');
    const leftPokemonValue = document.getElementById('left-pokemon-value');

    const rightPokemonImg = document.getElementById('right-pokemon-img');
    const rightPokemonName = document.getElementById('right-pokemon-name');
    const rightPokemonStat = document.getElementById('right-pokemon-stat');
    const rightPokemonValue = document.getElementById('right-pokemon-value');

    leftPokemonImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${leftPokemon.id}.png`;
    leftPokemonName.textContent = leftPokemon.name;
    leftPokemonStat.textContent = `${leftStat.toUpperCase()}:`;
    leftPokemonValue.textContent = leftPokemon.stats[leftStat];

    rightPokemonImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${rightPokemon.id}.png`;
    rightPokemonName.textContent = rightPokemon.name;
    rightPokemonStat.textContent = `${rightStat.toUpperCase()}:`;
    rightPokemonValue.textContent = '???';
}

async function guess(choice) {
    const leftStatValue = leftPokemon.stats[leftStat];
    const rightStatValue = rightPokemon.stats[rightStat];
    let correct = false;

    if (choice === 'higher' && rightStatValue > leftStatValue) {
        correct = true;
    } else if (choice === 'lower' && rightStatValue < leftStatValue) {
        correct = true;
    } else if (choice === 'same' && rightStatValue === leftStatValue) {
        correct = true;
    }

    if (correct) {
        score++;
        leftPokemon = rightPokemon;
        leftStat = rightStat;
        rightPokemon = await getRandomPokemon();
        rightStat = getRandomStat();
        displayPokemons();
        updateScore();
    } else {
        document.getElementById('right-pokemon-value').textContent = rightStatValue;
        document.querySelector('.buttons').innerHTML = '<button onclick="endGame()">Continuar</button>';
    }
}

function updateScore() {
    document.getElementById('score').textContent = score;
}

function endGame() {
    localStorage.setItem('finalScore', score);
    window.location.href = 'end.html';
}

document.addEventListener('DOMContentLoaded', (event) => {
    startGame();
});
