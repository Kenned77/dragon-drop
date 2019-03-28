

// Creating an array to replicate the board to v

const createArr = (arr) => {
  for ( var i = 0; i < 10; i++ ) {
    arr[i] = [];
    for ( var j = 0; j < 10; j++ ) {
      arr[i][j] = null;
    }
  }

  return arr;
}

const dublicateGridToArr = (arr) => {
  var start = 1;
  for ( var i = 0; i < 10; i++ ) {
    for ( var j = 0; j < 10; j++ ) {
      if ( $('#' + start).hasClass('color')) {
        arr[i][j] = 1;
        start++;
      } else {
        arr[i][j] = 0;
        start++;
      }
    }
  }
}

const startNewGame = () => {
  for ( var i = 1; i <= 100; i++ ) {
    $('#' + i).removeClass('color').addClass('no-color');
  }

  score = 0;
  displayScore(score);
  createArr(arr);
  createPieces();
  shouldStartNewGameButtonHide(true);
}

const pieces = [ // index 0 legal move, index 1 the piece type
  [
    [101], [0] // square small. - 0
  ],
  [
    [10, 20, 30, 40, 50, 60, 70, 80, 90], [0, 1, 10, 11] // square medium. - 1
  ],
  [
    [9, 10, 19, 20, 29, 30, 39, 40, 49, 50, 59, 60, 69, 79], [0, 1, 2, 10, 11, 12, 20, 21, 22] // square large - 2
  ],
  [
    [91], [0, 10] // rectangle 2 vertical - 3
  ],
  [
    [10, 20, 30, 40, 50, 60, 70, 80, 90, 100], [0, 1] // rectangle 2 horizontal - 4
  ],
  [
    [81], [0, 10, 20] // rectangle 3 vertical - 5
  ],
  [
    [9, 10, 19, 20, 29, 30, 39, 40, 49, 50, 59, 60, 69, 70, 79, 80, 89, 90, 99], [0, 1, 2] // rectangle 3 horizontal - 6
  ],
  [
    [71], [0, 10, 20, 30] // rectangle 4 vertical - 7
  ],
  [
    [8 ,9, 10, 18, 19, 20, 28, 29, 30, 38, 39, 40, 48, 49, 50, 58, 59, 60, 69, 69, 70, 78, 79, 80, 88, 89, 90, 98], [0, 1, 2, 3] // rectangle 4 horizontal - 8
  ],
  [
    [61], [0, 10, 20, 30, 40] // rectangle 5 vertical - 9
  ],
  [
    [7, 8, 9, 10, 17, 18, 19, 20, 27, 28, 29, 30, 37, 38, 39, 40, 47, 48, 49, 50, 57, 58, 59, 60, 67, 68, 69, 70, 77, 78, 79, 80, 87, 88, 89, 90, 97], [0, 1, 2, 3, 4] // rectangle 5 horizontal - 10
  ],
  [
    [10, 20, 30, 40, 50, 60, 70, 80, 90], [0, 10, 11] // l-shape-small-1 - 11
  ],
  [
    [10, 20, 30, 40, 50, 60, 70, 80, 90], [1, 11, 10] // l-shape-small-2 - 12
  ],
  [
    [10, 20, 30, 40, 50, 60, 70, 80, 90], [0, 1, 11] // l-shape-small-3 - 13
  ],
  [
    [10, 20, 30, 40, 50, 60, 70, 80, 90], [0, 1, 10] // l-shape-small-4 - 14
  ],
  [
    [9, 10, 19, 20, 29, 30, 39, 40, 49, 50, 59, 60, 69, 70, 79], [0, 10, 20, 21, 22] // l-shape-large-1 - 15
  ],
  [
    [9, 10, 19, 20, 29, 30, 39, 40, 49, 50, 59, 60, 69, 70, 79], [2, 12, 22, 21, 20] // l-shape-large-2 - 16
  ],
  [
    [9, 10, 19, 20, 29, 30, 39, 40, 49, 50, 59, 60, 69, 70, 79], [0, 1, 2, 12, 22] // l-shape-large-3 - 17
  ],
  [
    [9, 10, 19, 20, 29, 30, 39, 40, 49, 50, 59, 60, 69, 70, 79], [0, 1, 2, 10, 20] // l-shape-large-4 - 18
  ]
];
