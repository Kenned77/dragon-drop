
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
