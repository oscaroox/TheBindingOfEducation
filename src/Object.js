"use strict";
var d = require('./Defines');
var __Object = (function () {
    function __Object(x, y, sprite) {
        this._x = x;
        this._y = y;
        this._stage = d.ctx;
        this._sprite = new Image();
        this._sprite.src = sprite;
        this.spawn();
    }
    // __EXAMPLE METHODS__
    // IF YOU DON'T USE THEM JUST DELETE THEM
    // GETTERS and SETTERS
    // When working in classes, try to always use PRIVATE class variables
    // You can not change or access these variables without making these 'get' and 'set' functions
    // It makes things safer because you can control their read/write properties
    // and it is good practice for future projects
    // Always specify what the return type is (if you know)! (:number, :string, :Array<number>, :Array<string>, etc)
    // return x and y coordinates
    __Object.prototype.getPosition = function () { return { x: this._x, y: this._y }; };
    // return only the x coordinate
    __Object.prototype.getPositionX = function () { return this._x; };
    // return only the y coordinate
    __Object.prototype.getPositionY = function () { return this._y; };
    // set position of unit
    __Object.prototype.setPosition = function (x, y) {
        this._x = x;
        this._y = y;
    };
    __Object.prototype.updatePosition = function (speed) {
        var x = this._x, y = this._y + speed;
        this.setPosition(x, y);
    };
    __Object.prototype.getSprite = function () { return this._sprite; };
    // when unit first enters the scene
    __Object.prototype.spawn = function () {
        this.draw();
    };
    // when unit leaves the scene for whatever reason
    __Object.prototype.despawn = function () {
    };
    // when unit dies
    __Object.prototype.onDeath = function () {
    };
    // draw enemy on screen
    __Object.prototype.draw = function () {
        this._stage.drawImage(this._sprite, this._x, this._y);
    };
    // update position, animation, etc.
    __Object.prototype.update = function () {
        this.draw();
    };
    return __Object;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = __Object;
//# sourceMappingURL=Object.js.map