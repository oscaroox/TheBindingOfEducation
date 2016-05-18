"use strict";
var GameController_1 = require('./GameController');
var Pizza_1 = require('./Pizza');
var Hamburger_1 = require('./Hamburger');
var Player_1 = require('./Player');
var GameScore_1 = require('./GameScore');
var d = require('./Defines');
var Banana_1 = require('./Banana');
var Apple_1 = require('./Apple');
// GAMESCENE
// Controls what is shown on screen
var GameScene = (function () {
    function GameScene() {
        this._enemies = [];
        this._fruit = [];
        // canvas
        this._stage = d.ctx;
        // add a game controller that handles player input events
        this._gameController = new GameController_1.default();
        // score handler
        this._score = new GameScore_1.default(0);
        // add two enemies to scene
        this._enemies[0] = new Hamburger_1.default(90, 90);
        this._enemies[1] = new Pizza_1.default(200, 200);
        // add two fruits to scene
        this._fruit[0] = new Banana_1.default(0, 0, this._stage);
        this._fruit[1] = new Apple_1.default(0, 0, this._stage);
        console.log(this._fruit[0]);
        // add player to scene
        this._player = new Player_1.default(0, 0, this._gameController);
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
        this._player.update();
        // update points
        this._score.update(1);
    };
    // constant update loop
    GameScene.prototype.loop = function () {
        var _this = this;
        requestAnimationFrame(function () { return _this.loop(); });
        this.update();
    };
    return GameScene;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GameScene;
//# sourceMappingURL=GameScene.js.map