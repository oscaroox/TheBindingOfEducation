import Enemy from './Enemy';

export default class Pizza extends Enemy
{
    constructor(x: number, y: number)
    {
        // static starting values
        var sprite = "pizza.png",
            color  = "rgba(0,255,0,1)",
            health = 1,
            width  = 75,
            height = 75;
        super(x, y, health, sprite, width, height, color);
    }
}