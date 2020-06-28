import Game from './game.js';
import Calibrate from './calibrate.js';
import Menu from './menu.js';

function lockScreen() {
    if (window.plugins && window.plugins.insomnia)
        window.plugins.insomnia.keepAwake();
}

function unlockScreen() {
    if (window.plugins && window.plugins.insomnia)
        window.plugins.insomnia.allowSleepAgain()
}

async function init() {

    window.addEventListener('hashchange', function () {
        switch (this.location.hash) {
            case '#menu':
                Game.gameOver();
                Menu.show();
                Game.hide();
                Calibrate.hide();
                unlockScreen();
                break;

            case '#game':
                Game.show();
                Game.newGame();
                Menu.hide();
                Calibrate.hide();
                lockScreen();
                break;

            case '#calibrate':
                Calibrate.show();
                Game.gameOver();
                Game.hide();
                Menu.hide();
                lockScreen();
        }
    }, false);

    location.hash = 'menu';
}

init();