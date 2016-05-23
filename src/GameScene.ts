import Enemy from './Enemy';
import Player from './Player';
import GameScore from './GameScore';
import * as d from './Defines';
import Fruit from './Fruit';
import Playfield from './Playfield';
import EnemiesMgr from "./EnemiesMgr";
import FruitMgr from "./FruitMgr";

// GAMESCENE
// Controls what is shown on screen
export default class GameScene
{
    private _score: GameScore;
    private _player: Player;
    private _stage: CanvasRenderingContext2D;
    private _playfield: Playfield;
    private _enemiesMgr: EnemiesMgr;
    private _fruitMgr: FruitMgr;

    constructor() 
    {
        // canvas
        this._stage = d.ctx;

        // add a game controller that handles player input events

        // score handler
        this._score = new GameScore(0);


        // add two enemies to scene
        this._enemiesMgr = new EnemiesMgr();
        
        // add two fruits to scene
        this._fruitMgr = new FruitMgr();
        
        // add player to scene
        this._player = new Player();

        this._playfield = new Playfield();


        // start update loop
        this.loop();
    }
    
    
    

    // update current game scene
    update():void 
    {

        // clear canvas for redraw
        this._stage.clearRect(0, 0, d.canvas.width, d.canvas.height);

        // background
        this._playfield.update();

        // fruit manager
        this._fruitMgr.update();

        // enemies manager
        this._enemiesMgr.update();

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
