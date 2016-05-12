import Enemy from './Enemy';

export default class Hamburger extends Enemy
{
    constructor(x, y, stage) 
    {
        // static starting values
        var sprite = "hamburger.png";

        super(x, y, sprite, stage);
    }

    // __EXAMPLE__
    // spawn is already a method of our parent class 'Enemy'
    // but if needed, we can override it by just calling it the same (phpstorm will show an icon to the left when you
    // override methods
    spawn():void
    {
        // this means to execute everything from our parent's class version of 'spawn'
        // if you want to do this, do it FIRST!
        // if not, just leave it out
        super.spawn();

        // here you can add things that need to happen for this specific class
        // like positioning it or something
        this.setPosition(10, 10);
    }
}