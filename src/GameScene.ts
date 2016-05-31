import Player from './Player';
import GameScore from './GameScore';
import {canvas, ctx} from './Defines';
import Playfield from './Playfield';
import EnemiesMgr from "./EnemiesMgr";
import FruitMgr from "./FruitMgr";
import CookingOil from "./CookingOil";
import PowerupMgr from "./PowerupMgr";
import WorldMgr from "./WorldMgr";

// GAMESCENE
// Controls what is shown on screen
export default class GameScene
{
    private _score: GameScore;
    private _enemiesMgr: EnemiesMgr;
    private _fruitsMgr: FruitMgr;
    private _player: Player;
    private _playfield: Playfield;
    private _worldMgr: WorldMgr;
    private _cookingOil: CookingOil;
    private _powerupMgr: PowerupMgr;

    constructor() 
    {
        // add background
        this._playfield = new Playfield();
        
        // add player to scene
        this._player = new Player();

        // score handler
        this._score = new GameScore(0, this._playfield);
        
        // add cooking oil
        this._cookingOil = new CookingOil();

        // fruits manager
        this._fruitsMgr = new FruitMgr();
        
        // enemies manager
        this._enemiesMgr = new EnemiesMgr();
        
        // power up manager
        this._powerupMgr = new PowerupMgr();
        
        // objects manager and objects holder
        this._worldMgr = new WorldMgr(this._player, this._fruitsMgr, this._enemiesMgr, this._powerupMgr, this._cookingOil, this._score, this._playfield);
        this._enemiesMgr.addWorldMgr(this._worldMgr);
        this._fruitsMgr.addWorldMgr(this._worldMgr);
        this._powerupMgr.addWorldMgr(this._worldMgr);
        this._player.addWorldMgr(this._worldMgr);
        this._playfield.addWorldMgr(this._worldMgr);
        
        // start update loop
        this.loop();
    }
    

    // update current game scene
    // update in order of Z-axis
    // what should be drawn in the background first and what should be drawn up front last
    private update():void 
    {
        // if (this._player.getHealth() == 0)
        //     return;

        // clear canvas for redraw
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // background
        this._playfield.update();
        
        // fruit manager
        this._fruitsMgr.update();

        // powerups manager
        this._powerupMgr.update();

        // enemy manager
        this._enemiesMgr.update();

        // update player
        this._player.update();
        
        // update cooking oil
        this._cookingOil.update();

        // update points
        this._score.update();
    }

    // constant update loop
    private loop():void
    {
        requestAnimationFrame(() => this.loop());
        this.update();
    }
}
