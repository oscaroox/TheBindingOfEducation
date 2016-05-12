"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Enemy_1 = require('./Enemy');
var Pizza = (function (_super) {
    __extends(Pizza, _super);
    function Pizza(x, y, stage) {
        // static starting values
        var sprite = "pizza.png";
        _super.call(this, x, y, sprite, stage);
    }
    return Pizza;
}(Enemy_1["default"]));
exports.__esModule = true;
exports["default"] = Pizza;
//# sourceMappingURL=Pizza.js.map