import Object from './Object'
import {DEBUG_SHOW_FRUIT_HITBOX, BACKGROUND_SPEED} from "./Defines";
import Player from "./Player";

export default class Fruit extends Object
{
    private _id: number;         // unique number for this object
    private _points: number;     // points per fruit
    public  _speed: number;      // speed this object travels on Y-axis
    private _modOffSetY: number; // percentage of offset in Y position to create overlapping/depth effect
    
    constructor(id: number, x: number, sprite: string, points: number, speed: number, lane: number, offsetY: number = 0)
    {
        var y = 0 - 1000;
        super(x, y, sprite, lane);
        this._id         = id;
        this._points     = points;
        this._speed      = speed;
        this._modOffSetY = 0.4;
        
        this.setInitPosition(offsetY);
    }
    
    public getId():number { return this._id; }
    
    public getPoints():number { return this._points; }

    protected setInitPosition(offSet: number):void
    {
        var offSetY = this._id * (this.getSprite().height * this._modOffSetY),
            y       = offSet - (this._id * this.getSprite().height) - (this.getSprite().height * 1.25) + offSetY,
            x       = this.getPositionX() - this.getSprite().width / 2;

        this.setPosition(x, y);
    }
    
    // magnet effect
    public moveToPlayer(player: Player):void
    {
        var x  = this.getPositionX(),
            y  = this.getPositionY();
        
        var px = (player.getHitbox().x1 + player.getHitbox().x2) / 2,
            py = (player.getHitbox().y1 + player.getHitbox().y2) / 2;
        
        var newx = x,
            newy = y;

        var speed = BACKGROUND_SPEED * 2.5;

        if (x <= px) newx = x += speed;
        if (x >= px) newx = x -= speed;
        if (y >= py) newy = y -= speed;
        if (y <= py) newy = y += speed;
        
        this.setPosition(newx, newy);
    }

    public update():void
    {
        this.updatePosition(BACKGROUND_SPEED);
        if (DEBUG_SHOW_FRUIT_HITBOX) this.drawHitbox();
        super.update();
    }
}

// export default Fruit;