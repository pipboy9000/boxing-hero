let calibrateDiv = document.getElementsByClassName('calibrate')[0];
let hitRing = calibrateDiv.querySelector('.hitRing > img');
let hitCircle = calibrateDiv.getElementsByClassName('hitCircle')[0];
let slider = calibrateDiv.getElementsByTagName('input')[0];

slider.oninput = e => {
    hitTarget = 31 - +e.target.value
    localStorage.setItem('hitTarget', hitTarget);
};

//for testing
// calibrateDiv.onclick = e => {
//     let event = {
//         acceleration: {
//             x: 10,
//             y: 0,
//             z: 0,
//         }
//     }

//     hit(event);
//     hitWait = 0;
//     setTimeout(() => {
//         greenWait = 0;
//     }, 500)
// }

let hitTarget = parseInt(localStorage.getItem('hitTarget') || 10);
slider.value = 31 - hitTarget;
let hitLevel = 0;
let active = false;
let hitWait = 0; //frames to wait before registering another hit
let greenWait = 0; //frames to wait before clearing green ring color

function show() {
    calibrateDiv.style.display = 'flex';
    window.addEventListener("devicemotion", hit, true);
    active = true;
    requestAnimationFrame(render);
}

function hide() {
    calibrateDiv.style.display = 'none';
    window.removeEventListener("devicemotion", hit, true);
    active = false;
}

function hit(event) {

    let x = event.acceleration.x;
    let y = event.acceleration.y;
    let z = event.acceleration.z;

    let v = Math.sqrt(x * x + y * y + z * z); //movement vector length

    if (v > 2) {
        hitLevel = v;
        hitWait = 10;

        let n = v / hitTarget //normalize with hitTarget
        console.log(n);
        if (n > 0.9 && n < 1.1) {
            greenWait = 30;
        }
    }

    greenWait--;
}

function render() {

    let n = hitLevel / hitTarget;

    if (greenWait > 28) {
        hitCircle.style.transform = `scale(1)`;
    } else {
        hitCircle.style.transform = `scale(${n})`;
    }


    if (greenWait > 0) {
        hitRing.style.border = "5px solid #1dff4f";
    } else {
        hitRing.style.border = "";
    }

    hitLevel *= 0.875;

    if (hitWait > 0) {
        hitWait--;
    }

    if (active) {
        requestAnimationFrame(render);
    }
}

function getHitTarget() {
    return hitTarget;
}

export default {
    hide,
    show,
    getHitTarget
}