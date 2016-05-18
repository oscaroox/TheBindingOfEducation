import * as d from './Defines';

export default class Playfield {

    private _x: number;                         // x coordinate
    private _y: number;                         // y coordinate
    private _stage: CanvasRenderingContext2D;   // canvas target of this page
    private _background: string;

    constructor(x: number, y: number, background: string)
    {
        this._x = x;
        this._y = y;
        this._stage  = d.ctx;
        this._background = background;
    }


    init(): void
    {
        var img:HTMLImageElement = document.getElementById('wlnd');

        this._stage.drawImage(img, 10, 10);
    }

}
