
let score = 0;
let arr = [[]];

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
  createArr(arr);
  getThreeNextPieces();
  toggleStartNewGameButton(true);
}
