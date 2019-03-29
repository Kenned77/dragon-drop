
class Board {
  constructor() {
    this.size = 10;
    this.element = $("<table>")
      .attr('ondrop', 'dropPieceOnBoard(event)')
      .attr('ondragover', 'allowDrop(event)');
    this.element.addClass('board');
    this.cellId = 1;
    for(var i = 0; i < this.size; i++)  {
      var nextRow = $("<tr>");
      for(var j = 0; j < this.size; j++) {
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
}
