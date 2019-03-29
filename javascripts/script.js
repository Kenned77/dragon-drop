
function pieceCanFit(type, startNum) {
  if (isItemInArray(pieces[type][0], startNum)
      || startNum > getLastItemInArray(pieces[type][0])) {
    return false;
  }

  for (let i = 0; i < pieces[type][1].length; i++) {
    if ($('#' + (startNum + pieces[type][1][i])).hasClass('color')) {
      return false;
    }
  }
  return true;
}

function checkingAnyMoveLeft() {
  const pieceType = [];
  let moveLeftList = [];
  let canMove = false;

  for (let i = 1; i <= 3; i++) {
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
    updateScore();
    checkAndRemove();
    endGameAndDisplayFinalScore();
  }
}

function endGameAndDisplayFinalScore() {
  let msg = '';

  if (score <= 100) {
    msg = "Final score is " + score + ". You can do better!";
  } else if (score > 100 || score < 200) {
    msg = "Final score is " + score + ". At least you got more than 100, but you can still do better";
  } else if (score >= 200) {
    msg = "Final score is " + score + ". Well done!";
  }

  setTimeout(() => {
    const response = confirm(msg + "\nYou wanna try again?");
    if (response == true) {
      restartGameAfterLoss();
    } else {
      toggleStartNewGameButton(false);
      alert("Have a great day!");
    }
  }, 500);
}

function convert(x, y) {
  let newRow = Math.floor(y / 30);
  let newCol = Math.floor(x / 30);
  return [newRow, newCol];
}

function calculateCoordinates(event) {
  const element = $(event.target).closest('table')[0].getBoundingClientRect();

  let elementLocation = [element.left, element.top];
  let clickLocation = [event.clientX, event.clientY];

  coordinatCol = clickLocation[0] - elementLocation[0];
  coordinatRow = clickLocation[1] - elementLocation[1];

  coordinatRow = Math.floor(coordinatRow / 30);
  coordinatCol = Math.floor(coordinatCol / 30);
}

function removeTiles(direction, row, col) {
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

function updateScore(row, col) {
  if (row) {
    score += row.length * 10;
  }

  if (col) {
    score += col.length * 10;
  }

  $('#score').text(score);
}

function checkAndRemove() {
  const arrRow = [];
  const arrCol = [];

  for (let row = 0; row < 10; row++) {
    let count = 1;
    for (let col = 0; col < 10; col++) {
      if (boardArray[row][col] === 1) {
        count++
      }
    }

    if (count > 10) {
      arrRow.push(row);
    }
  }

  for (let col = 0; col < 10; col++) {
    let count = 1;
    for (let row = 0; row < 10; row++) {
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

  for (let col = 0; col < arrCol.length; col++) {
    for (let row = 0; row < 10; row++) {
      boardArray[row][arrCol[col]] = 0;
    }
  }

  updateScore(arrRow, arrCol);
}
