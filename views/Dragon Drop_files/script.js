window.onload = function() {
  tableCells = [];
  startGame();
}

var startGame = function() {
  gameBoard = new Board();
  $("#board").append(gameBoard.element);
}

var Board = function() {
  this.size = 10;
  this.element = $("<table>");
  this.element.addClass('board');
  this.cellId = 1;
  for(var i = 0; i < this.size; i++)  {
    tableCells[i] = [];
    var nextRow = $("<tr>");
    for(var j = 0; j < this.size; j++) {
      var nextColumn = $("<td>").attr( 'id', 'cell-' + this.cellId);
      tableCells[i][j] = nextColumn;
      this.cellId++;
      nextRow.append(nextColumn);
    }
    this.element.append(nextRow);
  }
}
