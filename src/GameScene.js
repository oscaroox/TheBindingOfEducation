"use strict";
var GameController_1 = require('./GameController');
var Pizza_1 = require('./Pizza');
var Hamburger_1 = require('./Hamburger');
var Player_1 = require('./Player');
var GameScore_1 = require('./GameScore');
var d = require('./Defines');
// GAMESCENE
// Controls what is shown on screen
var GameScene = (function () {
    function GameScene() {
        this._enemies = [];
        // canvas
        this._stage = d.ctx;
        // add a game controller that handles player input events
        this._gameController = new GameController_1["default"]();
        // score handler
        this._score = new GameScore_1["default"](0);
        // add two enemies to scene
        this._enemies[0] = new Hamburger_1["default"](0, 0, this._stage);
        this._enemies[1] = new Pizza_1["default"](0, 0, this._stage);
        // add player to scene
        this._player = new Player_1["default"](0, 0, this._stage);
        // start update loop
        this.loop();
    }
    // update current game scene
    GameScene.prototype.update = function () {
        // clear canvas for redraw
        this._stage.clearRect(0, 0, d.canvas.width, d.canvas.height);
        // update all enemies on screen
        for (var i = 0; i < this._enemies.length; i++) {
            this._enemies[i].update();
        }
        // update player
        this._player.update(this._gameController.getInputState());
        // update points
        this._score.update(50);
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