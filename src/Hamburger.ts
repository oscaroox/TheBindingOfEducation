import Enemy from './Enemy';

export default class Hamburger extends Enemy
{
    constructor(x, y, stage) 
    {
        // static starting values
        var hp     = 100,
            sprite = "hamburger.png";

        super(x, y, sprite, hp, stage);
    }
}