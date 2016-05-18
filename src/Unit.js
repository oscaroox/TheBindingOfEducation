"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var d = require('./Defines');
var Object_1 = require('./Object');
var Unit = (function (_super) {
    __extends(Unit, _super);
    function Unit(x, y, health, sprite, width, height, color) {
        _super.call(this, x, y, sprite, width, height, color);
        this._health = health;
        this._animation = d.Animation_State.Idle;
        this.spawn();
    }
    // get current animation
    Unit.prototype.getAnimationState = function () { return this._animation; };
    // set animation state which will be used to determine the current or next animation cycle
    Unit.prototype.setAnimationState = function (input) {
        // not moving
        if (input == d.Input_State.None) {
            this._animation = d.Animation_State.Idle;
        }
        // move
        if (input == d.Input_State.Touch || input == d.Input_State.Click) {
            this._animation = d.Animation_State.Run;
        }
    };
    // loop through animations (spritesheets)
    Unit.prototype.updateAnimation = function () {
        // EXAMPLES
        if (this._animation == d.Animation_State.Run) {
        }
        if (this._animation == d.Animation_State.Jump) {
        }
    };
    return Unit;
}(Object_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Unit;
//# sourceMappingURL=Unit.js.map