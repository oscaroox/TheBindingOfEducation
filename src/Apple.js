"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fruit_1 = require('./Fruit');
var Apple = (function (_super) {
    __extends(Apple, _super);
    function Apple(x, y) {
        // static starting values
        var sprite = "images/apple.png", points = 8;
        _super.call(this, x, y, sprite, points);
    }
    return Apple;
}(Fruit_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Apple;
//# sourceMappingURL=Apple.js.map