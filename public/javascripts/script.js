window.onload = function() {
  tableCells = [];
  startGame();
}

function startGame()  {
  gameBoard = new Board();
  $("#board").append(gameBoard.element);
}

function Board()  {
  this.size = 10;
  this.element = $("<table>");
  for(var i = 0; i < this.size; i++)  {
    tableCells[i] = [];
    var nextRow = $("<tr>");
    this.element.append(nextRow);
    for(var j = 0; j < this.size; j++) {
      var nextColumn = $("<td>");
      nextRow.append(nextColumn);
      tableCells[i][j] = nextColumn;
    }
  }
}
