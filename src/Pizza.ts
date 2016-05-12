import Enemy from './Enemy';

export default class Pizza extends Enemy
{
    constructor(x, y, stage) 
    {
        // static starting values
        var hp     = 75,
            sprite = "pizza.png";

        super(x, y, sprite, hp, stage);
    }
}