"use strict";
var d = require('./Defines');
var Playfield = (function () {
    function Playfield(x, y, background) {
        this._x = x;
        this._y = y;
        this._stage = d.ctx;
        this._background = background;
    }
    Playfield.prototype.init = function () {
        var img = document.getElementById('wlnd');
        this._stage.drawImage(img, 10, 10);
    };
    return Playfield;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Playfield;
//# sourceMappingURL=Playfield.js.map