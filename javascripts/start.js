
let score = 0;
let boardArray;
let coordinatRow, coordinatCol;

$(document).ready(() => {
  $('.main').hide();
});

function play() {
  startGame();
  getThreeNextPieces();
  checkingAnyMoveLeft();
  $('.main').show();
  $('.play').hide();
  toggleStartNewGameButton(true);
}

function startGame() {
  const gameBoard = new Board();
  $('#board').append(gameBoard.element);
  createBoardArray();
}

function restartGameAfterLoss() {
  $('.board-tile').removeClass('color').addClass('no-color');
  score = 0;
  updateScore();
  createBoardArray();
  getThreeNextPieces();
  toggleStartNewGameButton(true);
}

function createBoardArray() {
  boardArray = [];
  for (let row = 0; row < 10; row++) {
    boardArray[row] = [];
  }
}

function dublicateGridToArr() {
  let tileNumber = 1;
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      if ($('#' + tileNumber).hasClass('color')) {
        boardArray[row][col] = 1;
      } else {
        boardArray[row][col] = 0;
      }
      tileNumber++;
    }
  }
}
