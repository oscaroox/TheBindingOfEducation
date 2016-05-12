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
    Player.prototype.setAnimationState = function (input) {
        // not moving
        if (input == d.Input_State.None) {
            this._animation = d.Animation_State.Idle;
        }
        // move
        if (input == d.Input_State.Touch || input == d.Input_State.Click) {
            this._animation = d.Animation_State.Run;
        }
    };
    Player.prototype.updateAnimation = function () {
        if (this._animation == d.Animation_State.Run) {
        }
        if (this._animation == d.Animation_State.Jump) {
        }
    };
    Player.prototype.updatePosition = function () {
        // update our _x and _y according to some button presses and super complicated formulas like
        // _x += 5
        // EXAMPLE
        // if user is touching screen we increase _x by 5
        if (this._animation == d.Animation_State.Run) {
            this._x += 5;
        }
    };
    Player.prototype.jump = function () {
        this._animation = d.Animation_State.Jump; // change back to run or idle state after jump animation
        // do some jump timing and positioning stuff
    };
    Player.prototype.draw = function () {
        // temporarily renaming it because lazy
        var ctx = this._stage;
        // the process of drawing something in canvas
        ctx.beginPath();
        ctx.rect(this._x, this._y, 100, 100); // x, y, width, height
        ctx.fillStyle = "rgba(255,244,84,1)"; // color
        ctx.fill();
        ctx.closePath();
    };
    Player.prototype.update = function (input) {
        this.setAnimationState(input);
        this.updateAnimation();
        this.updatePosition();
        // after updating everything we redraw player sprite on screen with our new data
        this.draw();
    };
    return Player;
}());
exports.__esModule = true;
exports["default"] = Player;
//# sourceMappingURL=Player.js.map