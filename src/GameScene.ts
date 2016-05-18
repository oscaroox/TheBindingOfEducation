import GameController from './GameController';
import Enemy from './Enemy';
import Pizza from './Pizza';
import Hamburger from './Hamburger';
import Player from './Player';
import GameScore from './GameScore';
import * as d from './Defines';
import Banana from './Banana';
import Apple from './Apple';
import Fruit from './Fruit';
import Playfield from './Playfield';


// GAMESCENE
// Controls what is shown on screen
export default class GameScene
{
    private _score: GameScore;
    private _enemies: Enemy[] = [];
    private _gameController: GameController;
    private _player: Player;
    private _stage: CanvasRenderingContext2D;
    private _fruit: Fruit[] = [];
    private _playfield: Playfield;

    constructor() 
    {
        // canvas
        this._stage = d.ctx;

        // add a game controller that handles player input events
        this._gameController = new GameController();

        // score handler
        this._score = new GameScore(0);


        // add two enemies to scene
        this._enemies[0] = new Hamburger(90, 90);
        this._enemies[1] = new Pizza(200, 200);

        // add two fruits to scene
        this._fruit[0] = new Banana(0, 0);
        this._fruit[1] = new Apple(0, 0);


        // add player to scene
        this._player = new Player(0, 0, this._gameController);

        this._playfield = new Playfield(0, 0);


        // start update loop
        this.loop();
    }
    

    // update current game scene
    update():void 
    {

        // clear canvas for redraw
        this._stage.clearRect(0, 0, d.canvas.width, d.canvas.height);

        this._playfield.update();

        // update all enemies on screen
        for (let i = 0; i < this._enemies.length; i++) {
            this._enemies[i].update();
        }

        // update player
        this._player.update();

        // update points
        this._score.update(1);
    }

    // constant update loop
    loop():void
    {
        requestAnimationFrame(() => this.loop());

        this.update();
    }
}
