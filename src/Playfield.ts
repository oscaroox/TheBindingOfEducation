import * as d from './Defines';
import Object from './Object';

export default class Playfield extends Object
{
    constructor(x: number, y: number)
    {
        var sprite = "images/wlnd.jpg";
        super(x, y, sprite);
        super.draw();
    }

    updatePosition():void
    {
            var x = this.getPositionX(),
                y = this.getPositionY() +5;
            this.setPosition(x, y);

        this.shuffle();
    }

    shuffle():void
    {
        var bottomOfScreen = d.canvas.height;
        var spriteHeight = this.getSprite().height;
        
        if (spriteHeight < bottomOfScreen) {
            
        }
    }

    update():void
    {
        super.update();

        this.updatePosition();
    }
}
