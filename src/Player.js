"use strict";
var g = require('./Global');
// PLAYER
// all updates and movement is done in this class
var Player = (function () {
    function Player(pos_x, pos_y) {
        this._x = pos_x;
        this._y = pos_y;
        this._sprite = "player.png";
        this._health = 100;
        this._animation = g.Animation_State.Idle;
    }
    Player.prototype.jump = function () {
        this._animation = g.Animation_State.Jump; // change back to run state after jump animation
        // do some jump timing and positioning stuff
    };
    Player.prototype.updateAnimation = function () {
        if (this._animation == g.Animation_State.Run) {
        }
        if (this._animation == g.Animation_State.Jump) {
        }
    };
    Player.prototype.updatePosition = function () {
        // update our _x and _y according to some button presses and super complicated formulas like
        // _x += 5
        // EXAMPLE
        // if user is touching screen we increase _x by 5
        if (g.Input_State.Touch || g.Input_State.Click) {
            this._x += 5;
        }
    };
    Player.prototype.draw = function () {
    };
    Player.prototype.update = function () {
        this.updateAnimation();
        this.updatePosition();
        // after updating everything we draw player sprite on screen with our new data
        this.draw();
    };
    return Player;
}());
exports.__esModule = true;
exports["default"] = Player;
//# sourceMappingURL=Player.js.map