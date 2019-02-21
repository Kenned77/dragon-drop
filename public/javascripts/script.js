window.onload = function() {
  $('.main').hide();
}

play = () => {
  startGame();
  $('.main').show();
  $('.play').hide();
}

var tableCells = [];
var score = 0;
var arr = [[]];

var startGame = () => {
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
      // var nextColumn = $("<td>").attr( 'id', 'cell-' + this.cellId);
      // var nextColumn = $("<td>" + this.cellId + "</td>").attr( 'id', 'cell-' + this.cellId);
      // var nextColumn = $("<td>" + this.cellId + "</td>").attr('id', this.cellId).attr('ondrop', 'drop(event)').attr('ondragover', 'allowDrop(event)');
      var nextColumn = $("<td>" + this.cellId + "</td>")
        .attr('id', this.cellId)
        .attr('class', 'no-color')
        .attr('ondrop', 'drop(event)')
        .attr('ondragover', 'allowDrop(event)');
      tableCells[i][j] = nextColumn;
      this.cellId++;
      nextRow.append(nextColumn);
    }
    this.element.append(nextRow);
  }
}


function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
  console.log(ev.target.id + ' event ID');
  place(1, parseInt(ev.target.id));
  // place(2, 8);
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

let place = (type, startNum) => {
  console.log(typeof startNum);
  // var type, startNum, inFrame, taken
  var inFrame, taken
  // type = document.getElementById('type').value;
  // startNum = parseInt(document.getElementById("startNum").value);

  console.log(type + ' type');
  console.log(startNum + ' startNum');

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
  // console.log(arr);
}

