import * as d from './Defines';
import Object from './Object';

export default class Playfield extends Object
{
    constructor(x: number, y: number)
    {
        var sprite = [];
        sprite[0] = "images/wlnd.jpg";
        sprite[1] = "images/wlnd.jpg";
        
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
        var spritesArray = this.getSpritesArray();

        for (var i = 0; i < spritesArray.length; i += 1) {
            var spriteHeight = spritesArray[i].height;

            if (spriteHeight < bottomOfScreen) {
                // console.log('SpriteHeight < bottomOfScreen');
            }
        }
    }

    update():void
    {
        super.update();

        this.updatePosition();
    }
}
