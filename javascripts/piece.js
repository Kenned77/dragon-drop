
class Piece {
  constructor(size, cellId, type) {
    this.size = size;
    this.cellId = cellId;
    this.type = type;

    this.shape = pieces[type][1];
    this.shapeSize5 = this.shape.map(function(num) {
      let r = Math.floor(num/10);
      let c = num % 10;
      return (r * 5) + c;
    });

    this.shapeSize5.sort(function(a, b){return a-b});
    this.createElement();
  }

  createElement() {
    let nexTileIndex = 0;

    this.element = $('<table>')
      .attr('draggable', 'true')
      .attr('ondragstart', 'startDragingPiece(event)')
      .attr('type', this.type)
      .addClass('singlePieceTable pieceSize')
      .on('mousedown', calculateCoordinates)
      .attr('id', 'tableId-' + this.cellId);

    for (let row = 0; row < this.size; row++)  {
      const nextRow = $('<tr>').appendTo(this.element);
      for (let col = 0; col < this.size; col++) {
        const nextColumn = $('<td>').appendTo(nextRow);
        const currentTileNumber = row * this.size + col;
        if (this.shapeSize5[nexTileIndex] === currentTileNumber) {
          nextColumn.addClass('color');
          nexTileIndex++;
        }
      }
    }
  }
}
