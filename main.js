import Game from './game.js';
import Calibrate from './calibrate.js';
import Menu from './menu.js';

async function init() {
    window.addEventListener('hashchange', function () {
        switch (this.location.hash) {
            case '#menu':
                Game.gameOver();
                Menu.show();
                Game.hide();
                Calibrate.hide();
                break;

            case '#game':
                Game.show();
                Game.newGame();
                Menu.hide();
                Calibrate.hide();
                break;

            case '#calibrate':
                Calibrate.show();
                Game.gameOver();
                Game.hide();
                Menu.hide();
        }
    }, false);

    location.hash = 'menu';

}

init();