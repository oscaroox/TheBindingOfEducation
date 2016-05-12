"use strict";
var d = require('./Defines');
// PLAYER
// all updates and movement is done in this class
var Player = (function () {
    function Player(pos_x, pos_y, stage) {
        this._x = pos_x;
        this._y = pos_y;
        this._sprite = "player.png";
        this._health = 100;
        this._animation = d.Animation_State.Idle;
        this._stage = stage;
        this.draw();
    }
    Player.prototype.jump = function () {
        this._animation = d.Animation_State.Jump; // change back to run state after jump animation
        // do some jump timing and positioning stuff
    };
    Player.prototype.updateAnimation = function () {
        if (this._animation == d.Animation_State.Run) {
        }
        if (this._animation == d.Animation_State.Jump) {
        }
    };
    Player.prototype.updatePosition = function (input) {
        // update our _x and _y according to some button presses and super complicated formulas like
        // _x += 5
        // EXAMPLE
        // if user is touching screen we increase _x by 5
        if (input == d.Input_State.Touch || input == d.Input_State.Click) {
            this._x += 5;
        }
    };
    Player.prototype.draw = function () {
        var ctx = this._stage;
        ctx.beginPath();
        ctx.rect(this._x, this._y, 100, 100);
        ctx.fillStyle = "rgba(255,244,84,1)";
        ctx.fill();
        ctx.closePath();
    };
    Player.prototype.update = function (input) {
        this.updateAnimation();
        this.updatePosition(input);
        // after updating everything we draw player sprite on screen with our new data
        this.draw();
    };
    return Player;
}());
exports.__esModule = true;
exports["default"] = Player;
//# sourceMappingURL=Player.js.map