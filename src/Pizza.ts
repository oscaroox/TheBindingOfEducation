import Enemy from './Enemy';

export default class Pizza extends Enemy
{
    constructor(x, y, stage) 
    {
        super(x, y, "pizza.png", 75, stage);
    }
}