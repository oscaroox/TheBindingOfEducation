"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var d = require('./Defines');
var Unit_1 = require('./Unit');
var Defines_1 = require("./Defines");
// PLAYER
// all updates and movement is done in this class
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        var sprite = "images/player_50.png", health = 2;
        var x = d.canvas.width / 2;
        var y = d.canvas.height;
        _super.call(this, x, y, health, sprite);
        this._curLane = d.Lane.LANE_MIDDLE;
        this.addEventHandlers();
        this.init();
        this.spawn();
    }
    Player.prototype.init = function () {
        var x = this.getPositionX() - (this.getSprite().width / 2), y = this.getPositionY() - (this.getSprite().height * 1.5);
        this.setPosition(x, y);
    };
    //voeg een event toe aan click, geef door de x waarde van de muis
    // geeft door aan handleCLick
    Player.prototype.addEventHandlers = function () {
        var _this = this;
        d.canvas.addEventListener('click', function (e) { _this.handleClick(e.clientX); });
    };
    // kijkt of de x kleiner dan de helft van canvas is
    Player.prototype.handleClick = function (x) {
        if (x < d.canvas.width / 2) {
            this.updatePosition(d.Click_Position.POS_LEFT);
        }
        else {
            this.updatePosition(d.Click_Position.POS_RIGHT);
        }
    };
    // update our hero's position to some x and y coordinate on the scene
    Player.prototype.updatePosition = function (clickPosition) {
        if (clickPosition == Defines_1.Click_Position.POS_LEFT) {
            if (this._curLane > d.Lane.LANE_LEFT)
                this._curLane -= 1;
        }
        else {
            if (this._curLane < d.Lane.LANE_RIGHT)
                this._curLane += 1;
        }
        var x = d.Lane_Position[this._curLane] - this.getSprite().width / 2, y = this.getPositionY();
        this.setPosition(x, y);
    };
    // update everything that changed with our hero
    Player.prototype.update = function () {
        // after updating everything we redraw player sprite on screen with our new data
        _super.prototype.update.call(this);
    };
    return Player;
}(Unit_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Player;
//# sourceMappingURL=Player.js.map