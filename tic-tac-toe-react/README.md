# Tic Tac Toe Game

![Game Screenshot](https://vscode.dev/github/Myszczur/react-repositories/blob/my-react-blog/tic-tac-toe-react/src/components/assets/Zrzut%20ekranu%20(65).png)

## Description

A simple Tic Tac Toe game built using React.js. The game allows two players to compete by clicking on the board's squares.


## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Myszczur/react-repositories.git
    ```
2. Navigate to the directory:
    ```bash
    cd tic-tac-toe
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Run the game:
    ```bash
    npm start
    ```

## Technologies Used

- React.js
- CSS

## Project Structure

tic-tac-toe/
├── public/
│ ├── index.html
│ └── ...
├── src/
│ ├── components/
│ │ ├── TicTacToe.js
│ │ └── ...
│ ├── assets/
│ │ ├── circle.png
│ │ └── cross.png
│ └── TicTacToe.css
├── README.md
└── ...


## Features

### `TicTacToe.js`

- `useState`: Manages game state (move counter, lock state, board data).
- `useRef`: Refers to DOM elements representing the game board.
- `toggle`: Handles clicks on board squares, updating their content and data.
- `wonPlayer`: Called upon a win, locks the game and displays the winner.
- `checkWinner`: Checks win conditions.
- `resetGame`: Resets the game to its initial state.

### `TicTacToe.css`

- Styles the user interface elements, giving them a space-inspired appearance.

## Screenshots

![Gameplay](https://vscode.dev/github/Myszczur/react-repositories/blob/my-react-blog/tic-tac-toe-react/src/components/assets/Zrzut%20ekranu%20(66).png)
![Winner](https://vscode.dev/github/Myszczur/react-repositories/blob/my-react-blog/tic-tac-toe-react/src/components/assets/Zrzut%20ekranu%20(64).png)
