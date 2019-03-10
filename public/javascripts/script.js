window.onload = function() {
  $('.main').hide();
}

play = () => {
  startGame();
  createPieces();
  $('.main').show();
  $('.play').hide();
}

var score = 0;
var arr = [[]];

var startGame = () => {
  var gameBoard = new Board();
  $("#board").append(gameBoard.element);
}

var Board = function() {
  this.size = 10;
  this.element = $("<table>")
    .attr('ondrop', 'drop(event)')
    .attr('ondragover', 'allowDrop(event)');
  this.element.addClass('board');
  this.cellId = 1;
  for(var i = 0; i < this.size; i++)  {
    var nextRow = $("<tr>");
    for(var j = 0; j < this.size; j++) {
      var nextColumn = $("<td>" + this.cellId + "</td>")
        .attr('id', this.cellId)
        .attr('class', 'no-color');
      this.cellId++;
      nextRow.append(nextColumn);
    }
    this.element.append(nextRow);
  }
}


var createPieces = () => {

  var gamePiece1 = new Piece(5,1, Math.floor(Math.random() * 19));
  var gamePiece2 = new Piece(5,2, Math.floor(Math.random() * 19));
  var gamePiece3 = new Piece(5,3, Math.floor(Math.random() * 19));

  $("#piece-1").append(gamePiece1.element);
  $("#piece-2").append(gamePiece2.element);
  $("#piece-3").append(gamePiece3.element);
}

var Piece = function(size, cellId, type) {
  let piece = pieces[type][1];
  let newPiece = piece.map(function(num) {
    let r = Math.floor(num/10);
    let c = num % 10;
    return (r * 5) + c;
  });

  newPiece.sort(function(a, b){return a-b});

  let count1 = 0;
  let count2 = 0;

  this.size = size;
  this.cellId = cellId;
  this.type = type;
  this.element = $("<table>")
    .attr('draggable', 'true')
    .attr('ondragstart', 'drag(event)')
    .attr('type', this.type)
    .addClass('test-table hejhej')
    .on('mousedown', calculateCoordinates)
    .attr('id', this.cellId);
  for(var i = 0; i < this.size; i++)  {
    var nextRow = $("<tr>");
    for(var j = 0; j < this.size; j++) {
      var nextColumn = $("<td>")
      // var nextColumn = $("<td>" + count1 + "</td>")
        // .attr('onmousedrop', 'clickHandle(' + i + ',' + j + ')');
        .attr('onmousedown', 'clickHandle(' + i + ',' + j + ')');
        if (newPiece[count2] === count1) {
          nextColumn.addClass('color')
          count2++;
        }
      this.cellId++;
      nextRow.append(nextColumn);
      count1++;
    }
    this.element.append(nextRow);
  }

  newPiece = [];
}

function allowDrop(ev) {
  ev.preventDefault();
}

let hide;
let type;

function drag(ev) {
  var togglePiece;
  ev.dataTransfer.setData("text", ev.target.id);
  hide = ev.target.id;

  type = $(ev.target).attr('type');

  $(ev.target).removeClass('hejhej').addClass('hejhejhej');
}

let test = 3;

function drop(ev) {

  let startNum;
  ev.preventDefault();

  startNum = parseInt(ev.target.id)

  startNum = startNum - handleRow;
  startNum = startNum - handleCol;

  // var data = ev.dataTransfer.getData("text");

  place(type, startNum);

  if (test >= 0) {
    $('#piece-' + hide).html('');
    test--;
  }

  if (test === 0) {
    createPieces();
    test = 3;
  }
}

let handleRow, handleCol, coordinatRow, coordinatCol ;

function clickHandle(x, y) {
  handleRow = x * 10;
  handleCol = y;
}

function calculateCoordinates(event) {

  const element = $(event.target).closest('table')[0].getBoundingClientRect();

  let elementLocation = [element.left, element.top];
  let clickLocation = [event.clientX, event.clientY];

  coordinatRow = clickLocation[0] - elementLocation[0];
  coordinatCol = clickLocation[1] - elementLocation[1];

  console.log(coordinatRow + ' AND ' + coordinatCol);
}


let place = (type, startNum) => {
  var inFrame, taken

  inFrame = true;
  taken = false;

  if ( startNum >= pieces[type][0][pieces[type][0].length - 1] || startNum <= 0 ) {
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
      if ($('#' + (startNum + pieces[type][1][i])).hasClass('color')) {
        taken = true;
      }
    }

    if (!taken) {
      for (var i = 0; i < pieces[type][1].length; i++) {
        $('#' + (startNum + pieces[type][1][i])).removeClass('no-color').addClass('color');
      }

      if (startNum > 0) {
        score += pieces[type][1].length;
        displayScore(score);
      }
    }
  }

  // Create empty 10 * 10 empty array
  createArr(arr);

  // Create a copy of the grid based on which og the cells have a class of color
  dublicateGridToArr(arr);
  checkAndREmove();
}

let displayScore = (sc, row, col) => {
  if (row) {
    sc += row.length * 10;
  }

  if (col) {
    sc += col.length * 10;
  }

  document.getElementById('score').textContent = sc;
}

let checkAndREmove = () => {
  var arrRow = [];
  var arrCol = [];

  for ( var row = 0; row < 10; row++ ) {
    var count = 1;
    for ( var col = 0; col < 10; col++ ) {
      if ( arr[row][col] === 1) {
        count++
      }
    }

    if (count > 10) {
      arrRow.push(row);
    }
  }

  for ( var col = 0; col < 10; col++ ) {
    var count = 1;
    for ( var row = 0; row < 10; row++ ) {
      if ( arr[row][col] === 1) {
        count++;
      }
    }

    if (count > 10) {
      arrCol.push(col);
    }
  }

  for ( var row = 0; row < arrRow.length; row++ ) {
    for ( var col = 1; col <= 10; col++ ) {
      $('#' + (arrRow[row] * 10 + col)).removeClass('color').addClass('no-color');
    }
  }

  for ( var col = 0; col < arrCol.length; col++ ) {
    for ( var row = 1; row <= 100; row += 10 ) {
      $('#' + (arrCol[col] + row)).removeClass('color').addClass('no-color');
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

  displayScore(score, arrRow, arrCol);
}

