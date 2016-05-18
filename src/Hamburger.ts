import Enemy from './Enemy';

export default class Hamburger extends Enemy
{
    constructor (x: number, y: number)
    {
        // static starting values
        var sprite = [];
        sprite[0] = "images/hamburger.gif";
        var health = 1;
        
        super(x, y, health, sprite);
    }
}
