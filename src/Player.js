"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var d = require('./Defines');
var Unit_1 = require('./Unit');
// PLAYER
// all updates and movement is done in this class
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(x, y, gameController) {
        var sprite = "images/player.png", health = 2;
        _super.call(this, x, y, health, sprite);
        this._gameController = gameController;
        this.spawn();
    }
    // update our hero's position to some x and y coordinate on the scene
    Player.prototype.updatePosition = function () {
        // EXAMPLE
        // if user is touching screen animation state is set to RUN
        // if our animation state is run then increase our x position by 5 pixels every update
        if (this.getAnimationState() == d.Animation_State.Run) {
            var x = this.getPositionX() + 5, y = this.getPositionY();
            this.setPosition(x, y);
        }
    };
    // update everything that changed with our hero
    // we get the input from GameScene, which gets it from the EventHandlers of GameController
    Player.prototype.update = function () {
        var inputState = this._gameController.getInputState();
        this.setAnimationState(inputState);
        this.updateAnimation();
        this.updatePosition();
        // after updating everything we redraw player sprite on screen with our new data
        _super.prototype.update.call(this);
    };
    return Player;
}(Unit_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Player;
//# sourceMappingURL=Player.js.map