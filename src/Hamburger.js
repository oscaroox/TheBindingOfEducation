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
        _super.call(this, x, y, "hamburger.png", 100, stage);
    }
    return Hamburger;
}(Enemy_1["default"]));
exports.__esModule = true;
exports["default"] = Hamburger;
//# sourceMappingURL=Hamburger.js.map