import * as d from './Defines';

export default class Playfield
{
    private _x: number[];                         // x coordinate
    private _y: number[];                         // y coordinate
    private _sprites: HTMLImageElement[];          // path to sprite(sheet) file
    private _stage: CanvasRenderingContext2D;   // canvas target of this page

    constructor()
    {
        
        this._stage = d.ctx;                    // defines canvas set to _stage

        this._sprites = [];                     // create image array

        var tempSprites = new Image();          // create var and set to a image
        tempSprites.src = "images/wlnd.png";
        var tempSprites2 = new Image();         // create var and set to a image
        tempSprites2.src = "images/wlnd.png";

        this._sprites[0] = tempSprites;         // first image is set into the _sprites array
        this._sprites[1] = tempSprites2;        // second image is set into the _sprites array

        this._x = [];                           // create an _x position array
        this._y = [];                           // create an _y position array
        this._x[0] = d.canvas.width / 2 - this._sprites[0].width / 2;        // first position _x is set to the width from canvas divided by 2
        this._y[0] = d.canvas.height / 2;       // first position _y is set to the width from canvas divided by 2
        this._x[1] = this._x[0];                // Second _x position is the same as the first _x position
        this._y[1] = this._y[0] - this._sprites[0].height;      // second _y position is set as the first _y position minus the height from the first image

        
        this.draw();
    }

    updatePosition():void
    {
        this._y[0] += 5;
        this._y[1] += 5;

        this.shuffle();
    }

    shuffle():void
    {

        for (var i = 0; i < this._y.length; i += 1) {                // loop through the length of _sprites (images)

            var bottomOfScreen = d.canvas.height;                   // buttomOfScreen is set to the height of the canvas
            var spriteTop = this._y[i];                             // spriteHeight is set to the height from the images loop

            if (spriteTop > bottomOfScreen) {                       // if the top of the images reached the bottom of the screen then...
                
                if (i == 1) {
                    var j = 0;
                }
                else {
                    var j = 1;
                }

                this._y[i] = this._y[j] - this._sprites[i].height;

            }
        }

    }

    draw():void
    {
        this._stage.drawImage(this._sprites[0], this._x[0], this._y[0]);
        this._stage.drawImage(this._sprites[1], this._x[1], this._y[1]);
    }

    update():void
    {
        this.updatePosition();

        this.draw();

    }
}
