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
    .attr('ondragstart', 'startDragingPiece(event)')
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
