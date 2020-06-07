import * as Game from './game.js';

let menuDiv = document.getElementById('menu');
let startBtn = document.getElementById('startBtn');
let calibrateBtn = document.getElementById('calibrateBtn');

function init() {
    let menuDiv = document.getElementById('menu');
    let startBtn = document.getElementById('startBtn');
    let calibrateBtn = document.getElementById('calibrateBtn');

    startBtn.onclick = start;
}

export function start() {
    Game.start();
}

export function gameOver() {
    Menu.show();
    Game.start();
}

init();