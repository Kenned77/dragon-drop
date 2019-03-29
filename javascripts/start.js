
let score = 0;
let boardArray;

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
  var gameBoard = new Board();
  $("#board").append(gameBoard.element);
}

function restartGameAfterLoss() {
  $('.board-tile').removeClass('color').addClass('no-color');
  score = 0;
  displayScore(score);
  createBoardArray();
  getThreeNextPieces();
  toggleStartNewGameButton(true);
}

function createBoardArray() {
  boardArray = [];
  for (let i = 0; i < 10; i++) {
    boardArray[i] = [];
    for (let j = 0; j < 10; j++) {
      boardArray[i][j] = null;
    }
  }
}
