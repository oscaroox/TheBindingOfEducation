import {ctx, Lane, DEBUG_COLOR, DEBUG_STROKE_WIDTH} from './Defines';

export default class __Object
{
    private _x: number;                 // x coordinate
    private _y: number;                 // y coordinate
    private _sprite: HTMLImageElement;  // path to sprite(sheet) file
    protected _curLane: number;         // lane identifier

    constructor(x: number, y: number, sprite: string, laneID: number)
    {
        // wait for sprite image to load before we do anything else
        this.loadSprite(sprite);
        this._x = x;
        this._y = y;
        this._curLane = laneID;
    }
    
    public setCurLane(lane: Lane):void { this._curLane = lane; }
    public getCurLane():Lane { return this._curLane; }
    
    // return x and y coordinates
    public getPosition():{x:number, y:number} { return { x: this._x, y: this._y }; }

    // return only the x coordinate
    public getPositionX():number { return this._x; }

    // return only the y coordinate
    public getPositionY():number { return this._y; }

    // set position of unit
    public setPosition(x: number, y: number):void
    {
        this._x = Math.floor(x);
        this._y = Math.floor(y);
    }

    public getSprite():HTMLImageElement { return this._sprite; }

    public getHitbox():{x1: number, y1: number, x2: number, y2: number}
    {
        return {
            x1: this._x,
            y1: this._y,
            x2: this._x + this._sprite.width,
            y2: this._y + this._sprite.height
        }
    }

    private loadSprite(src):void {
        this._sprite = new Image();
        // this._sprite.onload = function() {
        //     console.log('loaded sprite ' + src);
        // };
        this._sprite.src = src;
    }
    
    public updatePosition(speed: number):void
    {
        var x = this._x,
            y = this._y + speed;
        this.setPosition(x, y);
    }
    
    // when unit first enters the scene
    protected spawn():void
    {
        this.draw();
    }

    protected drawMotionBlur():void
    {
        for (var i = 0; i < 10; ++i) {
            ctx.drawImage(this._sprite, this._x, this._y, i);
        }
    }

    protected drawHitbox():void
    {
        var hitbox = this.getHitbox(),
            width  = this.getHitbox().x2 - this.getHitbox().x1,
            height = this.getHitbox().y2 - this.getHitbox().y1;

        ctx.beginPath();
        ctx.strokeStyle = DEBUG_COLOR;
        ctx.lineWidth   = DEBUG_STROKE_WIDTH;
        ctx.strokeRect(hitbox.x1, hitbox.y1, width, height);
        ctx.closePath();
    }

    // draw enemy on screen
    protected draw():void
    {
        ctx.drawImage(this._sprite, this._x, this._y);
    }

    // update position, animation, etc.
    public update(arg1?: any, arg2?: any):void
    {
        this.draw();
    }
}