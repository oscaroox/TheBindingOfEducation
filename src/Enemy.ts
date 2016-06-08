import {DEBUG_SHOW_ENEMY_HITBOX, Lane} from "./Defines";
import Unit from './Unit';

export default class Enemy extends Unit
{
    constructor(x: number, y: number, health: number, sprite: string, lane: Lane)
    {
        super(x, y, health, sprite, lane);
        this.setInitPosition();
    }
    
    protected setInitPosition():void
    {
        var x = this.getPositionX() - this.getSprite().width / 2,
            y = 0 - this.getSprite().height * 1.25;                  // 25% more in case lilypads are spawning with us 
        
        this.setPosition(x, y);
    }

    public update(isGameOver: boolean, gameSpeed: number):void
    {
        if (!isGameOver)
            this.updatePosition(gameSpeed);
        
        super.update();

        if (DEBUG_SHOW_ENEMY_HITBOX)
            this.drawHitbox();
    }
}