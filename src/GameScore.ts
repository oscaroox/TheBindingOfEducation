// SCORE
// everything that has to do with gamescore is done here
export default class GameScore
{
    private _points: number;
    private _displayElement: any;
    
    constructor(p: number) 
    {
        this._points = p;
        this._displayElement = document.getElementById('score');

        this.draw();
    }
    
    // update score with some number
    update(p: number = 0):void 
    {
        this._points += p;
        this.draw();
    }

    // draw it on screen
    draw():void 
    {
        this._displayElement.innerHTML = String(this._points);
    }
}