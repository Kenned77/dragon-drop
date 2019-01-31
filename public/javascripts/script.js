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

function place() {
  var type, startNum, inFrame, taken, start
  start = 1;
  type = document.getElementById('type').value;
  startNum = parseInt(document.getElementById("startNum").value);
  inFrame = true;
  taken = false;

  if (startNum >= pieces[type][0][pieces[type][0].length - 1]) {
      inFrame = false;
  } else {
    for ( var i = 0; i < pieces[type][0].length; i++ ) {
      if (startNum === pieces[type][0][i]) {
        inFrame = false;
      }
    }
  }

  if (inFrame) {
    for (var i = 0; i < pieces[type][1].length; i++) {
      if ($('#cell-' + (startNum + pieces[type][1][i])).hasClass('color')) {
        taken = true;
      }
    }

    if (!taken) {
      for (var i = 0; i < pieces[type][1].length; i++) {
        $('#cell-' + (startNum + pieces[type][1][i])).removeClass('no-color').addClass('color');
      }
    } else {
      console.log("nope!!");
    }
  }

  for ( var i = 0; i < 10; i++ ) {
    for ( var j = 0; j < 10; j++ ) {
      if ( $('#cell-' + start).hasClass('color')) {
        arr[i][j] = 1;
        start++;
      } else {
        arr[i][j] = 0;
        start++;
      }
    }
  }

  console.log(arr);
}

function testing() {
  var arrRow = [];
  var arrCol = [];
  var tempArr = [];

  for ( var row = 0; row < 10; row++ ) {
    tempArr = [];
    for ( var col = 0; col < 10; col++ ) {
      if ( arr[row][col] === 1) {
        tempArr[col] = 'ja';
      }
    }

    if (tempArr.length === 10) {
      arrRow.push(row);
    }
  }

  console.log('Row ' + arrRow);
  console.log(arrRow);


  for ( var col = 0; col < 10; col++ ) {
    for ( var row = 0; row < 10; row++ ) {
      tempArr = [];
      if ( arr[row][col] === 1) {
        tempArr[row] = 'ja';
      }
    }

    if (tempArr.length === 10) {
      arrCol.push(col);
    }
  }

  console.log('Col ' + arrCol);
  console.log(arrCol);


  // arrRow = [0, 2, 6];

  for ( var row = 0; row < arrRow.length; row++ ) {
    for ( var col = 1; col <= 10; col++ ) {
      $('#cell-' + (arrRow[row] * 10 + col)).removeClass('color').addClass('no-color');
    }
  }

  // arrCol = [0, 2, 6]

  for ( var col = 0; col < arrCol.length; col++ ) {
    for ( var row = 1; row <= 100; row += 10 ) {
      $('#cell-' + (arrCol[col] + row)).removeClass('color').addClass('no-color');
    }
  }

  for ( var row = 0; row < arrRow.length; row++ ) {
    for ( var col = 0; col < 10; col++ ) {
      arr[row][col] = 0;
    }
  }

  for ( var col = 0; col < arrCol.length; col++ ) {
    for ( var row = 0; row < 10; row++ ) {
      arr[row][arrCol[col]] = 0;
    }
  }

  console.log(arr);
}
















































function clearBoard() {
  for ( var i = 1; i <= 100; i++ ) {
    $('#cell-' + i).removeClass('color').addClass('no-color');
  }
}































// var scuareColor = "#4e1608";

// function placePiece() {
//   var type, startNum, pieceElligalMove, piece, inFrame
//   type = document.getElementById("type").value;
//   startNum = parseInt(document.getElementById("startNum").value);
//   inFrame = true;

//   if (type === 'square-small') {
//     pieceElligalMove = [101];
//     piece = [0];
//   } else if (type === 'square-medium') {
//     pieceElligalMove = [10, 20, 30, 40, 50, 60, 70, 80, 90];
//     piece = [0, 1, 10, 11];
//   } else if (type === 'square-large') {
//     pieceElligalMove = [9, 10, 19, 20, 29, 30, 39, 40, 49, 50, 59, 60, 69, 79];
//     piece = [0, 1, 2, 10, 11, 12, 20, 21, 22];
//   } else if (type === 'rectangle-2-vertical') {
//     pieceElligalMove = [91];
//     piece = [0, 10];
//   } else if (type === 'rectangle-2-horizontal') {
//     pieceElligalMove = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
//     piece = [0, 1];
//   } else if (type === 'rectangle-3-vertical') {
//     pieceElligalMove = [81];
//     piece = [0, 10, 20];
//   } else if (type === 'rectangle-3-horizontal') {
//     pieceElligalMove = [9, 10, 19, 20, 29, 30, 39, 40, 49, 50, 59, 60, 69, 70, 79, 80, 89, 90, 99];
//     piece = [0, 1, 2];
//   } else if (type === 'rectangle-4-vertical') {
//     pieceElligalMove = [71];
//     piece = [0, 10, 20, 30];
//   } else if (type === 'rectangle-4-horizontal') {
//     pieceElligalMove = [8 ,9, 10, 18, 19, 20, 28, 29, 30, 38, 39, 40, 48, 49, 50, 58, 59, 60, 69, 69, 70, 78, 79, 80, 88, 89, 90, 98];
//     piece = [0, 1, 2, 3];
//   } else if (type === 'rectangle-5-vertical') {
//     pieceElligalMove = [61];
//     piece = [0, 10, 20, 30, 40];
//   } else if (type === 'rectangle-5-horizontal') {
//     pieceElligalMove = [7, 8, 9, 10, 17, 18, 19, 20, 27, 28, 29, 30, 37, 38, 39, 40, 47, 48, 49, 50, 57, 58, 59, 60, 67, 68, 69, 70, 77, 78, 79, 80, 87, 88, 89, 90, 97];
//     piece = [0, 1, 2, 3, 4];
//   } else if (type === 'l-shape-small-1') {
//     pieceElligalMove = [10, 20, 30, 40, 50, 60, 70, 80, 90];
//     piece = [0, 10, 11];
//     // *
//     // **
//   } else if (type === 'l-shape-small-2') {
//     pieceElligalMove = [1, 11, 21, 31, 41, 51, 61, 71, 81, 91];
//     piece = [0, 9, 10];
//     //  *
//     // **
//   } else if (type === 'l-shape-small-3') {
//     pieceElligalMove = [10, 20, 30, 40, 50, 60, 70, 80, 90];
//     piece = [0, 1, 11];
//     // **
//     //  *
//   } else if (type === 'l-shape-small-4') {
//     pieceElligalMove = [10, 20, 30, 40, 50, 60, 70, 80, 90];
//     piece = [0, 1, 10];
//     // **
//     // *
//   } else if (type === 'l-shape-large-1') {
//     pieceElligalMove = [9, 10, 19, 20, 29, 30, 39, 40, 49, 50, 59, 60, 69, 70, 79];
//     piece = [0, 10, 20, 21, 22];
//     // *
//     // *
//     // ***
//   } else if (type === 'l-shape-large-2') {
//     pieceElligalMove = [1, 2, 11, 12, 21, 22, 31, 32, 41, 42, 51, 52, 61, 62, 71, 72, 81];
//     piece = [0, 10, 20, 19, 18];
//     //   *
//     //   *
//     // ***
//   } else if (type === 'l-shape-large-3') {
//     pieceElligalMove = [9, 10, 19, 20, 29, 30, 39, 40, 49, 50, 59, 60, 69, 70, 79];
//     piece = [0, 1, 2, 12, 22];
//     // ***
//     //   *
//     //   *
//   } else if (type === 'l-shape-large-4') {
//     pieceElligalMove = [9, 10, 19, 20, 29, 30, 39, 40, 49, 50, 59, 60, 69, 70, 79];
//     piece = [0, 1, 2, 10, 20];
//     // ***
//     // *
//     // *
//   } else {
//     console.log('not quite yet');
//   }

//   if (startNum >= pieceElligalMove[pieceElligalMove.length - 1]) {
//       inFrame = false;
//   } else {
//     for ( var i = 0; i < pieceElligalMove.length; i++ ) {
//       if (startNum === pieceElligalMove[i]) {
//         inFrame = false;
//       }
//     }
//   }

//   for ( var i = 1; i <= 100; i++ ) {
//     $('#cell-' + i).css("background-color", 'transparent');
//   }

//   if (inFrame) {
//     for (var i = 0; i < piece.length; i++) {
//       $('#cell-' + (startNum + piece[i])).css("background-color", scuareColor);
//     }
//   }
// }






