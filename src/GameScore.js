"use strict";
// SCORE
// everything that has to do with gamescore is done here
var GameScore = (function () {
    function GameScore(p) {
        this._points = p;
        this._displayElement = document.getElementById('score');
        this.draw();
    }
    // update score with some number
    GameScore.prototype.update = function (p) {
        if (p === void 0) { p = 0; }
        this._points += p;
        this.draw();
    };
    // draw it on screen
    GameScore.prototype.draw = function () {
        this._displayElement.innerHTML = String(this._points);
    };
    return GameScore;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GameScore;
//# sourceMappingURL=GameScore.js.map