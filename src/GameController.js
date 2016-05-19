"use strict";
var d = require('./Defines');
//GAMECONTROLLER
//handles player input
var GameController = (function () {
    function GameController() {
        this._inputState = d.Input_State.INPUT_NONE;
        // add event handlers
        this.eventHandler();
    }
    GameController.prototype.getInputState = function () {
        return this._inputState;
    };
    // event listeners
    GameController.prototype.eventHandler = function () {
        // save controller object
        // the next time 'this' is called ANYWHERE in this project, 'this' gets replaced.
        // We save 'this' into the variable 'that'
        // so the code references to the correct object in the future.
        // try changing that.setInput to this.setInput and look at the error in console.
        //// "When do you save this in that?"
        // If you get the 'undefined' error in the console you should try it first.
        var that = this;
        // mouse button pressed down
        d.canvas.addEventListener('mousedown', function () {
            that.setInput(d.Input_State.INPUT_CLICK);
        });
        // mouse button pressed down
        d.canvas.addEventListener('touch', function () {
            that.setInput(d.Input_State.INPUT_TOUCH);
        });
        // mouse button released
        d.canvas.addEventListener('mouseup', function () {
            that.setInput(d.Input_State.INPUT_NONE);
        });
    };
    GameController.prototype.setInput = function (input) {
        this._inputState = input;
    };
    return GameController;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GameController;
//# sourceMappingURL=GameController.js.map