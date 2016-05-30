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
    function Player() {
        var sprite = "images/character_walking_big.png", health = 2;
        var x = d.canvas.width / 2;
        var y = d.canvas.height;
        _super.call(this, x, y, health, sprite);
        this._animationStep = 0;
        this._spriteAnimations = 1;
        this._spriteWidth = 45;
        this._spriteHeight = 72;
        this._spriteDrawTime = Date.now();
        this._spriteDrawTimeDiff = 150;
        this._curLane = d.Lane.LANE_MIDDLE;
        this._speedX = 5;
        this.addEventHandlers();
        this.init();
    }
    Player.prototype.init = function () {
        var x = this.getPositionX() - (this.getSprite().width / 2), y = this.getPositionY() - (this.getSprite().height * 1.5);
        this.setPosition(x, y);
        this.spawn();
    };
    //voeg een event toe aan click, geef door de x waarde van de muis
    // geeft door aan handleCLick
    //
    Player.prototype.addEventHandlers = function () {
        var _this = this;
        d.canvas.addEventListener('click', function (e) { _this.handleClick(e.clientX); });
        window.addEventListener('keydown', function (e) { _this.keyboardInput(e); });
    };
    // kijkt of de x kleiner dan de helft van canvas is
    Player.prototype.handleClick = function (clickX) {
        if (clickX < d.canvas.width / 2) {
            if (this._curLane > d.Lane.LANE_LEFT)
                this._curLane -= 1;
        }
        else {
            if (this._curLane < d.Lane.LANE_RIGHT)
                this._curLane += 1;
        }
    };
    Player.prototype.keyboardInput = function (event) {
        // PRESS LEFT ARROW OR 'A' KEY
        if (event.keyCode == 37 || event.keyCode == 65) {
            if (this._curLane > d.Lane.LANE_LEFT) {
                this._curLane -= 1;
            }
        }
        else if (event.keyCode == 39 || event.keyCode == 68) {
            if (this._curLane < d.Lane.LANE_RIGHT) {
                this._curLane += 1;
            }
        }
    };
    Player.prototype.animationMove = function () {
        var goal = Math.floor(d.Lane_Position[this._curLane] - (this.getSprite().width / 2) / 2), x = this.getPositionX(), y = this.getPositionY();
        if (this.getPositionX() != goal) {
            if (this.getPositionX() >= goal) {
                if (this.getPositionX() - this._speedX < goal) {
                    x = goal;
                }
                else {
                    x = this.getPositionX() - this._speedX;
                }
            }
            if (this.getPositionX() <= goal) {
                if (this.getPositionX() + this._speedX > goal) {
                    x = goal;
                }
                else {
                    x = this.getPositionX() + this._speedX;
                }
            }
            this.setPosition(x, y);
        }
    };
    Player.prototype.drawImage = function (rounds) {
        if (rounds === void 0) { rounds = 1; }
        for (var i = 0; i < rounds; ++i) {
            d.ctx.drawImage(this.getSprite(), this._spriteWidth * this._animationStep, i, this._spriteWidth, this._spriteHeight, this.getPositionX(), this.getPositionY(), this._spriteWidth, this._spriteHeight);
        }
    };
    Player.prototype.animateSprite = function () {
        var curTime = Date.now(), diff = curTime - this._spriteDrawTime;
        if (diff > this._spriteDrawTimeDiff) {
            if (this._animationStep < this._spriteAnimations) {
                this._animationStep += 1;
            }
            else {
                this._animationStep = 0;
            }
            this._spriteDrawTime = curTime;
        }
    };
    Player.prototype.draw = function () {
        this.drawImage();
        this.animateSprite();
    };
    // update everything that changed with our hero
    Player.prototype.update = function () {
        this.draw();
        this.animationMove();
    };
    return Player;
}(Unit_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Player;
//# sourceMappingURL=Player.js.map