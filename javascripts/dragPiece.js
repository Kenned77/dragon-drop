let boxCounter = 3;
let hide;
let type;

function allowDrop(ev) {
  ev.preventDefault();
}

function startDragingPiece(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  hide = ev.target.id.slice(8);

  type = $(ev.target).attr('type');

  $(ev.target).removeClass('pieceSize').addClass('pieceSizeDraged');
  shouldStartNewGameButtonHide(true);
}

function placePieceOnBoard(type, startNum, isDrop) {
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
    if (pieceCanFit(type, startNum)) {
      for (var i = 0; i < pieces[type][1].length; i++) {
        if (isDrop) {
          $('#' + (startNum + pieces[type][1][i])).removeClass('no-color').addClass('color');
        } else {
          $('#' + (startNum + pieces[type][1][i])).addClass('backgroundShadow');
        }
      }

      if (startNum > 0) {
        if (isDrop) {
          score += pieces[type][1].length;
          displayScore(score);
        }
      }
    }
  }

  // Create empty 10 * 10 empty array
  createArr(arr);

  // Create a copy of the grid based on which og the cells have a class of color
  dublicateGridToArr(arr);
  checkAndRemove();
}

function dropPieceOnBoard(ev) {
  removeBackgroundShadow();

  let correct = true;
  let startNum;

  ev.preventDefault();

  startNum = parseInt(ev.target.id);
  startNum = startNum - coordinatRow;
  startNum = startNum - coordinatCol;

  // Check if move is allowed
  for (var i = 0; i < pieces[type][1].length; i++) {
    if ($('#' + (startNum + pieces[type][1][i])).hasClass('color')) {
      correct = false;
    }
  }

  if (boxCounter >= 0 && correct) {
    $('#piece-' + hide).html('');
    boxCounter--;
  }

  if (boxCounter === 0) {
    createPieces();
    boxCounter = 3;
    checkingAnyMoveLeft();
  }

  placePieceOnBoard(type, startNum, true);

  checkingAnyMoveLeft();

  for ( let i = 1; i <= 3; i++ ) {
    $('#tableId-' + i).removeClass('pieceSizeDraged').addClass('pieceSize');
  }
}
