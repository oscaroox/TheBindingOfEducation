import {ctx, canvas, Powerup_Flags} from "./Defines";
import {splice} from "./Globals";
import GameScene from "./GameScene";

export default class GameScore
{
    private _curScorePos: { x: number, y: number };  // position of current score
    private _highscorePos: { x: number, y: number }; // position of highscore
    private _score: number;                          // total displayed score
    private _highscore: number;                      // current highest score
    private _updateInterval: number;                 // time interval for adding point(s)
    private _lastUpdateTime: number;                 // time since we gave (a) point(s)
    private _fontSize: number;                       // size of text
    private _gameScene: GameScene;
    
    constructor(score: number, gameScene: GameScene)
    {
        this._curScorePos = { x: 0, y: 0 };
        this._highscorePos = { x: 0, y: 0 };
        this._score = score;
        this._highscore = localStorage.getItem('highscore') || 0;
        this._updateInterval = 250;    // .25 seconds
        this._fontSize = 40;
        this._lastUpdateTime = Date.now();

        this._gameScene = gameScene;

        this.init();
        this.draw();
    }

    public getPosition():{x:number, y:number} { return this._curScorePos; }
    
    public getScore():number { return this._score; }
    
    
    private init():void
    {
        this._curScorePos.x = 10 + canvas.width / 2 + this._gameScene.getPlayfield().getSprite(0).width / 2;
        this._curScorePos.y = this._fontSize;
        
        this._highscorePos.x = 10;
        this._highscorePos.y = this._fontSize * 1.5;
    }

    public updatePoints(score: number = 0):void
    {
        var curTime = Date.now(),
            diff    = curTime - this._lastUpdateTime;

        if (this._gameScene._gameSpeed > 5) {
            var mod = this._gameScene._gameSpeed / 5;

            this._updateInterval = 250 / mod;
        } else {
            this._updateInterval = 250;
        }

        if (diff > this._updateInterval) {
            var player       = this._gameScene.getPlayer(),
                powerupFlags = player.getPowerupFlags();

            var p = 1;
            
            (powerupFlags & Powerup_Flags.FLAG_DOUBLE_POINTS) ? this._score += p * 2 : this._score += p;

            this._lastUpdateTime = curTime;
        }

        this._score += score;
    }

    // draw it on screen
    private draw():void
    {
        var str    = String(this._score),
            score = str;

        var str2      = String(this._highscore),
            highscore = str2;

        // CURRENT SCORE TEXT
        if (this._score >= 1000) {
            score = splice(1, 0, str, ".");
        }

        // 10k
        if (this._score >= 10000) {
            score = splice(2, 0, str, ".");
        }

        // 100k
        if (this._score >= 100000) {
            score = splice(3, 0, str, ".");
        }

        // 1m
        if (this._score >= 1000000 && this._score < 10000000) {
            str = splice(1, 0, str, ".");
            score = splice(5, 0, str, ".");
        }

        // 10m
        if (this._score >= 10000000) {
            str = splice(2, 0, str, ".");
            score = splice(6, 0, str, ".");
        }


        // HIGHSCORE TEXT
        if (this._highscore >= 1000) {
            highscore = splice(1, 0, str2, ".");
        }

        // 10k
        if (this._highscore >= 10000) {
            highscore = splice(2, 0, str2, ".");
        }

        // 100k
        if (this._highscore >= 100000) {
            highscore = splice(3, 0, str2, ".");
        }

        // 1m
        if (this._highscore >= 1000000 && this._highscore < 10000000) {
            str2 = splice(1, 0, str2, ".");
            highscore = splice(5, 0, str2, ".");
        }

        // 10m
        if (this._highscore >= 10000000) {
            str2 = splice(2, 0, str2, ".");
            highscore = splice(6, 0, str2, ".");
        }

        // current score
        ctx.beginPath();
        ctx.font = this._fontSize + "px Verdana";
        ctx.fillStyle = "white";
        ctx.fillText(score, this._curScorePos.x, this._curScorePos.y);
        ctx.closePath();

        // highscore
        ctx.beginPath();
        ctx.font = this._fontSize/2 + "px Verdana";
        ctx.fillStyle = "white";
        ctx.fillText("HIGHSCORE", this._highscorePos.x, this._fontSize/2);
        ctx.closePath();

        ctx.beginPath();
        ctx.font = this._fontSize + "px Verdana";
        ctx.fillStyle = "white";
        ctx.fillText(highscore, this._highscorePos.x, this._highscorePos.y);
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