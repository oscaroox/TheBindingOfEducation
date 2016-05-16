import Fruit from './Fruit';

export default class Banana extends Fruit
{
    constructor(x: number, y: number)
    {
        // static starting values
        var sprite = "banana.png",
            points = 5;

        super(x, y, sprite, points);
    }
}
