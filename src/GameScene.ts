import Player from './Player';
import GameScore from './GameScore';
import {canvas, ctx} from './Defines';
import Playfield from './Playfield';
import EnemiesMgr from "./EnemiesMgr";
import FruitMgr from "./FruitMgr";
import CookingOil from "./CookingOil";
import PowerupMgr from "./PowerupMgr";
import FloatingScoreMgr from "./FloatingScoreMgr";
import {isCollision} from "./Globals";
import __Object from "./Object";
import PowerupIcons from "./PowerupIcons";

// GAMESCENE
// Controls what is shown on screen
export default class GameScene
{
    public _gameSpeed: number;
    public _gameOver: boolean;

    private _score: GameScore;              // keeps track of and controls the score
    private _enemiesMgr: EnemiesMgr;        // keeps track of and spawns enemies
    private _fruitsMgr: FruitMgr;           // keeps track of and spawns group of fruits
    private _player: Player;                // keeps track of and controls the player character 
    private _playfield: Playfield;          // keeps track of the background and its themes and theme objects
    private _cookingOil: CookingOil;        // keeps track of and controls the oil on the bottom
    private _powerupMgr: PowerupMgr;        // keeps track of and controls the powerup sprites (effects in player class)
    private _floatingScoreMgr: FloatingScoreMgr;
    private _powerupIcons: PowerupIcons;
    private _loop: any;

    constructor() 
    {
        window.addEventListener("keydown", (e)=> { this.resetGameScene(e) });

        this.loadGame();
    }

    public getPlayer():Player { return this._player; }
    public getCookingOil():CookingOil { return this._cookingOil; }
    public getFruitsMgr():FruitMgr { return this._fruitsMgr; }
    public getEnemiesMgr():EnemiesMgr { return this._enemiesMgr; }
    public getPowerUpsMgr():PowerupMgr { return this._powerupMgr; }
    public getScore():GameScore { return this._score; }
    public getPlayfield():Playfield { return this._playfield; }
    public getFloatingScoreMgr():FloatingScoreMgr { return this._floatingScoreMgr; }
    public getPowerupIcons():PowerupIcons { return this._powerupIcons; }

    

    private loadGame():void
    {
        if (this._loop != null)
            cancelAnimationFrame(this._loop);

        this._gameOver = false;
        this._gameSpeed = 5;

        // add background
        this._playfield = new Playfield(this);

        // score handler
        this._score = new GameScore(0, this);

        // add cooking oil
        this._cookingOil = new CookingOil();

        // add player to scene
        this._player = new Player(this);

        // fruits manager
        this._fruitsMgr = new FruitMgr(this);

        // enemies manager
        this._enemiesMgr = new EnemiesMgr(this);

        // power up manager
        this._powerupMgr = new PowerupMgr(this);

        // floating points
        this._floatingScoreMgr = new FloatingScoreMgr(this);

        // active powerup icons
        this._powerupIcons = new PowerupIcons(this);

        // start update loop
        this.loop();
    }

    private resetGameScene(event: KeyboardEvent):void
    {
        // needs to be button R
        if (event.keyCode != 82) return;

        // game needs to be over if we want to reset
        if (!this._gameOver) return;

        this.loadGame();
    }

    // check collision against every object on the field
    public collisionCheck(object: __Object):boolean
    {
        var ax1 = object.getHitbox().x1,
            ax2 = object.getHitbox().x2,
            ay1 = object.getHitbox().y1 * 0.8,
            ay2 = object.getHitbox().y2,
            bx1,
            bx2,
            by1,
            by2;

        // fruit groups
        var groups = this._fruitsMgr.getFruitGroups();
        for(var i = 0; i < groups.length; i += 1) {
            var group  = groups[i];
            var fruits = group.getFruitSprites();

            // loop through collection of fruits from fruitGroups
            for(var j = 0; j < fruits.length; j += 1) {
                var fruit = fruits[j];

                // get fruit hitbox coordinates
                bx1 = fruit.getHitbox().x1;
                bx2 = fruit.getHitbox().x2;
                by1 = fruit.getHitbox().y1;
                by2 = fruit.getHitbox().y2;

                // check for collision
                if (isCollision(ax1, ax2, ay1, ay2, bx1, bx2, by1, by2))
                    return true;
            }
        }

        // enemies
        var enemies = this._enemiesMgr.getEnemySprites();
        for (var i = 0; i < enemies.length; i += 1) {
            var enemy = enemies[i];

            // get enemy hitbox coordinates
            bx1 = enemy.getHitbox().x1;
            bx2 = enemy.getHitbox().x2;
            by1 = enemy.getHitbox().y1;
            by2 = enemy.getHitbox().y2;

            // check for collision
            if (isCollision(ax1, ax2, ay1, ay2, bx1, bx2, by1, by2))
                return true;
        }

        // powerups
        var powerups = this._powerupMgr.getPowerupSprites();
        for (var i = 0; i < powerups.length; i += 1) {
            var power = powerups[i];

            // get powerup hitbox coordinates
            bx1 = power.getHitbox().x1;
            bx2 = power.getHitbox().x2;
            by1 = power.getHitbox().y1;
            by2 = power.getHitbox().y2;

            // check for collision
            if (isCollision(ax1, ax2, ay1, ay2, bx1, bx2, by1, by2))
                return true;
        }

        // playfield objects (mounts)
        var mount = this._playfield.getPlayfieldObject();
        if (mount != null) {
            bx1 = mount.getHitbox().x1;
            bx2 = mount.getHitbox().x2;
            by1 = mount.getHitbox().y1 - mount.getSprite().height * 1.5;      // leave room for boat
            by2 = mount.getHitbox().y2 + mount.getSprite().height * 1.5;

            // check for collision
            if (isCollision(ax1, ax2, ay1, ay2, bx1, bx2, by1, by2))
                return true;
        }

        // found no collision!
        return false;
    }

    private gameOver():void
    {
        var fontSize = 30;

        // rectangle
        var w = this._playfield.getSprite(0).width,
            h = 150,
            x = canvas.width / 2 - w / 2,
            y = canvas.height / 4;

        ctx.save();
        ctx.globalAlpha = 0.75;
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.fillRect(x, y, w, h);
        ctx.restore();


        // game over text
        ctx.font = fontSize + "px Arial";

        var str = "GAME OVER";
        x = canvas.width / 2 - ctx.measureText(str).width / 2;
        y = y + h / 2;

        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.fillText(str, x, y);
        ctx.closePath();


        str = "Druk op R om nog een keer te spelen!";
        x = canvas.width / 2 - ctx.measureText(str).width / 2;
        y = y + fontSize * 1.5;

        ctx.beginPath();
        ctx.fillText(str, x, y);
        ctx.closePath();
        
        this.saveScore();
    }
    
    private saveScore():void
    {
        var curHighscore = parseInt(localStorage.getItem('highscore')),
            curScore     = this._score.getScore();

        if (curScore > curHighscore) localStorage.setItem('highscore', String(this._score.getScore()));
    }
    
    // update current game scene
    // update in order of Z-axis
    // what should be drawn in the background first and what should be drawn up front last
    private update():void 
    {
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

        // update cooking oil
        this._cookingOil.update();

        // mounts
        this._playfield.updateObjects();

        // update player
        this._player.update();

        // floating points
        this._floatingScoreMgr.update();

        // update points
        this._score.update();

        // powerup icons
        this.getPowerupIcons().update();

        // game over text
        if (this._gameOver) this.gameOver();
    }

    // constant update loop
    private loop():void
    {
        this._loop = requestAnimationFrame(() => this.loop());
        this.update();
    }
}
