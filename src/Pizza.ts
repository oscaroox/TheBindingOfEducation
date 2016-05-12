import Enemy from './Enemy';

export default class Pizza extends Enemy
{
    constructor(x, y, stage) 
    {
        // static starting values
        var sprite = "pizza.png";

        super(x, y, sprite, stage);
    }
}