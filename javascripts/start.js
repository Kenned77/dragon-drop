
let score = 0;
let arr = [[]];

$(document).ready(() => {
  $('.main').hide();
});

function play() {
  startGame();
  createPieces();
  checkingAnyMoveLeft();
  $('.main').show();
  $('.play').hide();
  shouldStartNewGameButtonHide(true);
}

function startGame() {
  var gameBoard = new Board();
  $("#board").append(gameBoard.element);
}
