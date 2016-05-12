"use strict";
// 'abstract' means you can not instantiate this class
// this is because 'Enemy' is meant to be a parent class only
// think about it like the word 'Animal'
// there are multiple types of animals like dogs and cats, but there is no 'Animal'
// so to prevent errors, bugs and headaches, we define this class as 'abstract'
var Enemy = (function () {
    function Enemy(pos_x, pos_y, s, hp, stage) {
        this._x = pos_x;
        this._y = pos_y;
        this._sprite = s;
        this._health = hp;
        this._stage = stage;
        this.spawn();
    }
    // __EXAMPLE METHODS__
    // IF YOU DON'T USE THEM JUST DELETE THEM
    // when enemy first enters the scene
    Enemy.prototype.spawn = function () {
    };
    // when enemy leaves the scene for whatever reason
    Enemy.prototype.despawn = function () {
    };
    // GETTERS and SETTERS
    // When working in classes, try to always use PRIVATE class variables
    // You can not change or access these variables without making these 'get' and 'set' functions
    // It makes things safer and is good practice for future projects
    // Always specify what the return type is (if you know)! (:number, :string, :Array<number>, :Array<string>, etc)
    // return x and y coordinates
    Enemy.prototype.getPosition = function () {
        return { x: this._x, y: this._y };
    };
    // return only the x coordinate
    Enemy.prototype.getPositionX = function () {
        return this._x;
    };
    // return only the y coordinate
    Enemy.prototype.getPositionY = function () {
        return this._y;
    };
    // set position of enemy
    Enemy.prototype.setPosition = function (x, y) {
        this._x = x;
        this._y = y;
    };
    // loop through animations
    Enemy.prototype.updateAnimation = function () {
    };
    // draw enemy on screen
    Enemy.prototype.draw = function () {
    };
    // update position, animation, etc.
    Enemy.prototype.update = function () {
    };
    return Enemy;
}());
exports.__esModule = true;
exports["default"] = Enemy;
//# sourceMappingURL=Enemy.js.map