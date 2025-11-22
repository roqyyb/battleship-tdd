import { showCurrentForm } from "./multiStepForm.mjs";
import Player from "./player.mjs";
import SoundManager from "./sound.mjs";
import { createBoard, updateBoard } from "./updateUI.mjs";

const playerOneBoard = document.getElementById("board-one");
const playerTwoBoard = document.getElementById("board-two");

const messageEle = document.getElementById("message");

//   populate players gameboard
// payerOne--
// const playOneShipsInfo = [
//   { length: 5, coordinates: [1, 0], orientation: "v" },
//   { length: 4, coordinates: [7, 6], orientation: "h" },
//   { length: 3, coordinates: [6, 2], orientation: "v" },
//   { length: 3, coordinates: [4, 4], orientation: "h" },
//   { length: 2, coordinates: [1, 2], orientation: "h" },
// ];

// playerTwo ---
const playTwoShipsInfo = [
  { length: 5, coordinates: [1, 1], orientation: "h" },
  { length: 4, coordinates: [3, 8], orientation: "v" },
  { length: 3, coordinates: [3, 3], orientation: "h" },
  { length: 3, coordinates: [8, 1], orientation: "h" },
  { length: 2, coordinates: [3, 0], orientation: "v" },
];

// const playersShipsInfo = [playOneShipsInfo, playTwoShipsInfo];

const Game = (() => {
  let currentPlayer;
  let currentBoard;
  let isPlacing = true;

  const playerOne = new Player("real");
  playerOne.name = "player one";
  const playerTwo = new Player("computer");
  playerTwo.name = "Computer";

  const players = [playerOne, playerTwo];

  currentPlayer = playerOne;
  currentBoard = playerOneBoard;

  // const getStatus = () => isActive;
  const getPlacingStatus = () => isPlacing;

  const placeShips = () => {
    const ships = [5, 4, 3, 3, 2];

    createBoard(playerOneBoard);
    // createBoard(playerTwoBoard, playerTwo.gameboard.grid);
    document.getElementById("player-two-side").style.display = "none";

    messageEle.textContent = "Placing ships...";

    // placement form
    showCurrentForm();

    for (const ship of ships) {
      // const input = prompt(
      //   `Ship length: ${ship}. Enter V for Vertical placement or H for horizontal placement`
      // );
    }
  };

  const start = () => {
    isPlacing = false;

    // currentPlayer = playerOne;
    currentBoard = playerTwoBoard;

    messageEle.textContent = `${currentPlayer.name}'s turn`;

    playerOneBoard.classList.add("inactive");

    document.getElementById("player-two-side").style.display = "block";

    // playersShipsInfo.forEach((playerShipsInfo, index) => {
    //   for (const shipInfo of playerShipsInfo) {
    //     const { length, coordinates, orientation } = shipInfo;
    //     players[index].gameboard.placeShip(length, coordinates, orientation);
    //   }
    // });

    playTwoShipsInfo.forEach((shipInfo) => {
      const { length, coordinates, orientation } = shipInfo;
      playerTwo.gameboard.placeShip(length, coordinates, orientation);
    });

    // createBoard(playerOneBoard);
    createBoard(playerTwoBoard);
  };

  const getCurrentPlayer = () => currentPlayer;

  const toggleCurrentPlayer = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  };

  const getCurrentBoard = () => {
    return currentBoard;
  };

  const toggleCurrentBoard = () => {
    getCurrentBoard().classList.add("inactive");

    currentBoard =
      currentBoard === playerOneBoard ? playerTwoBoard : playerOneBoard;

    getCurrentBoard().classList.remove("inactive");
  };

  const getOpponent = () =>
    currentPlayer === playerOne ? playerTwo : playerOne;

  const playRound = (row, col) => {
    // get opponent;
    const opponent = getOpponent();

    const coord = [row, col];

    // console.log(coord);

    // console.log({ opponent, currentBoard });

    // return;

    // attack
    // if miss, toggleCurrentPlayer
    // console.log("before shot", getCurrentBoard().id);

    const result = opponent.gameboard.receiveAttack(coord);

    updateBoard(getCurrentBoard(), opponent.gameboard.grid);

    // check win
    if (opponent.gameboard.ships.every((ship) => ship.isSunk())) {
      // alert();

      if (currentPlayer.type === "real") {
        messageEle.textContent = currentPlayer.name + " won!!!";
        messageEle.classList.add("win");
      } else {
        messageEle.textContent = "You lost!!!";
        messageEle.classList.add("lose");
      }
      playerOneBoard.classList.add("inactive");
      playerTwoBoard.classList.add("inactive");

      return;
    }

    if (result === true) {
      SoundManager.playWoundedSound();
    }

    if (result === "sunk") {
      SoundManager.playKilledSound();
    }

    if (result === false) {
      SoundManager.playMissedSound();

      toggleCurrentPlayer();
      toggleCurrentBoard();

      // console.log(currentPlayer.name);
      // console.log(currentBoard.id);
      messageEle.textContent = `${currentPlayer.name}'s turn`;

      // console.log("after shot", getCurrentBoard().id);
    }
  };

  // const playRound = () => {};

  return {
    start,
    getCurrentBoard,
    playRound,
    placeShips,
    getPlacingStatus,
    getCurrentPlayer,
  };
})();

document.addEventListener("DOMContentLoaded", Game.placeShips());

export { Game };
