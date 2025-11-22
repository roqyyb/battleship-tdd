import {
  getCurrentFormId,
  getCurrentShipDetails,
  hideAllForms,
  incCurrentFormId,
  showCurrentForm,
} from "./multiStepForm.mjs";
import { Game } from "./playGame.mjs";
import Ship from "./ship.mjs";

// placeship abort controller
const placeShipController = new AbortController();
const placeShipSignal = placeShipController.signal;

const createBoard = (boardElement) => {
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.id = `cell-${row}${col}`;
      cell.dataset.row = row;
      cell.dataset.col = col;

      cell.addEventListener("click", () => {
        if (Game.getPlacingStatus()) {
          //Game.isPlacing
          handleShipPlacement(row, col, cell);
          return;
        }
        // handlePlayRound();
        Game.playRound(row, col);
      });

      cell.addEventListener(
        "mouseover",
        () => handleMouseOver(row, col, cell),
        {
          signal: placeShipSignal,
        }
      );
      cell.addEventListener("mouseout", () => handleMouseOut(row, col, cell), {
        signal: placeShipSignal,
      });

      // console.log(row, col);
      // console.log(currentBoard);

      boardElement.appendChild(cell);
    }
  }
};

function getCellsToBeOccupiedIDs(row, col, currentShip, orientation) {
  // const { orientation, currentShip } = getCurrentShipDetails();

  const cellIDs = [];
  if (orientation === "v") {
    for (let i = 0; i < currentShip; i++) {
      const id = `cell-${row + i}` + col;
      cellIDs.push(id);
    }
  }
  if (orientation === "h") {
    for (let i = 0; i < currentShip; i++) {
      const id = "cell-" + row + `${col + i}`;
      cellIDs.push(id);
    }
  }

  return cellIDs;
}

// console.log(getCellsToBeOccupiedIDs(0, 0));

// mouse over handler
function handleMouseOver(row, col, cell) {
  const currentBoard = Game.getCurrentBoard();
  // console.log(cell.id);
  // console.log("mouseover");

  // refactor: current ship and current orientation
  const { orientation, currentShip } = getCurrentShipDetails();
  // refact 2: is valid move
  const isValid = Game.getCurrentPlayer().gameboard.isValidPlacement(
    row,
    col,
    currentShip,
    orientation
  );

  const cellsToBeOccupiedIDs = getCellsToBeOccupiedIDs(
    row,
    col,
    currentShip,
    orientation
  );

  const currentBoardCells = currentBoard.querySelectorAll(".cell");
  const cellsToBeOccupied = Array.from(currentBoardCells).filter((cell) =>
    cellsToBeOccupiedIDs.includes(cell.id)
  );

  cellsToBeOccupied.forEach((cell) => {
    if (isValid) {
      cell.classList.add("hover");
    } else {
      cell.classList.add("hoverInvalid");
    }
  });
}

function handleMouseOut(row, col, cell) {
  const currentBoard = Game.getCurrentBoard();
  // console.log(cell.id);
  const { orientation, currentShip } = getCurrentShipDetails();

  // console.log("mouseout");
  const cellsToBeOccupiedIDs = getCellsToBeOccupiedIDs(
    row,
    col,
    currentShip,
    orientation
  );
  const currentBoardCells = currentBoard.querySelectorAll(".cell");
  const cellsToBeOccupied = Array.from(currentBoardCells).filter((cell) =>
    cellsToBeOccupiedIDs.includes(cell.id)
  );

  cellsToBeOccupied.forEach((cell) => {
    cell.classList.remove("hover");
    cell.classList.remove("hoverInvalid");
  });
}

// place ship
function handleShipPlacement(row, col, cell) {
  const { orientation, currentShip } = getCurrentShipDetails();

  if (
    Game.getCurrentPlayer().gameboard.isValidPlacement(
      row,
      col,
      currentShip,
      orientation
    )
  ) {
    // console.log("Can place ship.");

    // 		update board state
    const result = Game.getCurrentPlayer().gameboard.placeShip(
      currentShip,
      [row, col],
      orientation
    );

    // console.log({ result });

    // 		update ui
    if (result === true) {
      updateUI(row, col, cell);
      // form
      if (currentShip === 2) {
        hideAllForms();

        Game.start();

        placeShipController.abort();
      } else {
        incCurrentFormId();
        showCurrentForm();
      }
      // if (getCurrentFormId() < 5) {
      // }
    }
  } else {
    console.log("Cannot place ship");
  }
}

const updateUI = (row, col, cell) => {
  // const cells = Game.getCurrentPlayer().gameboard.querySelectorAll(".cell");
  // console.log(Game.getCurrentPlayer().gameboard.grid);

  Game.getCurrentPlayer().gameboard.grid.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      const id = `cell-${rowIndex}${colIndex}`;
      const cell = document.getElementById(id);

      if (col instanceof Ship) {
        // console.log(cell);
        cell.classList.add("busy");
      }
    });
  });
};

function updateBoard(currentBoard, grid) {
  // console.log(currentBoard);
  // return;
  grid.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      const id = `cell-${rowIndex}${colIndex}`;
      const cell = currentBoard.querySelector(`#${id}`);

      if (col === 1) {
        // console.log(cell);
        cell.classList.remove("hover");
        cell.classList.add("hit");
      }
      if (col === 0) {
        cell.classList.add("miss");
      }
    });
  });
}

// createBoard();

export { createBoard, updateBoard };
