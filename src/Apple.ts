import Fruit from './Fruit';

export default class Apple extends Fruit
{
    constructor(id: number, x: number)
    {
        // static starting values
        var sprite = "images/apple.png",
            points = 8,
            y = 0 - 1000;

        super(id, x, y, sprite, points);
        
        this.setInitPosition();
    }
}
