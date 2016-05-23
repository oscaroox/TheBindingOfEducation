import Object from './Object'

abstract class Fruit extends Object
{
    private _id: number;         // unique number for this object
    private _points: number;     // points fruit
    private _speed: number;      // speed this object travels
    private _modOffSetY: number; // percentage of offset in Y position to create overlapping/depth effect
    
    constructor(id: number, x: number, y: number, sprite: string, points: number)
    {
        super(x, y, sprite);
        this._id         = id;
        this._points     = points;
        this._speed      = 5;
        this._modOffSetY = 0.4;
    }

    setInitPosition():void
    {
        var offSetY = this._id * (this.getSprite().height * this._modOffSetY),
            y       = -(this._id * this.getSprite().height) - this.getSprite().height + offSetY,
            x       = this.getPositionX() - this.getSprite().width / 2;

        this.setPosition(x, y);
    }

    update():void
    {
        this.updatePosition(this._speed);
        super.update();
    }
}

export default Fruit;
