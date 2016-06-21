import Unit from './Unit';
import {BACKGROUND_SPEED} from "./Defines";

abstract class Enemy extends Unit
{
    protected _speed: number;

    constructor(x: number, y: number, health: number, sprite: string)
    {
        super(x, y, health, sprite);

        this._speed = BACKGROUND_SPEED;
    }

    setInitPosition():void
    {
        var y = 0 - this.getSprite().height,
            x = this.getPositionX() - this.getSprite().width / 2;

        this.setPosition(x, y);
    }

    update():void
    {
        this.updatePosition(this._speed);
        super.update();
    }
}

export default Enemy;
