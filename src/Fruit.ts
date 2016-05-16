abstract class Fruit 
{
    private _x: number;                         // x coordinate
    private _y: number;                         // y coordinate
    private _sprite: string;                    // path to sprite(sheet) file
    private _stage: CanvasRenderingContext2D;   // canvas target of this page
    private _points: number;                    // points fruit
    
    constructor(x: number, y:number, sprite: string, stage: CanvasRenderingContext2D, points: number)
    {
        this._x = x;
        this._y = y;
        this._sprite = sprite;
        this._stage = stage;
        this._points = points;
        
    }
}

export default Fruit;
