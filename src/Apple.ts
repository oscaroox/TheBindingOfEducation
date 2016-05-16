import Fruit from './Fruit';

export default class Apple extends Fruit
{
    constructor(x: number, y: number, stage: CanvasRenderingContext2D)
    {
        // static starting values
        var sprite = "apple.png",
            points = 8;

        super(x, y, sprite, stage, points);
    }
}
