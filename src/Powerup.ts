import Object from './Object'
import {Lane, Lane_Position, BACKGROUND_SPEED, DEBUG_SHOW_POWERUP_HITBOX, Powerup_Flags} from "./Defines";

export default class Powerup extends Object
{
    private _speed: number;         // speed the sprite travels along the Y-axis
    protected _duration: number;    // how long the powerup should last on the player
    protected _startTime: number;   // defines when it was picked up
    private _flag: Powerup_Flags;   // defines what type of powerup we are
    
    constructor(sprite: string, duration: number, laneID: Lane, flag: Powerup_Flags)
    {
        var x = Lane_Position[laneID],
            y = 0 - 1000;
        super(x, y, sprite, laneID);
        
        this._flag = flag;

        this._speed = BACKGROUND_SPEED;
        this._duration = duration;
        
        this.setInitPosition();
    }
    
    public getData():{ duration: number, startTime: number, flag: Powerup_Flags } 
    { 
        return { duration: this._duration, startTime: this._startTime, flag: this._flag }
    }

    public setStartTime():void { this._startTime = Date.now(); }
    
    public getFlag():Powerup_Flags { return this._flag; }

    protected setInitPosition():void
    {
        var y = 0 - this.getSprite().height,
            x = this.getPositionX() - this.getSprite().width / 2;

        this.setPosition(x, y);
    }
    
    public update(isGameOver: boolean):void
    {
        if (!isGameOver)
            this.updatePosition(BACKGROUND_SPEED);

        if (DEBUG_SHOW_POWERUP_HITBOX)
            this.drawHitbox();
        
        super.update();
    }
}

// export default Powerup;