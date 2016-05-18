import Enemy from './Enemy';

export default class Pizza extends Enemy
{
    constructor(x: number, y: number)
    {
        // static starting values
        var sprite = "images/pizza.gif",
            health = 1;

        super(x, y, health, sprite);
    }
}
