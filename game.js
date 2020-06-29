import Effects from './effects.js';
import Calibrate from './calibrate.js';

const STATE = {
    GetReady: 0,
    Playing: 1,
    GameOver: 2
}

const GAME_TYPE = {
    normal: 0,
    freestyle: 1
}

let gameDiv;
let hpBar;
let hpColor;
let timerDiv;
let timerCircle;
let timerSeconds;
let msg;

let level = 1;
let timer = 30;
let hp = 45;
let maxHp = 45;
let hitWait = 0;
let minHit = 5;
let hitTarget;
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
    timerDiv = gameDiv.getElementsByClassName('timer')[0];
    msg = gameDiv.getElementsByClassName('msg')[0];
    levelDiv = gameDiv.getElementsByClassName('level')[0];
    restartBtn = document.getElementsByClassName('restartBtn')[0];
    restartBtn.onclick = newGame;
}

function setTimer(seconds, callback) {
    timerCircle.style.opacity = 1;
    timerSeconds.innerText = seconds;
    timer = seconds;
    onTimerEnd = callback;
    onTimerEnd = callback;
    timerCircle.style.strokeDashoffset = "0";
    timerCircle.style.transition = "";
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timer--;
        if (timer > 0) {
            timerSeconds.innerText = timer.toString();
        } else {
            timerSeconds.innerText = timer.toString();
            timerCircle.style.opacity = 0;
            clearInterval(timerInterval);
            onTimerEnd();
        }
    }, 1000)

    setTimeout(() => {
        timerCircle.style.transition = "stroke-dashoffset " + seconds + "s linear, opacity 0.5s linear";
        timerCircle.style.strokeDashoffset = "100";
        timerCircle.style.opacity = 1;
    }, 50)
}

function newGame() {
    hitTarget = Calibrate.getHitTarget();
    level = 0;
    setTimer(3, nextLevel);
    gameDiv.style.display = 'flex';
    timerDiv.style.opacity = "1";
    state = STATE.GetReady;
    maxHp = 45;
    hp = 45;
    hpBar.style.width = "100%";
    hpColor.style.backgroundColor = "#62ff00";
    restartBtn.style.opacity = "0";
    restartBtn.onclick = '';
    setMsg("Get Ready!!");

    window.addEventListener("devicemotion", hit, true);
}

function newGameFreestyle() {
    hitTarget = Calibrate.getHitTarget();
    level = 0;
    setTimer(3, startFreestyle);
    gameDiv.style.display = 'flex';
    timerDiv.style.opacity = "1";
    state = STATE.GetReady;
    maxHp = 45;
    hp = 45;
    hpBar.style.width = "100%";
    hpColor.style.backgroundColor = "#62ff00";
    restartBtn.style.opacity = "0";
    restartBtn.onclick = '';
    setMsg("Get Ready!!");

    window.addEventListener("devicemotion", hit, true);
}

function startFreestyle() {

}

function setMsg(str) {
    msg.innerText = str
};

function nextLevel() {
    state = STATE.Playing;
    levelDiv.innerText = "Level " + level
    maxHp = 45 + level * 5;
    hp = maxHp;
    hpBar.style.width = "100%";
    hpColor.style.backgroundColor = "#62ff00";
    setMsg('GO!!!');
    setTimer(30 + level * 3, gameOver);
    level++;
}

function getReady() {
    state = STATE.GetReady;
    setMsg("Get Ready");
    let rest = 5 + level * 3;
    setTimer(rest, nextLevel);
    hpBar.style.width = "100%";
    hpColor.style.backgroundColor = "#62ff00";

}

function gameOver() {
    setMsg('Game Over');
    state = STATE.GameOver;
    restartBtn.style.opacity = "1";
    timerDiv.style.opacity = "0";
    restartBtn.onclick = newGame;
    window.removeEventListener("devicemotion", hit, true);
}

function hit(event) {

    if (hitWait > 0) {
        hitWait--;
        return;
    }

    let x = event.acceleration.x;
    let y = event.acceleration.y;
    let z = event.acceleration.z;

    let hit = Math.sqrt(x * x + y * y + z * z); //movement vector length 

    console.log(hit, hitWait)


    if (state == STATE.Playing) {

        hitWait = 15;


        if (hit < minHit) return;

        hit /= hitTarget; //calibrate

        hp -= hit;

        if (hp < 0) hp = 0;

        let hpNormalized = hp / maxHp;
        hpBar.style.width = hpNormalized * 100 + "%";
        hpColor.style.backgroundColor = `hsl(${Math.floor(hpNormalized * 120)},100%,60%)`;

        Effects.spawnParticles(5, x, y);
        Effects.flash(0.2);

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
    newGameFreestyle,
    hide,
    show
}