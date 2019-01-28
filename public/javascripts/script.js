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
      var nextColumn = $("<td>" + this.cellId + "</td>").attr( 'id', 'cell-' + this.cellId);
      tableCells[i][j] = nextColumn;
      this.cellId++;
      nextRow.append(nextColumn);
    }
    this.element.append(nextRow);
  }
}

var scuareColor = "#4e1608";

function placePiece() {
  var type, startNum, pieceElligalMove, piece, inFrame
  type = document.getElementById("type").value;
  startNum = parseInt(document.getElementById("startNum").value);
  inFrame = true;

  if (type === 'square-small') {
    pieceElligalMove = [101];
    piece = [0];
  } else if (type === 'square-medium') {
    pieceElligalMove = [10, 20, 30, 40, 50, 60, 70, 80, 90];
    piece = [0, 1, 10, 11];
  } else if (type === 'square-large') {
    pieceElligalMove = [9, 10, 19, 20, 29, 30, 39, 40, 49, 50, 59, 60, 69, 79];
    piece = [0, 1, 2, 10, 11, 12, 20, 21, 22];
  } else if (type === 'rectangle-2-vertical') {
    pieceElligalMove = [91];
    piece = [0, 10];
  } else if (type === 'rectangle-2-horizontal') {
    pieceElligalMove = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    piece = [0, 1];
  } else if (type === 'rectangle-3-vertical') {
    pieceElligalMove = [81];
    piece = [0, 10, 20];
  } else if (type === 'rectangle-3-horizontal') {
    pieceElligalMove = [9, 10, 19, 20, 29, 30, 39, 40, 49, 50, 59, 60, 69, 70, 79, 80, 89, 90, 99];
    piece = [0, 1, 2];
  } else {
    console.log('not quite yet');
  }

  // console.log(startNum);

  if (startNum >= pieceElligalMove[pieceElligalMove.length - 1]) {
      inFrame = false;
      console.log('nope cant do!');
  } else {
    for ( var i = 0; i < pieceElligalMove.length; i++ ) {
      if (startNum === pieceElligalMove[i]) {
        inFrame = false;
        console.log('nope cant do!');
      }
    }
  }

  for ( var i = 1; i <= 100; i++ ) {
    $('#cell-' + i).css("background-color", 'transparent');
  }

  if (inFrame) {
    for (var i = 0; i < piece.length; i++) {
      $('#cell-' + (startNum + piece[i])).css("background-color", scuareColor);
    }
  }
}












