"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Enemy_1 = require('./Enemy');
var Hamburger = (function (_super) {
    __extends(Hamburger, _super);
    function Hamburger(x, y, stage) {
        // static starting values
        var sprite = "hamburger.png", color = "rgba(255,0,0,1)", width = 90, height = 90;
        _super.call(this, x, y, sprite, width, height, color, stage);
    }
    Hamburger.prototype.spawn = function () {
        _super.prototype.spawn.call(this);
    };
    return Hamburger;
}(Enemy_1["default"]));
exports.__esModule = true;
exports["default"] = Hamburger;
//# sourceMappingURL=Hamburger.js.map