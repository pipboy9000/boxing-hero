import * as accel from './accelerometer.js';

const STATE = {
    Paused: 0,
    Playing: 1,
}

let gameDiv;
let hpBar;
let timerCircle;
let timerSeconds;
let msg;
let hitBtn;

let level = 1;
let timer = 30;
let hp = 100;
let maxHp = 100;
let timerInterval;
let levelDiv;
let restartBtn;

let state = STATE.Paused;

let onTimerEnd; //what to do when countdown is over

function init() {
    gameDiv = document.getElementById('game');
    hpBar = gameDiv.getElementsByClassName('fill')[0];
    timerCircle = gameDiv.getElementsByClassName('timerCircle')[0];
    timerSeconds = gameDiv.getElementsByClassName('timerSeconds')[0];
    msg = gameDiv.getElementsByClassName('msg')[0];
    levelDiv = gameDiv.getElementsByClassName('level')[0];

    hitBtn = document.getElementById('hitBtn');
    hitBtn.onclick = function () {
        hit(10);
    }

    restartBtn = document.getElementsByClassName('restartBtn')[0];
    restartBtn.onclick = newGame;

}

function setTimer(seconds, callback) {
    timerSeconds.innerText = seconds;
    timer = seconds;
    onTimerEnd = callback;
    onTimerEnd = callback;
    timerCircle.style.strokeDashoffset = "0";
    timerCircle.style.transition = ""
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timer--;
        if (timer > 0) {
            timerSeconds.innerText = timer.toString();
        } else {
            timerSeconds.innerText = timer.toString();
            clearInterval(timerInterval);
            onTimerEnd();
        }
    }, 1000)

    setTimeout(() => {
        timerCircle.style.transition = "stroke-dashoffset " + seconds + "s linear";
        timerCircle.style.strokeDashoffset = "100";
    }, 50)
}

export function newGame() {
    level = 0;
    setTimer(3, nextLevel);
    gameDiv.style.display = 'flex';
    state = STATE.Paused;
    maxHp = 100;
    hp = 100;
    hpBar.style.width = "100%";
    restartBtn.style.opacity = "0";
    setMsg("Get Ready");
}

function setMsg(str) {
    msg.innerText = str
};

function nextLevel() {
    level++;
    levelDiv.innerText = "Level " + level
    maxHp = 100 + level * 35;
    hp = maxHp;
    state = STATE.Playing;
    setMsg('GO!!!');
    setTimer(30, gameOver);
}

function getReady() {
    state = STATE.Paused;
    setMsg("Get Ready");
    let rest = 3 + level * 3
    setTimer(rest, nextLevel);
    hpBar.style.width = "100%";

}

function gameOver() {
    setMsg('Game Over');
    state = STATE.Paused;
    restartBtn.style.opacity = "1";
}

export function hit(hit) {
    if (state == STATE.Playing) {
        hp -= hit;
        if (hp < 0) hp = 0;
        hpBar.style.width = (hp / maxHp) * 100 + "%";

        if (hp == 0) {
            getReady();
        }
    }
}

init();