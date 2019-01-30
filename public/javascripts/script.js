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
var color = "color";

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
  } else if (type === 'rectangle-4-vertical') {
    pieceElligalMove = [71];
    piece = [0, 10, 20, 30];
  } else if (type === 'rectangle-4-horizontal') {
    pieceElligalMove = [8 ,9, 10, 18, 19, 20, 28, 29, 30, 38, 39, 40, 48, 49, 50, 58, 59, 60, 69, 69, 70, 78, 79, 80, 88, 89, 90, 98];
    piece = [0, 1, 2, 3];
  } else if (type === 'rectangle-5-vertical') {
    pieceElligalMove = [61];
    piece = [0, 10, 20, 30, 40];
  } else if (type === 'rectangle-5-horizontal') {
    pieceElligalMove = [7, 8, 9, 10, 17, 18, 19, 20, 27, 28, 29, 30, 37, 38, 39, 40, 47, 48, 49, 50, 57, 58, 59, 60, 67, 68, 69, 70, 77, 78, 79, 80, 87, 88, 89, 90, 97];
    piece = [0, 1, 2, 3, 4];
  } else if (type === 'l-shape-small-1') {
    pieceElligalMove = [10, 20, 30, 40, 50, 60, 70, 80, 90];
    piece = [0, 10, 11];
    // *
    // **
  } else if (type === 'l-shape-small-2') {
    pieceElligalMove = [1, 11, 21, 31, 41, 51, 61, 71, 81, 91];
    piece = [0, 9, 10];
    //  *
    // **
  } else if (type === 'l-shape-small-3') {
    pieceElligalMove = [10, 20, 30, 40, 50, 60, 70, 80, 90];
    piece = [0, 1, 11];
    // **
    //  *
  } else if (type === 'l-shape-small-4') {
    pieceElligalMove = [10, 20, 30, 40, 50, 60, 70, 80, 90];
    piece = [0, 1, 10];
    // **
    // *
  } else if (type === 'l-shape-large-1') {
    pieceElligalMove = [9, 10, 19, 20, 29, 30, 39, 40, 49, 50, 59, 60, 69, 70, 79];
    piece = [0, 10, 20, 21, 22];
    // *
    // *
    // ***
  } else if (type === 'l-shape-large-2') {
    pieceElligalMove = [1, 2, 11, 12, 21, 22, 31, 32, 41, 42, 51, 52, 61, 62, 71, 72, 81];
    piece = [0, 10, 20, 19, 18];
    //   *
    //   *
    // ***
  } else if (type === 'l-shape-large-3') {
    pieceElligalMove = [9, 10, 19, 20, 29, 30, 39, 40, 49, 50, 59, 60, 69, 70, 79];
    piece = [0, 1, 2, 12, 22];
    // ***
    //   *
    //   *
  } else if (type === 'l-shape-large-4') {
    pieceElligalMove = [9, 10, 19, 20, 29, 30, 39, 40, 49, 50, 59, 60, 69, 70, 79];
    piece = [0, 1, 2, 10, 20];
    // ***
    // *
    // *
  } else {
    console.log('not quite yet');
  }

  if (startNum >= pieceElligalMove[pieceElligalMove.length - 1]) {
      inFrame = false;
  } else {
    for ( var i = 0; i < pieceElligalMove.length; i++ ) {
      if (startNum === pieceElligalMove[i]) {
        inFrame = false;
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


var pieces = [ // index 0 legal move, index 1 the piece type
  [
    [101], [0] // square small.
  ],
  [
    [10, 20, 30, 40, 50, 60, 70, 80, 90], [0, 1, 10, 11] // square medium.
  ],
  [
    [9, 10, 19, 20, 29, 30, 39, 40, 49, 50, 59, 60, 69, 79], [0, 1, 2, 10, 11, 12, 20, 21, 22] // square large
  ],
  [
    [91], [0, 10] // rectangle 2 vertical
  ],
  [
    [10, 20, 30, 40, 50, 60, 70, 80, 90, 100], [0, 1] // rectangle 2 horizontal
  ],
  [
    [81], [0, 10, 20] // rectangle 3 vertical
  ],
  [
    [9, 10, 19, 20, 29, 30, 39, 40, 49, 50, 59, 60, 69, 70, 79, 80, 89, 90, 99], [0, 1, 2] // rectangle 3 horizontal
  ],
  [
    [71], [0, 10, 20, 30] // rectangle 4 vertical
  ],
  [
    [8 ,9, 10, 18, 19, 20, 28, 29, 30, 38, 39, 40, 48, 49, 50, 58, 59, 60, 69, 69, 70, 78, 79, 80, 88, 89, 90, 98], [0, 1, 2, 3] // rectangle 4 horizontal
  ],
  [
    [61], [0, 10, 20, 30, 40] // rectangle 5 vertical
  ],
  [
    [7, 8, 9, 10, 17, 18, 19, 20, 27, 28, 29, 30, 37, 38, 39, 40, 47, 48, 49, 50, 57, 58, 59, 60, 67, 68, 69, 70, 77, 78, 79, 80, 87, 88, 89, 90, 97], [0, 1, 2, 3, 4] // rectangle 5 horizontal
  ],
  [
    [10, 20, 30, 40, 50, 60, 70, 80, 90], [0, 10, 11] // l-shape-small-1
  ],
  [
    [1, 11, 21, 31, 41, 51, 61, 71, 81, 91], [0, 9, 10] // l-shape-small-2
  ],
  [
    [10, 20, 30, 40, 50, 60, 70, 80, 90], [0, 1, 11] // l-shape-small-3
  ],
  [
    [10, 20, 30, 40, 50, 60, 70, 80, 90], [0, 1, 10] // l-shape-small-4
  ],
  [
    [9, 10, 19, 20, 29, 30, 39, 40, 49, 50, 59, 60, 69, 70, 79], [0, 10, 20, 21, 22] // l-shape-large-1
  ],
  [
    [1, 2, 11, 12, 21, 22, 31, 32, 41, 42, 51, 52, 61, 62, 71, 72, 81], [0, 10, 20, 19, 18] // l-shape-large-2
  ],
  [
    [9, 10, 19, 20, 29, 30, 39, 40, 49, 50, 59, 60, 69, 70, 79], [0, 1, 2, 12, 22] // l-shape-large-3
  ],
  [
    [9, 10, 19, 20, 29, 30, 39, 40, 49, 50, 59, 60, 69, 70, 79], [0, 1, 2, 10, 20] // l-shape-large-4
  ]
];

function place() {
  var typeTest, startNum, inFrame, taken
  typeTest = document.getElementById('typeTest').value;
  startNum = parseInt(document.getElementById("startNum").value);
  inFrame = true;
  taken = false;

  if (startNum >= pieces[typeTest][0][pieces[typeTest][0].length - 1]) {
      inFrame = false;
  } else {
    for ( var i = 0; i < pieces[typeTest][0].length; i++ ) {
      if (startNum === pieces[typeTest][0][i]) {
        inFrame = false;
      }
    }
  }

  if (inFrame) {
    for (var i = 0; i < pieces[typeTest][1].length; i++) {
      if ($('#cell-' + (startNum + pieces[typeTest][1][i])).hasClass('color')) {
        taken = true;
      }
    }

    if (!taken) {
      for (var i = 0; i < pieces[typeTest][1].length; i++) {
        $('#cell-' + (startNum + pieces[typeTest][1][i])).removeClass('no-color').addClass('color');
      }
    } else {
      console.log("nope!!");
    }
  }
}






















