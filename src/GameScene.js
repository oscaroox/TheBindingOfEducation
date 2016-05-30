"use strict";
var Player_1 = require('./Player');
var GameScore_1 = require('./GameScore');
var d = require('./Defines');
var Playfield_1 = require('./Playfield');
var EnemiesMgr_1 = require("./EnemiesMgr");
var FruitMgr_1 = require("./FruitMgr");
var WorldMgr_1 = require("./WorldMgr");
// GAMESCENE
// Controls what is shown on screen
var GameScene = (function () {
    function GameScene() {
        // canvas
        this._stage = d.ctx;
        // add a game controller that handles player input events
        // score handler
        this._score = new GameScore_1.default(0);
        // add two enemies to scene
        this._enemiesMgr = new EnemiesMgr_1.default();
        // add two fruits to scene
        this._fruitMgr = new FruitMgr_1.default();
        this._worldMgr = new WorldMgr_1.default(this._fruitMgr, this._enemiesMgr);
        this._enemiesMgr.addWorldMgr(this._worldMgr);
        // add player to scene
        this._player = new Player_1.default();
        this._playfield = new Playfield_1.default();
        // start update loop
        this.loop();
    }
    // update current game scene
    GameScene.prototype.update = function () {
        // clear canvas for redraw
        this._stage.clearRect(0, 0, d.canvas.width, d.canvas.height);
        // background
        this._playfield.update();
        // fruit manager
        this._fruitMgr.update();
        // enemies manager
        this._enemiesMgr.update();
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