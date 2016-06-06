import {canvas, ctx, Theme, Lane_Position} from "./Defines";
import {getRandomInt} from "./Globals";
import Mount from "./Mount";
import GameScene from "./GameScene";

export default class Playfield
{
    private _x: number[] = [];                          // x coordinates
    private _y: number[] = [];                          // y coordinates
    private _sprites: HTMLImageElement[] = [];          // path to sprite(sheet) files
    private _spriteTheme: Theme[];                      // holds theme ID for each individual sprite
    private _theme: Theme;                              // determines what playfield theme sprite to load
    private _time: number;                              // holds time of when we last changed theme
    private _playfieldObject: Mount;                    // objects that spawn with certain themes
    private _firstThemeSprite: number;                  // first theme sprite where objects can spawn
    private _lastThemeSprite: number;                   // last background sprite where playfield objects should stop
    private _gameScene: GameScene;

    constructor()
    {
        var source = "images/bg_540_960.png";
        this.loadSprite(source);
        
        this._time  = Date.now();

        this._playfieldObject  = null;
        this._firstThemeSprite = null;
        this._lastThemeSprite  = null;

        // we start in the forrest
        this._theme = Theme.THEME_FORREST;
        this._spriteTheme = [Theme.THEME_FORREST, Theme.THEME_FORREST];

        this.init();
    }

    public getPlayfieldObject():Mount { return this._playfieldObject; }

    public getSprite(index: number):HTMLImageElement { return this._sprites[index]; }

    public getFirstThemeSprite():number { return this._firstThemeSprite; }
    
    public getLastThemeSprite():number { return this._lastThemeSprite; }
    
    public getPosition(index: number):{ x: number, y: number } { return { x: this._x[index], y: this._y[index] }; }
    
    public getPositionYArray():number[] { return this._y; }
    
    public getSpriteTheme(index: number):Theme { return this._spriteTheme[index]; }

    
    public addGameScene(gameScene: GameScene):void { this._gameScene = gameScene; }

    private loadSprite(src):void 
    {
        this._sprites[0] = new Image();
        this._sprites[0].src = src;

        this._sprites[1] = new Image();
        this._sprites[1].src = src;
    }

    private init():void
    {
        this._x[0] = (canvas.width / 2) - (this._sprites[0].width / 2);
        this._y[0] = canvas.height / 2;
        this._x[1] = this._x[0];
        this._y[1] = this._y[0] - this._sprites[0].height;

        this.draw();
    }
    
    

    private spawnBoat(index: number):void
    {
        var randLane = getRandomInt(0, 2),
            otherbg  = (index) ? 0 : 1;

        var sprite = "images/boat.png",
            x      = Lane_Position[randLane],
            y      = this._y[otherbg] - 90;     // 90 = boat height
        
        this._lastThemeSprite  = null;
        this._playfieldObject  = new Mount(sprite, x, y, randLane, this._gameScene);
    }

    private changeScenery(index: number):void
    {
        var diff = Date.now() - this._time;

        // forrest playfield (start, mid and end)
        if (this._theme == Theme.THEME_FORREST) {
            var tempSprite = new Image();
            tempSprite.src = "images/bg_540_960.png";

            this._sprites[index] = tempSprite;
            this._spriteTheme[index] = Theme.THEME_FORREST;
        }

        // mid river playfield
        if (this._theme == Theme.THEME_RIVER) {
            var tempSprite = new Image();
            tempSprite.src = "images/bg_2_mid_540_960.png";

            this._firstThemeSprite = null;
            this._sprites[index] = tempSprite;
            this._spriteTheme[index] = Theme.THEME_RIVER;
        }

        // start river playfield
        if (diff > 10000 && this._theme == Theme.THEME_FORREST) {
            var tempSprite = new Image();
            tempSprite.src = "images/bg_2_start_540_960.png";

            this._firstThemeSprite = index;
            this._sprites[index] = tempSprite;
            this._theme = Theme.THEME_RIVER;
            this._spriteTheme[index] = Theme.THEME_RIVER;

            // reset timer
            this._time  = Date.now();

            // add boat to start of river
            this.spawnBoat(index);
        }

        // end river playfield
        else if (diff > 10000 && this._theme == Theme.THEME_RIVER) {
            var tempSprite = new Image();
            tempSprite.src = "images/bg_2_end_540_960.png";
            this._sprites[index] = tempSprite;

            this._lastThemeSprite = index;
            this._theme = Theme.THEME_FORREST;              // next sprite should be forrest
            this._spriteTheme[index] = Theme.THEME_RIVER;   // but current sprite is still river

            // reset timer
            this._time  = Date.now();
        }
    }

    private updatePosition():void
    {
        this._y[0] += this._gameScene._gameSpeed;
        this._y[1] += this._gameScene._gameSpeed;

        this.shuffle();
    }

    private shuffle():void
    {
        for (var i = 0; i < this._sprites.length; i += 1) {
            var bottomOfScreen = canvas.height;
            var spriteTop = this._y[i];

            if (spriteTop > bottomOfScreen) {
                var j = (i) ? 0 : 1;

                // put the image that is off screen on top of the other image.
                this._y[i] = this._y[j] - this._sprites[i].height;

                this.changeScenery(i);
            }
        }
    }

    private draw():void
    {
        ctx.drawImage(this._sprites[0], this._x[0], this._y[0]);
        ctx.drawImage(this._sprites[1], this._x[1], this._y[1]);
    }

    public updateObjects():void
    {
        if (this._playfieldObject != null) {
            var player          = this._gameScene.getPlayer(),
                playerIsMounted = player._isMounted;

            if (playerIsMounted) {
                this._playfieldObject.update(playerIsMounted, this);
            } else {
                this._playfieldObject.update(playerIsMounted);
            }

            if (this._playfieldObject.getPositionY() > canvas.height)
                this._playfieldObject = null;
        }
    }

    public update():void
    {
        if (!this._gameScene._gameOver)
            this.updatePosition();

        this.draw();
    }
}