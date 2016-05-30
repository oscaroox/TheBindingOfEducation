import {BACKGROUND_SPEED, canvas, ctx, Theme, Lane_Position} from "./Defines";
import Mount from "./Mount";
import {getRandomInt} from "./Globals";
import WorldMgr from "./WorldMgr";

export default class Playfield
{
    private _x: number[] = [];                          // x coordinates
    private _y: number[] = [];                          // y coordinates
    private _sprites: HTMLImageElement[] = [];          // path to sprite(sheet) files
    private _speed: number;                             // speed the background will travel along the canvas
    private _theme: number;                             // determines what playfield theme sprite to load
    private _time: number;                              // holds time of when we last changed theme
    // private _loaded: number;                         // sprite loading states
    private _playfieldObject: Mount;
    private _lastThemeSprite: number;
    private _worldMgr: WorldMgr;

    constructor()
    {
        // this._loaded = 0;

        var source = "images/bg_540_960.png";
        this.loadSprite(source);
        
        this._speed = BACKGROUND_SPEED;
        this._theme = Theme.THEME_FORREST;
        this._time  = Date.now();

        this._playfieldObject = null;
        this._lastThemeSprite = null;

        this.init();
    }

    // private loadInit():any
    // {
    //     this._loaded += 1;
    //
    //     if (this._loaded == 2)
    //         this.init();
    // }

    public getPlayfieldObject():Mount { return this._playfieldObject; }
    
    public getWorldMgr():WorldMgr { return this._worldMgr; }
    
    public getLastThemeSprite():number { return this._lastThemeSprite; }
    
    public getPosition(index: number):{ x: number, y: number } { return { x: this._x[index], y: this._y[index] }; }

    public addWorldMgr(worldMgr: WorldMgr):void { this._worldMgr = worldMgr; }

    private loadSprite(src):void {
        this._sprites[0] = new Image();
        this._sprites[1] = new Image();

        // this._sprites[0].onload = this.loadInit();
        // this._sprites[1].onload = this.loadInit();

        this._sprites[0].src = src;
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
    
    public getSprite():HTMLImageElement { return this._sprites[0]; }

    private changeScenery(index:number):void
    {
        var diff = Date.now() - this._time;

        // forrest playfield (start, mid and end)
        if (this._theme == Theme.THEME_FORREST) {
            var tempSprites = new Image();
            tempSprites.src = "images/bg_540_960.png";

            this._sprites[index] = tempSprites;
        }

        // mid river playfield
        if (this._theme == Theme.THEME_RIVER) {
            var tempSprites = new Image();
            tempSprites.src = "images/bg_2_mid_540_960.png";

            this._sprites[index] = tempSprites;
        }

        // start river playfield
        if (diff > 10000 && this._theme == Theme.THEME_FORREST) {
            var tempSprites = new Image();
            tempSprites.src = "images/bg_2_start_540_960.png";

            this._sprites[index] = tempSprites;
            this._theme = Theme.THEME_RIVER;
            this._time  = Date.now();

            // add boat to start of river
            var randLane = getRandomInt(0, 2),
                otherbg  = (index) ? 0 : 1;

            var sprite = "images/boat.png",
                x      = Lane_Position[randLane],
                y      = this._y[otherbg] - 90;

            this._lastThemeSprite = null;
            this._playfieldObject = new Mount(sprite, x, y, randLane);
        }

        // end river playfield
        else if (diff > 10000 && this._theme == Theme.THEME_RIVER) {
            var tempSprites = new Image();
            tempSprites.src = "images/bg_2_end_540_960.png";
            this._sprites[index] = tempSprites;

            this._lastThemeSprite = index;
            this._theme = Theme.THEME_FORREST;
            this._time  = Date.now();
        }
    }

    private updatePosition():void
    {
        this._y[0] += BACKGROUND_SPEED;
        this._y[1] += BACKGROUND_SPEED;

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

    private updateObjects():void
    {
        if (this._playfieldObject != null) {
            var player          = this._worldMgr.getPlayer(),
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
        this.updatePosition();
        this.draw();
        this.updateObjects();
    }
}
