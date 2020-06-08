import * as Game from './game.js';

let menuDiv = document.getElementById('menu');
let startBtn = document.getElementById('startBtn');
let calibrateBtn = document.getElementById('calibrateBtn');

async function init() {
    let menuDiv = document.getElementById('menu');
    let startBtn = document.getElementById('startBtn');
    let calibrateBtn = document.getElementById('calibrateBtn');

    startBtn.onclick = start;
}

export function start() {
    Game.newGame();
}

init();