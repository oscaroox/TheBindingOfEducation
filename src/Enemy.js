"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Unit_1 = require('./Unit');
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(x, y, health, sprite, width, height, color) {
        _super.call(this, x, y, health, sprite, width, height, color);
    }
    return Enemy;
}(Unit_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Enemy;
//# sourceMappingURL=Enemy.js.map