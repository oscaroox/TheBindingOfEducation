import GameController from './GameController';
import Enemy from './Enemy';
import Pizza from './Pizza';
import Hamburger from './Hamburger';
import Player from './Player';
import GameScore from './GameScore';
import * as d from './Defines';


// GAMESCENE
// Controls what is shown on screen
export default class GameScene
{
    private _score: GameScore;
    private _enemies: Enemy[] = [];
    private _gameController: GameController;
    private _player: Player;
    private _stage: CanvasRenderingContext2D;
    
    constructor() 
    {
        // canvas
        this._stage = d.ctx;

        // score handler
        this._score = new GameScore(0);

        // add two enemies to scene
        this._enemies[0] = new Hamburger(0, 0, this._stage);
        this._enemies[1] = new Pizza(0, 0, this._stage);

        // add player to scene
        this._player = new Player(0, 0, this._stage);

        // add a game controller
        this._gameController = new GameController();

        // start update loop
        this.loop();
    }
    

    // update current game scene
    update():void 
    {
        // clear canvas for redraw
        this._stage.clearRect(0, 0, d.canvas.width, d.canvas.height);

        // update all enemies on screen
        for (let i = 0; i < this._enemies.length; i++) {
            this._enemies[i].update();
        }

        // update player
        this._player.update(this._gameController.getInputState());

        // update points
        this._score.update(50);
    }

    // constant update loop
    loop():void 
    {
        var that = this;

        setInterval(function() {
            that.update();
        }, 500);
    }
}