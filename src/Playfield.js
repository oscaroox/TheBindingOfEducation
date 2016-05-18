"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var d = require('./Defines');
var Object_1 = require('./Object');
var Playfield = (function (_super) {
    __extends(Playfield, _super);
    function Playfield(x, y) {
        var sprite = "images/wlnd.jpg";
        _super.call(this, x, y, sprite);
        _super.prototype.draw.call(this);
    }
    Playfield.prototype.updatePosition = function () {
        var x = this.getPositionX(), y = this.getPositionY() + 5;
        this.setPosition(x, y);
        this.shuffle();
    };
    Playfield.prototype.shuffle = function () {
        var bottomOfScreen = d.canvas.height;
        var spriteHeight = this.getSprite().height;
        if (spriteHeight < bottomOfScreen) {
        }
    };
    Playfield.prototype.update = function () {
        _super.prototype.update.call(this);
        this.updatePosition();
    };
    return Playfield;
}(Object_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Playfield;
//# sourceMappingURL=Playfield.js.map