import Enemy from './Enemy';

export default class Hamburger extends Enemy
{
    constructor(x, y, stage) 
    {
        // static starting values
        var sprite = "hamburger.png",
            color  = "rgba(255,0,0,1)",
            width  = 90,
            height = 90;

        super(x, y, sprite, width, height, color, stage);
    }
    
    spawn():void
    {
        super.spawn();
    }
}