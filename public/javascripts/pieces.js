

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

const clearBoard = () => {
  if (confirm('are you sure?')) {
    for ( var i = 1; i <= 100; i++ ) {
      $('#' + i).removeClass('color').addClass('no-color');
    }

    score = 0;
    displayScore(score);
    createArr(arr);
  }
}

const pieces = [ // index 0 legal move, index 1 the piece type
  [
    [101], [0] // square small.
  ],
  [
    [10, 20, 30, 40, 50, 60, 70, 80, 90], [0, 1, 10, 11] // square medium.
  ],
  [
    [9, 10, 19, 20, 29, 30, 39, 40, 49, 50, 59, 60, 69, 79], [0, 1, 2, 10, 11, 12, 20, 21, 22] // square large
  ],
  [
    [91], [0, 10] // rectangle 2 vertical
  ],
  [
    [10, 20, 30, 40, 50, 60, 70, 80, 90, 100], [0, 1] // rectangle 2 horizontal
  ],
  [
    [81], [0, 10, 20] // rectangle 3 vertical
  ],
  [
    [9, 10, 19, 20, 29, 30, 39, 40, 49, 50, 59, 60, 69, 70, 79, 80, 89, 90, 99], [0, 1, 2] // rectangle 3 horizontal
  ],
  [
    [71], [0, 10, 20, 30] // rectangle 4 vertical
  ],
  [
    [8 ,9, 10, 18, 19, 20, 28, 29, 30, 38, 39, 40, 48, 49, 50, 58, 59, 60, 69, 69, 70, 78, 79, 80, 88, 89, 90, 98], [0, 1, 2, 3] // rectangle 4 horizontal
  ],
  [
    [61], [0, 10, 20, 30, 40] // rectangle 5 vertical
  ],
  [
    [7, 8, 9, 10, 17, 18, 19, 20, 27, 28, 29, 30, 37, 38, 39, 40, 47, 48, 49, 50, 57, 58, 59, 60, 67, 68, 69, 70, 77, 78, 79, 80, 87, 88, 89, 90, 97], [0, 1, 2, 3, 4] // rectangle 5 horizontal
  ],
  [
    [10, 20, 30, 40, 50, 60, 70, 80, 90], [0, 10, 11] // l-shape-small-1
  ],
  [
    [1, 11, 21, 31, 41, 51, 61, 71, 81, 91], [0, 9, 10] // l-shape-small-2
  ],
  [
    [10, 20, 30, 40, 50, 60, 70, 80, 90], [0, 1, 11] // l-shape-small-3
  ],
  [
    [10, 20, 30, 40, 50, 60, 70, 80, 90], [0, 1, 10] // l-shape-small-4
  ],
  [
    [9, 10, 19, 20, 29, 30, 39, 40, 49, 50, 59, 60, 69, 70, 79], [0, 10, 20, 21, 22] // l-shape-large-1
  ],
  [
    [1, 2, 11, 12, 21, 22, 31, 32, 41, 42, 51, 52, 61, 62, 71, 72, 81], [0, 10, 20, 19, 18] // l-shape-large-2
  ],
  [
    [9, 10, 19, 20, 29, 30, 39, 40, 49, 50, 59, 60, 69, 70, 79], [0, 1, 2, 12, 22] // l-shape-large-3
  ],
  [
    [9, 10, 19, 20, 29, 30, 39, 40, 49, 50, 59, 60, 69, 70, 79], [0, 1, 2, 10, 20] // l-shape-large-4
  ]
];
