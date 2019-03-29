
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
      toggleStartNewGameButton(false);
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

  for (var row = 0; row < 10; row++) {
    var count = 1;
    for (var col = 0; col < 10; col++) {
      if (boardArray[row][col] === 1) {
        count++
      }
    }

    if (count > 10) {
      arrRow.push(row);
    }
  }

  for (var col = 0; col < 10; col++) {
    var count = 1;
    for (var row = 0; row < 10; row++) {
      if (boardArray[row][col] === 1) {
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

  for (let row = 0; row < arrRow.length; row++) {
    for (let col = 0; col < 10; col++) {
      boardArray[row][col] = 0;
    }
  }

  for ( var col = 0; col < arrCol.length; col++ ) {
    for ( var row = 0; row < 10; row++ ) {
      boardArray[row][arrCol[col]] = 0;
    }
  }

  displayScore(score, arrRow, arrCol);
}

function dublicateGridToArr(arr) {
  let tileNumber = 1;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if ($('#' + tileNumber).hasClass('color')) {
        boardArray[i][j] = 1;
      } else {
        boardArray[i][j] = 0;
      }
      tileNumber++;
    }
  }
}




