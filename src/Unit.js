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
    function Unit(x, y, health, sprite) {
        _super.call(this, x, y, sprite);
        this._health = health;
        this._animation = d.Animation_State.ANIM_IDLE;
        this.spawn();
    }
    // get current animation
    Unit.prototype.getAnimationState = function () { return this._animation; };
    // set animation state which will be used to determine the current or next animation cycle
    Unit.prototype.setAnimationState = function (input) {
        // not moving
        if (input == d.Input_State.INPUT_NONE) {
            this._animation = d.Animation_State.ANIM_IDLE;
        }
        // move
        if (input == d.Input_State.INPUT_TOUCH || input == d.Input_State.INPUT_CLICK) {
            this._animation = d.Animation_State.ANIM_RUN;
        }
    };
    // loop through animations (spritesheets)
    Unit.prototype.updateAnimation = function () {
        // EXAMPLES
        if (this._animation == d.Animation_State.ANIM_RUN) {
        }
        if (this._animation == d.Animation_State.ANIM_RUN) {
        }
    };
    return Unit;
}(Object_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Unit;
//# sourceMappingURL=Unit.js.map