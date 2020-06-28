let calibrateDiv = document.getElementsByClassName('calibrate')[0];
let hitRing = calibrateDiv.getElementsByClassName('hitRing')[0];
let hitCircle = calibrateDiv.getElementsByClassName('hitCircle')[0];
let slider = calibrateDiv.getElementsByTagName('input')[0];
let whiteBg = calibrateDiv.getElementsByClassName('whiteBg')[0];

slider.oninput = e => hitTarget = 31 - +e.target.value;

let hitTarget = 10;
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

    if (hitWait > 0) {
        hitWait--;
        return;
    }

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
            whiteBg.style.opacity = 1;
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
        whiteBg.style.opacity = greenWait / 28;
    } else {
        hitRing.style.border = "";
    }

    hitLevel *= 0.875;

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