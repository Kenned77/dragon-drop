
function isItemInArray(array, item) {
  return array.indexOf(item) >= 0;
}

function getLastItemInArray(array) {
  return array[array.length - 1];
}

function getRandomNumber(maxNum) {
  return Math.floor(Math.random() * maxNum);
}

function toggleStartNewGameButton(value) {
  $('.startNewGameButton').toggle(!value);
}
