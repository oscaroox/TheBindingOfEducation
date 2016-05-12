"use strict";
(function (Animation_State) {
    Animation_State[Animation_State["Idle"] = 0] = "Idle";
    Animation_State[Animation_State["Run"] = 1] = "Run";
    Animation_State[Animation_State["Jump"] = 2] = "Jump";
})(exports.Animation_State || (exports.Animation_State = {}));
var Animation_State = exports.Animation_State;
(function (Input_State) {
    Input_State[Input_State["None"] = 0] = "None";
    Input_State[Input_State["Touch"] = 1] = "Touch";
    Input_State[Input_State["Click"] = 2] = "Click";
})(exports.Input_State || (exports.Input_State = {}));
var Input_State = exports.Input_State;
exports.canvas = document.getElementById('canvas');
exports.ctx = exports.canvas.getContext('2d');
//# sourceMappingURL=Defines.js.map