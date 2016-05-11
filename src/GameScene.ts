import Enemy from './Enemy';
import Pizza from './Pizza';
import Hamburger from './Hamburger';
import Player from './Player';
import GameScore from './GameScore';


// GAMESCENE
// Basically controls what is shown on screen
export default class GameScene
{
    /// FIELDS (class variables)
    _score: GameScore;
    _enemies: Enemy[] = [];
    _player: Player;
    _stage: any;

    /// CONSTRUCTOR (called when creating new class)
    constructor() {
        this._score = new GameScore(0);

        // add two enemies to scene
        this._enemies[0] = new Hamburger(0, 0);
        this._enemies[1] = new Pizza(0, 0);

        // add player to scene
        this._player = new Player(0, 0);

        console.log(this._player);
        console.log(this._enemies[0]);
        console.log(this._enemies[1]);

        // start update loop
        this.loop();
    }

    /// METHODS (class functions)
    // update current game's score points
    updateScore(p: number) {
        this._score.update(p);
    }

    // update current game scene
    update() {
        this.updateScore(50);

        for (let i = 0; i < this._enemies.length; i++) {
            this._enemies[i].update();
        }
        this._player.update();
        this._score.update();
    }

    // constant update loop
    loop() {
        var that = this;

        setInterval(function() {
            that.update();
        }, 500);
    }
}