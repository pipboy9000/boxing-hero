import * as accel from './accelerometer.js';

const STATE = {
    Paused: 0,
    Playing: 1,
}

let gameDiv;
let hpBar;

let level = 1;
let timer = 30;
let hp = 100;
let maxHp = 100;

let state = STATE.Paused;

function init() {
    gameDiv = document.getElementById('game');
    hpBar = gameDiv.getElementsByClassName('fill')[0];
}

export function start() {
    level = 1;
    timer = 30;
    gameDiv.style.display = 'flex';
    state = STATE.Playing;
}

export function hit(hit) {
    if (state == STATE.Playing) {
        hp -= hit;
        if (hp < 0) hp = 0;
        hpBar.style.width = (hp / maxHp) * 100 + "%";
    }
}

init();