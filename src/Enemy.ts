// ENEMIES
// This class is labeled ABSTRACT which means it can only be extended from, and not be initiated
abstract class Enemy
{
    private _x: number;
    private _y: number;
    private _health: number;
    private _animation: number;
    private _sprite: string;
    private _stage: CanvasRenderingContext2D;

    
    constructor(pos_x: number, pos_y: number, s: string, hp: number, stage: CanvasRenderingContext2D) 
    {
        this._x = pos_x;
        this._y = pos_y;
        this._sprite = s;
        this._health = hp;
        this._animation = 0;
        this._stage = stage;
    }

    
    updateAnimation():void 
    {
    }

    // draw enemies on screen
    draw():void 
    {
    }

    // update sprite's animation / position
    update():void 
    {
    }
}

export default Enemy;