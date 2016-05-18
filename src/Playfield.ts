import * as d from './Defines';

export default class Playfield
{
    private _x: number[];                         // x coordinate
    private _y: number[];                         // y coordinate
    private _sprites: HTMLImageElement[];          // path to sprite(sheet) file
    private _stage: CanvasRenderingContext2D;   // canvas target of this page

    constructor()
    {


        this._stage = d.ctx;

        this._sprites = [];

        var tempSprites = new Image();
        tempSprites.src = "images/wlnd.jpg";
        var tempSprites2 = new Image();
        tempSprites2.src = "images/wlnd.jpg";

        this._sprites[0] = tempSprites;
        this._sprites[1] = tempSprites2;

        this._x = [];
        this._y = [];
        this._x[0] = d.canvas.width / 2;
        this._y[0] = d.canvas.height / 2;
        this._x[1] = this._x[0];
        this._y[1] = this._y[0] - this._sprites[0].height;

        // this._x[0] = 0;
        // this._y[0] = 0;
        // this._x[1] = this._x[0];
        // this._y[1] = this._y[0] - this._sprites[0].height;

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

        for (var i = 0; i < this._sprites.length; i += 1) {

            var bottomOfScreen = d.canvas.height;
            var spriteHeight = this._sprites[i].height;

            if (spriteHeight < bottomOfScreen) {

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
