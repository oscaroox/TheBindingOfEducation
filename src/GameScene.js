"use strict";
var Pizza_1 = require('./Pizza');
var Hamburger_1 = require('./Hamburger');
var Player_1 = require('./Player');
var GameScore_1 = require('./GameScore');
// GAMESCENE
// Basically controls what is shown on screen
var GameScene = (function () {
    /// CONSTRUCTOR (called when creating new class)
    function GameScene() {
        this._enemies = [];
        this._score = new GameScore_1["default"](0);
        // add two enemies to scene
        this._enemies[0] = new Hamburger_1["default"](0, 0);
        this._enemies[1] = new Pizza_1["default"](0, 0);
        // add player to scene
        this._player = new Player_1["default"](0, 0);
        console.log(this._player);
        console.log(this._enemies[0]);
        console.log(this._enemies[1]);
        // start update loop
        this.loop();
    }
    /// METHODS (class functions)
    // update current game's score points
    GameScene.prototype.updateScore = function (p) {
        this._score.update(p);
    };
    // update current game scene
    GameScene.prototype.update = function () {
        this.updateScore(50);
        for (var i = 0; i < this._enemies.length; i++) {
            this._enemies[i].update();
        }
        this._player.update();
        this._score.update();
    };
    // constant update loop
    GameScene.prototype.loop = function () {
        var that = this;
        setInterval(function () {
            that.update();
        }, 500);
    };
    return GameScene;
}());
exports.__esModule = true;
exports["default"] = GameScene;
//# sourceMappingURL=GameScene.js.map