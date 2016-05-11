"use strict";
var g = require('./Global');
// SCORE
// everything that has to do with gamescore is done here
var GameScore = (function () {
    /// CONSTRUCTOR (called when creating new class)
    function GameScore(p) {
        this._points = p;
        this.draw();
    }
    /// METHODS (class functions)
    // update score with some number
    GameScore.prototype.update = function (p) {
        if (p === void 0) { p = 0; }
        this._points += p;
        this.draw();
    };
    // draw it on screen
    GameScore.prototype.draw = function () {
        g.el.innerHTML = String(this._points);
    };
    return GameScore;
}());
exports.__esModule = true;
exports["default"] = GameScore;
//# sourceMappingURL=GameScore.js.map