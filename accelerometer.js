import Game from './game.js';

let minHit = 5;
let wait = 0;

function handleMotionEvent(event) {

    var x = event.acceleration.x;
    var y = event.acceleration.y;
    var z = event.acceleration.z;

    let hit = Math.sqrt(x * x + y * y + z * z); //movement vector length 

    if (wait > 0) {
        wait--;
    } else if (hit > minHit) {
        wait = 20;
        console.log("hit: " + hit);
        Game.hit(hit);
    }
}



window.addEventListener("devicemotion", handleMotionEvent, true);