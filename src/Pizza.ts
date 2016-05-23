import Enemy from './Enemy';
import {BACKGROUND_SPEED} from "./Defines";

export default class Pizza extends Enemy
{
    constructor(x: number)
    {
        // static starting values
        var sprite = "images/pizza.png",
            health = 1,
            y = 0 - 1000;
        super(x, y, health, sprite);
        
        this._speed = BACKGROUND_SPEED;
        this.setInitPosition();
    }
}
