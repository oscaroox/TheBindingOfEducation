"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fruit_1 = require('./Fruit');
var Banana = (function (_super) {
    __extends(Banana, _super);
    function Banana(x, y, stage) {
        // static starting values
        var sprite = "banana.png", points = 5;
        _super.call(this, x, y, sprite, stage, points);
    }
    return Banana;
}(Fruit_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Banana;
//# sourceMappingURL=Banana.js.map