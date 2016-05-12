"use strict";
// ENEMIES
// This class is labeled ABSTRACT which means it can only be extended from, and not be initiated
var Enemy = (function () {
    function Enemy(pos_x, pos_y, s, hp, stage) {
        this._x = pos_x;
        this._y = pos_y;
        this._sprite = s;
        this._health = hp;
        this._animation = 0;
        this._stage = stage;
    }
    Enemy.prototype.updateAnimation = function () {
    };
    // draw enemies on screen
    Enemy.prototype.draw = function () {
    };
    // update sprite's animation / position
    Enemy.prototype.update = function () {
    };
    return Enemy;
}());
exports.__esModule = true;
exports["default"] = Enemy;
//# sourceMappingURL=Enemy.js.map