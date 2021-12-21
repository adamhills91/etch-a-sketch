const container = document.getElementById('grid');
const colorPicker = document.getElementById('color');
const clearButton = document.getElementById('clear');
const colourButton = document.getElementById('colour-mode');
const rainbowButton = document.getElementById('rainbow-mode');
const eraserButton = document.getElementById('eraser');
const rangeSlider = document.getElementById('myRange');
let rangeSliderValue = rangeSlider.value;
const gridSizeDisplay = document.getElementById('grid-size');
let mode = 'color';
makeGrid(16, 16);

clearButton.addEventListener('click', function () {
    let cells = document.querySelectorAll('.grid-item');
    cells.forEach(cell => {
        cell.style.background = '#BFC0BF';
    })
})

colourButton.addEventListener('click', function () {
    mode = 'color';
    this.classList.add('active');
    eraserButton.classList.remove('active');
    rainbowButton.classList.remove('active');
})
eraserButton.addEventListener('click', function () {
    mode = 'eraser';
    this.classList.add('active');
    colourButton.classList.remove('active');
    rainbowButton.classList.remove('active');
})
rainbowButton.addEventListener('click', function () {
    mode = 'rainbow';
    this.classList.add('active');
    colourButton.classList.remove('active');
    eraserButton.classList.remove('active');
})

function makeGrid(rows, cols) {
    deleteGrid();
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);
    for (let i = 0; i < (rows * cols); i++) {
        let cell = document.createElement('div');
        container.appendChild(cell).className = 'grid-item';
        cell.addEventListener('mouseover', function() {
            assignColor(cell);
        })
    }
}

function assignColor(cell) {
    if (mode === 'color') {
        cell.style.background = colorPicker.value;
    } else if (mode === 'eraser') {
        cell.style.background = '#BFC0BF';
    } else if (mode === 'rainbow') {
        let randomColor = Math.floor(Math.random()*16777215).toString(16);
        cell.style.background = `#${randomColor}`;
    }
    
}

function deleteGrid() {
    const cells = document.querySelectorAll('.grid-item');
    for (let i = 0; i < cells.length; i++) {
        container.removeChild(cells[i]);
    }
}

rangeSlider.addEventListener('change', function() {
    rangeSliderValue = rangeSlider.value;
    makeGrid(rangeSliderValue, rangeSliderValue);
})

rangeSlider.addEventListener('input', function() {
    gridSizeDisplay.textContent = `${rangeSlider.value} x ${rangeSlider.value}`;
})