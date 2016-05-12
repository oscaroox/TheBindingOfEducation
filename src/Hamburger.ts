import Enemy from './Enemy';

export default class Hamburger extends Enemy
{
    constructor(x, y, stage) 
    {
        super(x, y, "hamburger.png", 100, stage);
    }
}