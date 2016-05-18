"use strict";
var d = require('./Defines');
var Playfield = (function () {
    function Playfield() {
        this._stage = d.ctx;
        this._sprites = [];
        var tempSprites = new Image();
        tempSprites.src = "images/wlnd.jpg";
        var tempSprites2 = new Image();
        tempSprites2.src = "images/wlnd.jpg";
        this._sprites[0] = tempSprites;
        this._sprites[1] = tempSprites2;
        this._x = [];
        this._y = [];
        this._x[0] = d.canvas.width / 2;
        this._y[0] = d.canvas.height / 2;
        this._x[1] = this._x[0];
        this._y[1] = this._y[0] - this._sprites[0].height;
        // this._x[0] = 0;
        // this._y[0] = 0;
        // this._x[1] = this._x[0];
        // this._y[1] = this._y[0] - this._sprites[0].height;
        this.draw();
    }
    Playfield.prototype.updatePosition = function () {
        this._y[0] += 5;
        this._y[1] += 5;
        this.shuffle();
    };
    Playfield.prototype.shuffle = function () {
        for (var i = 0; i < this._sprites.length; i += 1) {
            var bottomOfScreen = d.canvas.height;
            var spriteHeight = this._sprites[i].height;
            if (spriteHeight < bottomOfScreen) {
            }
        }
    };
    Playfield.prototype.draw = function () {
        this._stage.drawImage(this._sprites[0], this._x[0], this._y[0]);
        this._stage.drawImage(this._sprites[1], this._x[1], this._y[1]);
    };
    Playfield.prototype.update = function () {
        this.updatePosition();
        this.draw();
    };
    return Playfield;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Playfield;
//# sourceMappingURL=Playfield.js.map