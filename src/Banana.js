"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fruit_1 = require('./Fruit');
var Banana = (function (_super) {
    __extends(Banana, _super);
    function Banana(id, x) {
        // static starting values
        var sprite = "images/banana.png", points = 5, y = 0 - 1000;
        _super.call(this, id, x, y, sprite, points);
        this.setInitPosition();
    }
    return Banana;
}(Fruit_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Banana;
//# sourceMappingURL=Banana.js.map