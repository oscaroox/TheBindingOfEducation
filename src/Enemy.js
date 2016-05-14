"use strict";
// 'abstract' means you can not instantiate this class
// this is because 'Enemy' is meant to be a parent class only
// think about it like the word 'Animal'
// there are multiple types of animals like dogs and cats, but there is no 'Animal'
// so to prevent errors, bugs and headaches, we define this class as 'abstract'
var Enemy = (function () {
    function Enemy(x, y, sprite, width, height, color, stage) {
        this._x = y;
        this._y = x;
        this._sprite = sprite;
        this._color = color;
        this._width = width;
        this._height = height;
        this._stage = stage;
        this.spawn();
    }
    // __EXAMPLE METHODS__
    // IF YOU DON'T USE THEM JUST DELETE THEM
    // when enemy first enters the scene
    Enemy.prototype.spawn = function () {
        this.draw();
    };
    // when enemy leaves the scene for whatever reason
    Enemy.prototype.despawn = function () {
    };
    // GETTERS and SETTERS
    // When working in classes, try to always use PRIVATE class variables
    // You can not change or access these variables without making these 'get' and 'set' functions
    // It makes things safer because you can control their read/write properties
    // and it is good practice for future projects
    // Always specify what the return type is (if you know)! (:number, :string, :Array<number>, :Array<string>, etc)
    // return x and y coordinates
    Enemy.prototype.getPosition = function () { return { x: this._x, y: this._y }; };
    // return only the x coordinate
    Enemy.prototype.getPositionX = function () { return this._x; };
    // return only the y coordinate
    Enemy.prototype.getPositionY = function () { return this._y; };
    // set position of enemy
    Enemy.prototype.setPosition = function (x, y) {
        this._x = x;
        this._y = y;
    };
    Enemy.prototype.getStage = function () { return this._stage; };
    // loop through animations
    Enemy.prototype.updateAnimation = function () {
    };
    // draw enemy on screen
    Enemy.prototype.draw = function () {
        var ctx = this._stage;
        ctx.beginPath();
        ctx.rect(this._x, this._y, this._width, this._height);
        ctx.fillStyle = this._color;
        ctx.fill();
        ctx.closePath();
    };
    // update position, animation, etc.
    Enemy.prototype.update = function () {
        this.draw();
    };
    return Enemy;
}());
exports.__esModule = true;
exports["default"] = Enemy;
//# sourceMappingURL=Enemy.js.map