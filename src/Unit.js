"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Object_1 = require('./Object');
var Unit = (function (_super) {
    __extends(Unit, _super);
    function Unit(x, y, health, sprite) {
        _super.call(this, x, y, sprite);
        this._health = health;
        this.spawn();
    }
    return Unit;
}(Object_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Unit;
//# sourceMappingURL=Unit.js.map