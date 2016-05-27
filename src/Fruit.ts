import Object from './Object'
import {BACKGROUND_SPEED} from "./Defines";

abstract class Fruit extends Object
{
    private _id: number;         // unique number for this object
    private _points: number;     // points fruit
    private _modOffSetY: number; // percentage of offset in Y position to create overlapping/depth effect
    private _speed: number;
    
    constructor(id: number, x: number, y: number, sprite: string, points: number)
    {
        super(x, y, sprite);
        this._id         = id;
        this._points     = points;
        this._speed = BACKGROUND_SPEED;
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
