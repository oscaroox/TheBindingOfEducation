import Fruit from './Fruit';

export default class Banana extends Fruit
{
    constructor(id: number, x: number)
    {
        // static starting values
        var sprite = "images/banana.png",
            points = 5,
            y = 0 - 1000;

        super(id, x, y, sprite, points);

        this.setInitPosition();
    }
}
