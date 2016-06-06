import Enemy from './Enemy';

export default class Hamburger extends Enemy
{
    constructor (x: number, lane: number)
    {
        // static starting values
        var sprite = "images/hamburger.png",
            health = 1,
            y      = 0 - 1000;
        super(x, y, health, sprite, lane);
        
        this.setInitPosition();
    }
}