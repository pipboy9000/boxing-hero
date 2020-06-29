// import Game from './game.js';

let menuDiv = document.getElementById('menu');
let startBtn = document.getElementById('startBtn');
let calibrateBtn = document.getElementById('calibrateBtn');
let freestyleBtn = document.getElementById('freestyleBtn');
let optionsBtn = document.getElementById('optionsBtn');


startBtn.onclick = () => location.hash = "game";
calibrateBtn.onclick = () => location.hash = "calibrate";
freestyleBtn.onclick = () => location.hash = "freestyle";
optionsBtn.onclick = () => location.hash = "options";

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