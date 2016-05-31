import {BACKGROUND_SPEED, DEBUG_SHOW_ENEMY_HITBOX} from "./Defines";
import Unit from './Unit';

abstract class Enemy extends Unit
{
    protected _speed: number;   // the speed this enemy will travel across the screen
    
    constructor(x: number, y: number, health: number, sprite: string, lane: number)
    {
        super(x, y, health, sprite, lane);
        this._speed = BACKGROUND_SPEED;
    }
    
    protected setInitPosition():void
    {
        var x = this.getPositionX() - this.getSprite().width / 2,
            y = 0 - this.getSprite().height * 1.25;                  // 25% more in case lilypads are spawning with us 
        
        this.setPosition(x, y);
    }

    public update():void
    {
        this.updatePosition(BACKGROUND_SPEED);
        if (DEBUG_SHOW_ENEMY_HITBOX) this.drawHitbox();
        super.update();
    }
}

export default Enemy;
