import {Cooking_Oil_State, canvas, Lane} from "./Defines";
import Object from './Object'

export default class CookingOil extends Object
{
    private _state: number;         // we can have a LOW and HIGH state
    private _speed: number;         // speed on Y-axis
    private _upTime: number;        // time it started going up
    private _maxTime: number;       // maximum time it can stay up

    constructor()
    {
        var x = canvas.width / 2,
            y = canvas.height,
            sprite = "images/cookingoil.png",
            curLane = Lane.LANE_MIDDLE;
        super(x, y, sprite, curLane);

        this._state = Cooking_Oil_State.STATE_LOW;  
        this._speed = 1;                            
        this._upTime  = Date.now();                 
        this._maxTime = 10000;                      // it stays 'up' 10 seconds

        this.init();
    }

    public setState(state: Cooking_Oil_State):void 
    {
        if (state == Cooking_Oil_State.STATE_HIGH) 
            this._upTime = Date.now();
        
        this._state = state;
    }
    
    public getState():Cooking_Oil_State { return this._state; }

    private init():void
    {
        var x = this.getPositionX() - this.getSprite().width / 2,
            y = this.getPositionY() - this.getSprite().height / 2;

        this.setPosition(x, y);
    }

    private move():void
    {
        var curTime = Date.now(),
            diff    = curTime - this._upTime;
        
        if (Cooking_Oil_State.STATE_HIGH && diff > this._maxTime) 
            this._state = Cooking_Oil_State.STATE_LOW;
        
        if (this._state == Cooking_Oil_State.STATE_HIGH) {
            this.moveUp();
        } else {
            this.moveDown();
        }
    }

    private moveUp():void
    {
        var endY = canvas.height - this.getSprite().height + 5;

        if (this.getPositionY() > endY) {
            var x = this.getPositionX(),
                y = this.getPositionY() - this._speed;

            this.setPosition(x, y);
        }
    }

    private moveDown():void
    {
        var endY = canvas.height - this.getSprite().height / 2;

        if (this.getPositionY() < endY) {
            var x = this.getPositionX(),
                y = this.getPositionY() + this._speed;

            this.setPosition(x, y);
        }
    }

    public update():void
    {
        super.update();
        this.move();
    }
}