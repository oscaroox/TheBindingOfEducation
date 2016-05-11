import * as g from './Global';

// SCORE
// everything that has to do with gamescore is done here
export default class GameScore
{
    /// FIELDS (class variables)
    _points: number;


    /// CONSTRUCTOR (called when creating new class)
    constructor(p: number) {
        this._points = p;
        this.draw();
    }


    /// METHODS (class functions)
    // update score with some number
    update(p: number = 0) {
        this._points += p;
        this.draw();
    }

    // draw it on screen
    draw() {
        g.el.innerHTML = String(this._points);
    }
}