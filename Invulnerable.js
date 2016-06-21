"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Powerup_1 = require("./src/Powerup");
var Invulnerable = (function (_super) {
    __extends(Invulnerable, _super);
    function Invulnerable() {
        var duration = 10000;
        _super.call(this, duration);
    }
    return Invulnerable;
}(Powerup_1["default"]));
exports.__esModule = true;
exports["default"] = Invulnerable;
//# sourceMappingURL=Invulnerable.js.map