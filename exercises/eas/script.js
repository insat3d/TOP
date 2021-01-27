const container = document.querySelector('.container');
const defaultGridSize = 25;
let activeColor = '#ff6600';

init(defaultGridSize);

function getGridSize() {
  return (
    Number(prompt('Enter grid length (less than 100)', defaultGridSize)) ||
    defaultGridSize
  );
}

function updateGridSize(gridsize) {
  document.querySelector('.gridsize').textContent = `${gridsize} X ${gridsize}`;
}

function init(gridsize) {
  initGrid(gridsize);
  populateGrid(gridsize);
  updateGridSize(gridsize);
  addHandlers();
}

function initGrid(gridsize) {
  document.documentElement.style.setProperty(`--gridsize`, `${gridsize}`);
}

function populateGrid(gridsize) {
  let docFragment = document.createDocumentFragment();
  for (let i = 0; i < gridsize ** 2; i++) {
    let cell = document.createElement('div');
    cell.classList.add('cells');
    docFragment.appendChild(cell);
  }
  container.appendChild(docFragment);
}

function addHandlers() {
  let cells = document.querySelectorAll('.cells');
  cells.forEach((cell) => cell.addEventListener('mouseover', colorme));
  const colorPicker = document.querySelector('#color');
  colorPicker.addEventListener('change', changeColor);
  const btnReset = document.querySelector('#btnReset');
  btnReset.addEventListener('click', clearAll);
}

function changeColor() {
  // document.documentElement.style.setProperty(`--bgcolor`, this.value);
  activeColor = this.value;
}

function colorme() {
  this.style.backgroundColor = activeColor;
}

function clearAll() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  let gridsize;
  do {
    gridsize = getGridSize();
  } while (gridsize < 0 || gridsize > 100);
  init(gridsize);
}
