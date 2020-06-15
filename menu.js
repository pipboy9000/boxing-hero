// import Game from './game.js';

let menuDiv = document.getElementById('menu');
let startBtn = document.getElementById('startBtn');
let calibrateBtn = document.getElementById('calibrateBtn');

startBtn.onclick = () => location.hash = "game";
calibrateBtn.onclick = () => location.hash = "calibrate";

function hide() {
    menuDiv.style.display = 'none';
}

function show() {
    menuDiv.style.display = 'flex';
}

export default {
    hide,
    show
}