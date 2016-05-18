import Enemy from './Enemy';

export default class Hamburger extends Enemy
{
<<<<<<< Updated upstream
    constructor(x: number, y: number)
=======


    constructor (x: number, y: number) 

>>>>>>> Stashed changes
    {
        // static starting values
        var sprite = "hamburger.png",
            color  = "rgba(255,0,0,1)",
            health = 1,
            width  = 90,
            height = 90;
        super(x, y, health, sprite, width, height, color);
    }
}
