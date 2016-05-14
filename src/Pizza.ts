import Enemy from './Enemy';

export default class Pizza extends Enemy
{
    constructor(x, y, stage)
    {
        // static starting values
        var sprite = "pizza.png",
            color  = "rgba(0,255,0,1)",
            width  = 75,
            height = 75;

        super(x, y, sprite, width, height, color, stage);
    }

    spawn():void
    {
        super.spawn();
    }
}