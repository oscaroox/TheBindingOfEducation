import * as g from './Global';

// SCORE
// everything that has to do with gamescore is done here
export default class GameScore
{
    _points: number;
    
    constructor(p: number) {
        this._points = p;
        this.draw();
    }
    
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