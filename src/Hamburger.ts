import Enemy from './Enemy';

export default class Hamburger extends Enemy
{
    constructor (x: number, y: number) 

    {
        // static starting values
        var sprite = "images/hamburger.gif",
            health = 1;
        
        super(x, y, health, sprite);
    }
}
