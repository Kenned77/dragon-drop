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

var scuareColor = "#4e1608";

function square() {
  $('#cell-1').css("background-color", scuareColor);
}

var squareTimesTwoToggle = false;

function squareTimesTwo() {
  if (squareTimesTwoToggle) {
    $('#cell-11').css("background-color", 'transparent');
    $('#cell-21').css("background-color", 'transparent');

    $('#cell-11').css("background-color", scuareColor);
    $('#cell-12').css("background-color", scuareColor);

  } else {
    $('#cell-11').css("background-color", 'transparent');
    $('#cell-12').css("background-color", 'transparent');

    $('#cell-11').css("background-color", scuareColor);
    $('#cell-21').css("background-color", scuareColor);
  }

  squareTimesTwoToggle = !squareTimesTwoToggle;
}

function squareTimesFour() {
  var startNum = 3;
  $('#cell-' + startNum).css("background-color", scuareColor);
  $('#cell-' + (startNum + 1)).css("background-color", scuareColor);
  $('#cell-' + (startNum + 10)).css("background-color", scuareColor);
  $('#cell-' + (startNum + 11)).css("background-color", scuareColor);
}

function squareTimesNine() {
  $('#cell-6').css("background-color", scuareColor);
  $('#cell-7').css("background-color", scuareColor);
  $('#cell-8').css("background-color", scuareColor);
  $('#cell-16').css("background-color", scuareColor);
  $('#cell-17').css("background-color", scuareColor);
  $('#cell-18').css("background-color", scuareColor);
  $('#cell-26').css("background-color", scuareColor);
  $('#cell-27').css("background-color", scuareColor);
  $('#cell-28').css("background-color", scuareColor);
}

var squareTimesFiveToggle = false;

function squareTimesFive() {

  if (squareTimesFiveToggle) {
    $('#cell-60').css("background-color", 'transparent');
    $('#cell-70').css("background-color", 'transparent');
    $('#cell-80').css("background-color", 'transparent');
    $('#cell-90').css("background-color", 'transparent');
    $('#cell-100').css("background-color", 'transparent');

    $('#cell-96').css("background-color", scuareColor);
    $('#cell-97').css("background-color", scuareColor);
    $('#cell-98').css("background-color", scuareColor);
    $('#cell-99').css("background-color", scuareColor);
    $('#cell-100').css("background-color", scuareColor);
  } else {
    $('#cell-96').css("background-color", 'transparent');
    $('#cell-97').css("background-color", 'transparent');
    $('#cell-98').css("background-color", 'transparent');
    $('#cell-99').css("background-color", 'transparent');
    $('#cell-100').css("background-color", 'transparent');

    $('#cell-60').css("background-color", scuareColor);
    $('#cell-70').css("background-color", scuareColor);
    $('#cell-80').css("background-color", scuareColor);
    $('#cell-90').css("background-color", scuareColor);
    $('#cell-100').css("background-color", scuareColor);
  }

  squareTimesFiveToggle = !squareTimesFiveToggle;
}


var squareSmallLShapeToggle = 0;

function squareSmallLShape() {
  if (squareSmallLShapeToggle === 0) {
    $('#cell-47').css("background-color", 'transparent');
    $('#cell-48').css("background-color", 'transparent');
    $('#cell-57').css("background-color", 'transparent');
    $('#cell-58').css("background-color", 'transparent');

    $('#cell-47').css("background-color", scuareColor);
    $('#cell-48').css("background-color", scuareColor);
    $('#cell-57').css("background-color", scuareColor);

    squareSmallLShapeToggle++;
  } else if (squareSmallLShapeToggle === 1) {
    $('#cell-47').css("background-color", 'transparent');
    $('#cell-48').css("background-color", 'transparent');
    $('#cell-57').css("background-color", 'transparent');
    $('#cell-58').css("background-color", 'transparent');

    $('#cell-47').css("background-color", scuareColor);
    $('#cell-57').css("background-color", scuareColor);
    $('#cell-58').css("background-color", scuareColor);
    squareSmallLShapeToggle++;
  } else if (squareSmallLShapeToggle === 2) {
    $('#cell-47').css("background-color", 'transparent');
    $('#cell-48').css("background-color", 'transparent');
    $('#cell-57').css("background-color", 'transparent');
    $('#cell-58').css("background-color", 'transparent');

    $('#cell-48').css("background-color", scuareColor);
    $('#cell-57').css("background-color", scuareColor);
    $('#cell-58').css("background-color", scuareColor);
    squareSmallLShapeToggle++;
  } else if (squareSmallLShapeToggle === 3) {
    $('#cell-47').css("background-color", 'transparent');
    $('#cell-48').css("background-color", 'transparent');
    $('#cell-57').css("background-color", 'transparent');
    $('#cell-58').css("background-color", 'transparent');

    $('#cell-47').css("background-color", scuareColor);
    $('#cell-48').css("background-color", scuareColor);
    $('#cell-58').css("background-color", scuareColor);
    squareSmallLShapeToggle = 0;
  }
}

var squareLargeLShapeToggle = 0;

function clearSquareLargeLShape() {
  var arr = ['31', '32', '33', '41', '43', '51', '52', '53'];

  for (var i = 0; i < arr.length; i++) {
    $('#cell-' + arr[i]).css("background-color", 'transparent');
  }
}

function squareLargeLShape() {
  if (squareLargeLShapeToggle === 0) {
    clearSquareLargeLShape();

    $('#cell-51').css("background-color", scuareColor);
    $('#cell-52').css("background-color", scuareColor);
    $('#cell-53').css("background-color", scuareColor);
    $('#cell-43').css("background-color", scuareColor);
    $('#cell-33').css("background-color", scuareColor);

    squareLargeLShapeToggle++;
  } else if (squareLargeLShapeToggle === 1) {
    clearSquareLargeLShape();

    $('#cell-53').css("background-color", scuareColor);
    $('#cell-43').css("background-color", scuareColor);
    $('#cell-33').css("background-color", scuareColor);
    $('#cell-32').css("background-color", scuareColor);
    $('#cell-31').css("background-color", scuareColor);
    squareLargeLShapeToggle++;
  } else if (squareLargeLShapeToggle === 2) {
    clearSquareLargeLShape();

    $('#cell-33').css("background-color", scuareColor);
    $('#cell-32').css("background-color", scuareColor);
    $('#cell-31').css("background-color", scuareColor);
    $('#cell-41').css("background-color", scuareColor);
    $('#cell-51').css("background-color", scuareColor);
    squareLargeLShapeToggle++;
  } else if (squareLargeLShapeToggle === 3) {
    clearSquareLargeLShape();

    $('#cell-31').css("background-color", scuareColor);
    $('#cell-41').css("background-color", scuareColor);
    $('#cell-51').css("background-color", scuareColor);
    $('#cell-52').css("background-color", scuareColor);
    $('#cell-53').css("background-color", scuareColor);
    squareLargeLShapeToggle = 0;
  }
}



























