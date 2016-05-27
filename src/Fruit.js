"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Object_1 = require('./Object');
var Defines_1 = require("./Defines");
var Fruit = (function (_super) {
    __extends(Fruit, _super);
    function Fruit(id, x, y, sprite, points) {
        _super.call(this, x, y, sprite);
        this._id = id;
        this._points = points;
        this._speed = Defines_1.BACKGROUND_SPEED;
        this._modOffSetY = 0.4;
    }
    Fruit.prototype.setInitPosition = function () {
        var offSetY = this._id * (this.getSprite().height * this._modOffSetY), y = -(this._id * this.getSprite().height) - this.getSprite().height + offSetY, x = this.getPositionX() - this.getSprite().width / 2;
        this.setPosition(x, y);
    };
    Fruit.prototype.update = function () {
        this.updatePosition(this._speed);
        _super.prototype.update.call(this);
    };
    return Fruit;
}(Object_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Fruit;
//# sourceMappingURL=Fruit.js.map