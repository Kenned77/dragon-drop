
class Board {
  constructor() {
    this.size = 10;
    this.element = $('<table>')
      .attr('ondrop', 'dropPieceOnBoard(event)')
      .attr('ondragover', 'allowDrop(event)')
      .addClass('board');
    for (let row = 0; row < this.size; row++)  {
      const nextRow = $('<tr>').appendTo(this.element);
      for(let col = 0; col < this.size; col++) {
        const cellId = row * this.size + col + 1;
        $('<td>')
          .appendTo(nextRow)
          .attr('id', cellId)
          .on('dragover', captureIdWhenDraggedOver)
          .on('dragleave', removeBackgroundShadow)
          .addClass('no-color board-tile');
      }
    }
  }
}

function captureIdWhenDraggedOver() {
  let startNum;
  startNum = parseInt(this.id);
  startNum = startNum - coordinatRow;
  startNum = startNum - coordinatCol;
  placePieceOnBoard(type, startNum, false);
}

function removeBackgroundShadow() {
  $('td').removeClass('backgroundShadow');
}
