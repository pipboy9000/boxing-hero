import * as accel from './accelerometer.js';

const STATE = {
    GetReady: 0,
    Playing: 1,
    GameOver: 2
}

let gameDiv;
let flashDiv;
let hpBar;
let hpColor;
let timerCircle;
let timerSeconds;
let msg;

let level = 1;
let timer = 30;
let hp = 100;
let maxHp = 100;
let timerInterval;
let levelDiv;
let restartBtn;

let state = STATE.GameOver;

let onTimerEnd; //what to do when countdown is over

function init() {
    gameDiv = document.getElementById('game');
    hpBar = gameDiv.getElementsByClassName('hp')[0];
    hpColor = gameDiv.getElementsByClassName('hpColor')[0];
    timerCircle = gameDiv.getElementsByClassName('timerCircle')[0];
    timerSeconds = gameDiv.getElementsByClassName('timerSeconds')[0];
    msg = gameDiv.getElementsByClassName('msg')[0];
    levelDiv = gameDiv.getElementsByClassName('level')[0];
    restartBtn = document.getElementsByClassName('restartBtn')[0];
    flashDiv = document.getElementsByClassName('flash')[0];
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

async function newGame() {
    level = 0;
    setTimer(3, nextLevel);
    gameDiv.style.display = 'flex';
    state = STATE.GetReady;
    maxHp = 100;
    hp = 100;
    hpBar.style.width = "90%";
    hpColor.style.backgroundColor = "#62ff00";
    restartBtn.style.opacity = "0";
    setMsg("Get Ready!!");
}

function setMsg(str) {
    msg.innerText = str
};

function nextLevel() {
    level++;
    state = STATE.Playing;
    levelDiv.innerText = "Level " + level
    maxHp = 100 + level * 35;
    hp = maxHp;
    hpBar.style.width = "90%";
    hpColor.style.backgroundColor = "#62ff00";
    setMsg('GO!!!');
    setTimer(30, gameOver);
}

function getReady() {
    state = STATE.GetReady;
    setMsg("Get Ready");
    let rest = 10;
    setTimer(rest, nextLevel);
    hpBar.style.width = "90%";
    hpColor.style.backgroundColor = "#62ff00";

}

function gameOver() {
    setMsg('Game Over');
    state = STATE.GameOver;
    restartBtn.style.opacity = "1";
}

function flash(strength) {
    flashDiv.style.opacity = strength * 5;
    flashDiv.style.transition = "";
    setTimeout(() => {
        flashDiv.style.opacity = "0";
        flashDiv.style.transition = "opacity 0.3s easein";
    }, 30)
}

function hit(hit) {
    if (state == STATE.Playing) {
        flash(hit);
        hp -= hit;
        if (hp < 0) hp = 0;
        let hpNormalized = hp / maxHp;
        hpBar.style.width = hpNormalized * 100 + "%";
        hpColor.style.backgroundColor = `hsl(${hpNormalized * 120}, 100%, 60%)`;
        if (hp == 0) {
            getReady();
        }
    }
}

function hide() {
    gameDiv.style.display = 'none';
    gameOver();
}

function show() {
    gameDiv.style.display = 'flex';
    newGame();
}

init();

export default {
    hit,
    gameOver,
    newGame,
    hide,
    show
}