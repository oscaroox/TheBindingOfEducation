// 'abstract' means you can not instantiate this class
// this is because 'Enemy' is meant to be a parent class only
// think about it like the word 'Animal'
// there are multiple types of animals like dogs and cats, but there is no 'Animal'
// so to prevent errors, bugs and headaches, we define this class as 'abstract'
abstract class Enemy
{
    private _x: number;                         // x coordinate
    private _y: number;                         // y coordinate
    private _sprite: string;                    // path to sprite(sheet) file
    private _stage: CanvasRenderingContext2D;   // canvas target of this page

    
    constructor(pos_x: number, pos_y: number, s: string, stage: CanvasRenderingContext2D) 
    {
        this._x = pos_x;
        this._y = pos_y;
        this._sprite = s;
        this._stage = stage;

        this.spawn();
    }

    // __EXAMPLE METHODS__
    // IF YOU DON'T USE THEM JUST DELETE THEM

    // when enemy first enters the scene
    spawn():void
    {
    }

    // when enemy leaves the scene for whatever reason
    despawn():void
    {
    }

    // GETTERS and SETTERS
    // When working in classes, try to always use PRIVATE class variables
    // You can not change or access these variables without making these 'get' and 'set' functions
    // It makes things safer and is good practice for future projects
    // Always specify what the return type is (if you know)! (:number, :string, :Array<number>, :Array<string>, etc)
    
    // return x and y coordinates
    getPosition() { return { x: this._x, y: this._y }; }

    // return only the x coordinate
    getPositionX():number { return this._x; }

    // return only the y coordinate
    getPositionY():number { return this._y; }

    // set position of enemy
    setPosition(x:number, y:number)
    {
        this._x = x;
        this._y = y;
    }

    // loop through animations
    updateAnimation():void 
    {
    }

    // draw enemy on screen
    draw():void 
    {
    }

    // update position, animation, etc.
    update():void 
    {
    }
}

export default Enemy;