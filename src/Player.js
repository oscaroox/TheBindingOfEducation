"use strict";
var d = require('./Defines');
// PLAYER
// all updates and movement is done in this class
var Player = (function () {
    function Player(pos_x, pos_y, stage) {
        this._x = pos_x;
        this._y = pos_y;
        this._sprite = "player.png";
        this._health = 2;
        this._color = "rgba(255,244,84,1)";
        this._width = 100;
        this._height = 100;
        this._animation = d.Animation_State.Idle;
        this._stage = stage;
        this.spawn();
    }
    // __EXAMPLE METHODS__
    // IF YOU DON'T USE THEM JUST DELETE THEM
    // when enemy first enters the scene
    Player.prototype.spawn = function () {
        this.draw();
    };
    // when enemy leaves the scene for whatever reason
    Player.prototype.despawn = function () {
    };
    // when our hero dies
    Player.prototype.onDeath = function () {
    };
    // set animation state which will be used to determine the current or next animation cycle
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
    // loop through animations (spritesheets)
    Player.prototype.updateAnimation = function () {
        // EXAMPLES
        if (this._animation == d.Animation_State.Run) {
        }
        if (this._animation == d.Animation_State.Jump) {
        }
    };
    // update our hero's position to some x and y coordinate on the scene
    Player.prototype.updatePosition = function () {
        // update our _x and _y according to some button presses and super complicated formulas like
        // _x += 5
        // EXAMPLE
        // if user is touching screen we increase _x by 5
        if (this._animation == d.Animation_State.Run) {
            this._x += 5;
        }
    };
    // function for some kind of jump animation
    Player.prototype.jump = function () {
        this._animation = d.Animation_State.Jump; // change back to run or idle state after jump animation
        // do some jump timing and positioning stuff
    };
    // (re)draw our hero on the scene
    Player.prototype.draw = function () {
        // temporarily renaming it because lazy
        var ctx = this._stage;
        // the process of drawing something in canvas
        ctx.beginPath();
        ctx.rect(this._x, this._y, 100, 100); // x, y, width, height
        ctx.fillStyle = this._color; // color
        ctx.fill();
        ctx.closePath();
    };
    // update everything that changed with our hero
    // we get the input from GameScene, which gets it from the EventHandlers of GameController
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