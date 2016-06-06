import {ctx, canvas, Powerup_Flags} from "./Defines";
import {splice} from "./Globals";
import GameScene from "./GameScene";

export default class GameScore
{
    private _x: number;                 // position x
    private _y: number;                 // position y
    private _points: number;            // total displayed score
    private _updateTimer: number;       // time interval for adding point(s)
    private _lastUpdateTime: number;    // time since we gave (a) point(s)
    private _fontSize: number;          // size of text
    private _gameScene: GameScene;
    
    constructor(points: number, gameScene: GameScene)
    {
        this._points = points;
        this._updateTimer = 250;    // .25 seconds
        this._fontSize = 40;
        this._lastUpdateTime = Date.now();

        this._gameScene = gameScene;

        this._x = 10 + canvas.width / 2 + this._gameScene.getPlayfield().getSprite(0).width / 2;
        this._y = this._fontSize;

        this.draw();
    }


    public addGameScene(gameScene: GameScene):void { this._gameScene = gameScene; }

    public updatePoints(points: number = 0):void
    {
        var curTime = Date.now(),
            diff    = curTime - this._lastUpdateTime;

        if (this._gameScene._gameSpeed > 5) {
            var mod = this._gameScene._gameSpeed / 5;

            this._updateTimer = 250 / mod;
        } else {
            this._updateTimer = 250;
        }

        if (diff > this._updateTimer) {
            var player       = this._gameScene.getPlayer(),
                powerupFlags = player.getPowerupFlags();

            var p = 1;
            
            (powerupFlags & Powerup_Flags.FLAG_DOUBLE_POINTS) ? this._points += p * 2 : this._points += 1;

            this._lastUpdateTime = curTime;
        }

        this._points += points;
    }

    // draw it on screen
    private draw():void
    {
        var str    = String(this._points),
            points = str;

        if (this._points >= 1000)
            points = splice(1, 0, str, ",");

        // 10k
        if (this._points >= 10000)
            points = splice(2, 0, str, ",");

        // 100k
        if (this._points >= 100000)
            points = splice(3, 0, str, ",");

        // 1m
        if (this._points >= 1000000 && this._points < 10000000) {
            str = splice(1, 0, str, ",");
            points = splice(5, 0, str, ",");
        }

        // 10m
        if (this._points >= 10000000) {
            str = splice(2, 0, str, ",");
            points = splice(6, 0, str, ",");
        }

        ctx.beginPath();
        ctx.font = this._fontSize + "px Verdana";
        ctx.fillStyle = "white";
        ctx.fillText(
            points,
            this._x,
            this._y
        );
        ctx.closePath();
    }
    
    // update score with some number
    public update():void
    {
        if (!this._gameScene._gameOver)
            this.updatePoints();
        
        this.draw();
    }
}