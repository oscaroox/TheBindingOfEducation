import * as d from './Defines';

abstract class __Object
{
    private _x: number;                         // x coordinate
    private _y: number;                         // y coordinate
    private _sprite: string;                    // path to sprite(sheet) file
    private _color: string;                     // fill color
    private _width: number;                     // width of sprite
    private _height: number;                    // height if sprite
    private _stage: CanvasRenderingContext2D;   // canvas target of this page

    constructor(x: number, y: number, sprite: string, width: number, height: number, color: string)
    {
        this._x = y;
        this._y = x;
        this._sprite = sprite;
        this._color  = color;
        this._width  = width;
        this._height = height;
        this._stage  = d.ctx;

        this.spawn();
    }

    // __EXAMPLE METHODS__
    // IF YOU DON'T USE THEM JUST DELETE THEM

    // GETTERS and SETTERS
    // When working in classes, try to always use PRIVATE class variables
    // You can not change or access these variables without making these 'get' and 'set' functions
    // It makes things safer because you can control their read/write properties
    // and it is good practice for future projects
    // Always specify what the return type is (if you know)! (:number, :string, :Array<number>, :Array<string>, etc)

    // return x and y coordinates
    getPosition() { return { x: this._x, y: this._y }; }

    // return only the x coordinate
    getPositionX():number { return this._x; }

    // return only the y coordinate
    getPositionY():number { return this._y; }

    // set position of unit
    setPosition(x:number, y:number)
    {
        this._x = x;
        this._y = y;
    }
    
    
    // when unit first enters the scene
    spawn():void
    {
        this.draw();
    }

    // when unit leaves the scene for whatever reason
    despawn():void
    {
    }

    // when unit dies
    onDeath():void
    {
    }

    // draw enemy on screen
    draw():void
    {
        var ctx = this._stage;

        ctx.beginPath();
        ctx.rect(this._x, this._y, this._width, this._height);
        ctx.fillStyle = this._color;
        ctx.fill();
        ctx.closePath();
    }

    // update position, animation, etc.
    update():void
    {
        this.draw();
    }
}

export default __Object;