import {ctx} from "./Defines";
export default class FloatingScore
{
    private _x: number;
    private _y: number;
    private _points: number;
    private _size: number;

    constructor(x: number, y: number, points: number)
    {
        this._x = x;
        this._y = y;
        this._points = points;
        this._size = 10;
    }
    
    public getPosition() { return { x: this._x, y: this._y } }

    private updatePosition():void
    {
        this._y += 5;
    }

    private animate():void
    {
        this._size += 0.5;
    }

    private draw():void
    {
        var str = "+" + this._points;

        ctx.beginPath();
        ctx.font = this._size + "px Arial";                // test
        ctx.fillStyle = "white";
        ctx.fillText(str, this._x, this._y);
        ctx.closePath();
    }

    public update():void
    {
        this.animate();
        this.updatePosition();
        this.draw();
    }
}