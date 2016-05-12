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
        var sprite = "hamburger.png";
        _super.call(this, x, y, sprite, stage);
    }
    // __EXAMPLE__
    // spawn is already a method of our parent class 'Enemy'
    // but if needed, we can override it by just calling it the same (phpstorm will show an icon to the left when you
    // override methods
    Hamburger.prototype.spawn = function () {
        // this means to execute everything from our parent's class version of 'spawn'
        // if you want to do this, do it FIRST!
        // if not, just leave it out
        _super.prototype.spawn.call(this);
        // here you can add things that need to happen for this specific class
        // like positioning it or something
        this.setPosition(10, 10);
    };
    return Hamburger;
}(Enemy_1["default"]));
exports.__esModule = true;
exports["default"] = Hamburger;
//# sourceMappingURL=Hamburger.js.map