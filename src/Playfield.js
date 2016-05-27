"use strict";
var d = require('./Defines');
var Defines_1 = require("./Defines");
var Playfield = (function () {
    function Playfield() {
        this._stage = d.ctx; // defines canvas set to _stage
        this._sprites = []; // create image array
        var tempSprites = new Image(); // create var and set to a image
        tempSprites.src = "images/wlnd.png";
        var tempSprites2 = new Image(); // create var and set to a image
        tempSprites2.src = "images/wlnd.png";
        this._sprites[0] = tempSprites; // first image is set into the _sprites array
        this._sprites[1] = tempSprites2; // second image is set into the _sprites array
        this._x = []; // create an _x position array
        this._y = []; // create an _y position array
        this._x[0] = d.canvas.width / 2 - this._sprites[0].width / 2; // first position _x is set to the width from canvas divided by 2
        this._y[0] = d.canvas.height / 2; // first position _y is set to the width from canvas divided by 2
        this._x[1] = this._x[0]; // Second _x position is the same as the first _x position
        this._y[1] = this._y[0] - this._sprites[0].height; // second _y position is set as the first _y position minus the height from the first image
        this.draw();
    }
    Playfield.prototype.updatePosition = function () {
        this._y[0] += Defines_1.BACKGROUND_SPEED;
        this._y[1] += Defines_1.BACKGROUND_SPEED;
        this.shuffle();
    };
    Playfield.prototype.shuffle = function () {
        for (var i = 0; i < this._y.length; i += 1) {
            var bottomOfScreen = d.canvas.height; // buttomOfScreen is set to the height of the canvas
            var spriteTop = this._y[i]; // spriteHeight is set to the height from the images loop
            if (spriteTop > bottomOfScreen) {
                if (i == 1) {
                    var j = 0;
                }
                else {
                    var j = 1;
                }
                this._y[i] = this._y[j] - this._sprites[i].height;
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