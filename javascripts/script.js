
var Board = function() {
  this.size = 10;
  this.element = $("<table>")
    .attr('ondrop', 'dropPieceOnBoard(event)')
    .attr('ondragover', 'allowDrop(event)');
  this.element.addClass('board');
  this.cellId = 1;
  for(var i = 0; i < this.size; i++)  {
    var nextRow = $("<tr>");
    for(var j = 0; j < this.size; j++) {
      // var nextColumn = $("<td>" + this.cellId + "</td>")
      var nextColumn = $("<td>")
        .attr('id', this.cellId)
        .on('dragover', captureIdWhenDraggedOver)
        .on('dragleave', removeBackgroundShadow)
        .addClass('no-color');
      this.cellId++;
      nextRow.append(nextColumn);
    }
    this.element.append(nextRow);
  }
}

let createPieces = () => {
  for ( var i = 1; i <= 3; i++ ) {
    $('#piece-' + i).html('');
    let piece = new Piece(5,i, Math.floor(Math.random() * 19));
    $('#piece-' + i).append(piece.element);
  }
}

function captureIdWhenDraggedOver() {
  let startNum;
  startNum = parseInt(this.id);
  startNum = startNum - coordinatRow;
  startNum = startNum - coordinatCol;
  placePieceOnBoard(type, startNum, false);
}

let removeBackgroundShadow = () => {
  $('td').removeClass('backgroundShadow');
}

let pieceCanFit = (type, startNum) => {
  if (isItemInArray(pieces[type][0], startNum)
      || startNum > getLastItemInArray(pieces[type][0])) {
    return false;
  }

  for (var i = 0; i < pieces[type][1].length; i++) {
    if ($('#' + (startNum + pieces[type][1][i])).hasClass('color')) {
      return false;
    }
  }
  return true;
}

let Piece = function(size, cellId, type) {
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
    .addClass('singlePieceTable pieceSize')
    .on('mousedown', calculateCoordinates)
    .attr('id', 'tableId-' + this.cellId);
  for(var i = 0; i < this.size; i++)  {
    var nextRow = $("<tr>");
    for(var j = 0; j < this.size; j++) {
      var nextColumn = $("<td>");
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

let hide;
let type;

let drag = (ev) => {

  ev.dataTransfer.setData("text", ev.target.id);
  hide = ev.target.id.slice(8);

  type = $(ev.target).attr('type');

  $(ev.target).removeClass('pieceSize').addClass('pieceSizeDraged');
  shouldStartNewGameButtonHide(true);
}

let checkingAnyMoveLeft = () => {
  var pieceType = [];
  let moveLeftList = [];
  let canMove = false;

  for ( let i = 1; i <= 3; i++ ) {
    pieceType.push($('#piece-' + i).children().attr('type')); // Create list of the piece types to check for
  }

  $('.board').find('td').each(function() {
    if ($(this).hasClass('no-color')) {
      moveLeftList[moveLeftList.length] = parseInt($(this).attr('id')); // create list of start numbers to check pieces against
    }
  });

  pieceType.forEach(function(type) {
    if (type != undefined) {
      for ( let i = 0; i < moveLeftList.length; i++ ) {
        if (pieceCanFit(type, moveLeftList[i])) {
          canMove = true;
          return;
        }
      }
    }
  });

  if (!canMove) {
    displayScore(score);
    checkAndRemove();
    endGameAndDisplayFinalScore();
  }
}

const shouldStartNewGameButtonHide = (val) => {
  if (val) {
    $('.startNewGameButton').hide();
  } else {
    $('.startNewGameButton').show();
  }
}

const endGameAndDisplayFinalScore = () => {
  let msg = '';

  if (score <= 100) {
    msg = "Final score is " + score + ". You can do better!";
  } else if (score > 100 || score < 200) {
    msg = "Final score is " + score + ". At least you got more than 100, but you can still do better";
  } else if (score >= 200) {
    msg = "Final score is " + score + ". Well done!";
  }

  setTimeout(function(){
    var r = confirm(msg + "\nYou wanna try again?");
    if (r == true) {
      restartGameAfterLoss();
    } else {
      shouldStartNewGameButtonHide(false);
      alert("Have a great day!");
    }
  }, 1000);


}

let handleRow, handleCol, coordinatRow, coordinatCol ;

let convert = (x, y) => {
  let newRow = Math.floor(y / 30);
  let newCol = Math.floor(x / 30);
  return [newRow, newCol];
}

let calculateCoordinates = (event) => {
  const element = $(event.target).closest('table')[0].getBoundingClientRect();

  let elementLocation = [element.left, element.top];
  let clickLocation = [event.clientX, event.clientY];

  coordinatCol = clickLocation[0] - elementLocation[0];
  coordinatRow = clickLocation[1] - elementLocation[1];

  coordinatRow = Math.floor(coordinatRow / 30);
  coordinatCol = Math.floor(coordinatCol / 30);
}

let removeTiles = (direction, row, col) => {
  if (col > 10 || row > 100) {
    return;
  }

  setTimeout(function() {
    if (direction == 'row') {
      $('#' + (row * 10 + col)).removeClass('color').addClass('no-color');
      removeTiles(direction, row, col + 1);
    } else {
      $('#' + (row + col)).removeClass('color').addClass('no-color');
      removeTiles(direction, row + 10, col);
    }
  }, 50);
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

let checkAndRemove = () => {
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

  arrRow.forEach(row => {
    removeTiles('row', row, 1);
  });

  arrCol.forEach(col => {
    removeTiles('col', 1, col);
  });

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

