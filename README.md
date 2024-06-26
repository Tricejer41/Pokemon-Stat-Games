# Pokemon Stat Games

This repository contains two Pokémon-themed mini-games: "Pokémon Stat Race" and "Pokémon Stats Higher or Lower". Both games are designed to be played in a web browser and provide a fun way to engage with Pokémon statistics.

## Games

### 1. Pokemon Stat Race

In this game, you will compare the stats of randomly selected Pokémon and guess which one has the highest value. The game involves the following steps:

1. Select the number of rounds (1, 5, or 10).
2. For each round, five Pokémon are randomly selected along with a random stat.
3. Guess which Pokémon has the highest value for the selected stat.
4. Watch the race and see if your guess was correct.
5. Points are awarded based on the accuracy of your guess.

#### Points System

- Correct guess of the highest stat: 1 point
- Incorrect guess: 0 points

### 2. Pokemon Stats Higher or Lower

In this game, you will guess whether the stat of a randomly selected Pokémon is higher, lower, or the same compared to another Pokémon's stat. The game involves the following steps:

1. Two Pokémon are randomly selected with random stats.
2. Guess whether the stat of the second Pokémon is higher, lower, or the same compared to the first Pokémon's stat.
3. If your guess is correct, the second Pokémon becomes the first Pokémon, and a new Pokémon is selected.
4. The game continues until an incorrect guess is made.
5. Your score is displayed based on the number of correct guesses.

## How to Run

1. Clone the repository:
    ```bash
    git clone https://github.com/Tricejer41/Pokemon-Stat-Race.git
    ```
2. Navigate to the project directory:
    ```bash
    cd Pokemon-Stat-Race
    ```
3. Open the `main.html` file in your web browser to access the game selection screen.
4. Select the desired game to start playing.

## Project Structure

├── Higher or Lower
│ ├── end.html
│ ├── game.html
│ ├── game.js
│ ├── start.html
│ └── styles.css
├── Stats Race
│ ├── end.html
│ ├── game.html
│ ├── game.js
│ ├── start.html
│ └── styles.css
├── main.html
└── README.md

- `Higher or Lower/`: Contains the files for the "Pokémon Stats Higher or Lower" game.
- `Stats Race/`: Contains the files for the "Pokémon Stat Race" game.
- `main.html`: Main page to select between the two games.

## Dependencies

- The games use the [PokéAPI](https://pokeapi.co/) to fetch Pokémon data and stats.

## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests. Please ensure that your contributions align with the coding standards and project structure.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
