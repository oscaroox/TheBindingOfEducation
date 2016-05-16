/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var GameScene_1 = __webpack_require__(1);
	// START
	// initialize and start game scene
	var gameScene = new GameScene_1.default();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var GameController_1 = __webpack_require__(2);
	var Pizza_1 = __webpack_require__(4);
	var Hamburger_1 = __webpack_require__(6);
	var Player_1 = __webpack_require__(7);
	var GameScore_1 = __webpack_require__(8);
	var d = __webpack_require__(3);
	// GAMESCENE
	// Controls what is shown on screen
	var GameScene = (function () {
	    function GameScene() {
	        this._enemies = [];
	        // canvas
	        this._stage = d.ctx;
	        // add a game controller that handles player input events
	        this._gameController = new GameController_1.default();
	        // score handler
	        this._score = new GameScore_1.default(0);
	        // add two enemies to scene
	        this._enemies[0] = new Hamburger_1.default(0, 0, this._stage);
	        this._enemies[1] = new Pizza_1.default(0, 0, this._stage);
	        // add player to scene
	        this._player = new Player_1.default(0, 0, this._stage);
	        // start update loop
	        this.loop();
	    }
	    // update current game scene
	    GameScene.prototype.update = function () {
	        // clear canvas for redraw
	        this._stage.clearRect(0, 0, d.canvas.width, d.canvas.height);
	        // update all enemies on screen
	        for (var i = 0; i < this._enemies.length; i++) {
	            this._enemies[i].update();
	        }
	        // update player
	        this._player.update(this._gameController.getInputState());
	        // update points
	        this._score.update(50);
	    };
	    // constant update loop
	    GameScene.prototype.loop = function () {
	        var that = this;
	        setInterval(function () {
	            that.update();
	        }, 500);
	    };
	    return GameScene;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = GameScene;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var d = __webpack_require__(3);
	//GAMECONTROLLER
	//handles player input
	var GameController = (function () {
	    function GameController() {
	        this._inputState = d.Input_State.None;
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
	            that.setInput(d.Input_State.Click);
	        });
	        // mouse button pressed down
	        d.canvas.addEventListener('touch', function () {
	            that.setInput(d.Input_State.Touch);
	        });
	        // mouse button released
	        d.canvas.addEventListener('mouseup', function () {
	            that.setInput(d.Input_State.None);
	        });
	    };
	    GameController.prototype.setInput = function (input) {
	        this._inputState = input;
	    };
	    return GameController;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = GameController;


/***/ },
/* 3 */
/***/ function(module, exports) {

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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Enemy_1 = __webpack_require__(5);
	var Pizza = (function (_super) {
	    __extends(Pizza, _super);
	    function Pizza(x, y, stage) {
	        // static starting values
	        var sprite = "pizza.png";
	        _super.call(this, x, y, sprite, stage);
	    }
	    return Pizza;
	}(Enemy_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Pizza;


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	// 'abstract' means you can not instantiate this class
	// this is because 'Enemy' is meant to be a parent class only
	// think about it like the word 'Animal'
	// there are multiple types of animals like dogs and cats, but there is no 'Animal'
	// so to prevent errors, bugs and headaches, we define this class as 'abstract'
	var Enemy = (function () {
	    function Enemy(pos_x, pos_y, s, stage) {
	        this._x = pos_x;
	        this._y = pos_y;
	        this._sprite = s;
	        this._stage = stage;
	        this.spawn();
	    }
	    // __EXAMPLE METHODS__
	    // IF YOU DON'T USE THEM JUST DELETE THEM
	    // when enemy first enters the scene
	    Enemy.prototype.spawn = function () {
	    };
	    // when enemy leaves the scene for whatever reason
	    Enemy.prototype.despawn = function () {
	    };
	    // GETTERS and SETTERS
	    // When working in classes, try to always use PRIVATE class variables
	    // You can not change or access these variables without making these 'get' and 'set' functions
	    // It makes things safer and is good practice for future projects
	    // Always specify what the return type is (if you know)! (:number, :string, :Array<number>, :Array<string>, etc)
	    // return x and y coordinates
	    Enemy.prototype.getPosition = function () { return { x: this._x, y: this._y }; };
	    // return only the x coordinate
	    Enemy.prototype.getPositionX = function () { return this._x; };
	    // return only the y coordinate
	    Enemy.prototype.getPositionY = function () { return this._y; };
	    // set position of enemy
	    Enemy.prototype.setPosition = function (x, y) {
	        this._x = x;
	        this._y = y;
	    };
	    // loop through animations
	    Enemy.prototype.updateAnimation = function () {
	    };
	    // draw enemy on screen
	    Enemy.prototype.draw = function () {
	    };
	    // update position, animation, etc.
	    Enemy.prototype.update = function () {
	    };
	    return Enemy;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Enemy;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Enemy_1 = __webpack_require__(5);
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
	}(Enemy_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Hamburger;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var d = __webpack_require__(3);
	// PLAYER
	// all updates and movement is done in this class
	var Player = (function () {
	    function Player(pos_x, pos_y, stage) {
	        this._x = pos_x;
	        this._y = pos_y;
	        this._sprite = "player.png";
	        this._health = 100;
	        this._animation = d.Animation_State.Idle;
	        this._stage = stage;
	        this.draw();
	    }
	    // __EXAMPLE METHODS__
	    // IF YOU DON'T USE THEM JUST DELETE THEM
	    // when enemy first enters the scene
	    Player.prototype.spawn = function () {
	    };
	    // when enemy leaves the scene for whatever reason
	    Player.prototype.despawn = function () {
	    };
	    // when our hero dies
	    Player.prototype.onDeath = function () {
	    };
	    // set animation state which will be used to determine the current or next animation cycle
	    Player.prototype.setAnimationState = function (input) {
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
	    Player.prototype.updateAnimation = function () {
	        // EXAMPLES
	        if (this._animation == d.Animation_State.Run) {
	        }
	        if (this._animation == d.Animation_State.Jump) {
	        }
	    };
	    // update our hero's position to some x and y coordinate on the scene
	    Player.prototype.updatePosition = function () {
	        // update our _x and _y according to some button presses and super complicated formulas like
	        // _x += 5
	        // EXAMPLE
	        // if user is touching screen we increase _x by 5
	        if (this._animation == d.Animation_State.Run) {
	            this._x += 5;
	        }
	    };
	    // function for some kind of jump animation
	    Player.prototype.jump = function () {
	        this._animation = d.Animation_State.Jump; // change back to run or idle state after jump animation
	        // do some jump timing and positioning stuff
	    };
	    // (re)draw our hero on the scene
	    Player.prototype.draw = function () {
	        // temporarily renaming it because lazy
	        var ctx = this._stage;
	        // the process of drawing something in canvas
	        ctx.beginPath();
	        ctx.rect(this._x, this._y, 100, 100); // x, y, width, height
	        ctx.fillStyle = "rgba(255,244,84,1)"; // color
	        ctx.fill();
	        ctx.closePath();
	    };
	    // update everything that changed with our hero
	    // we get the input from GameScene, which gets it from the EventHandlers of GameController
	    Player.prototype.update = function (input) {
	        this.setAnimationState(input);
	        this.updateAnimation();
	        this.updatePosition();
	        // after updating everything we redraw player sprite on screen with our new data
	        this.draw();
	    };
	    return Player;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Player;


/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	// SCORE
	// everything that has to do with gamescore is done here
	var GameScore = (function () {
	    function GameScore(p) {
	        this._points = p;
	        this._displayElement = document.getElementById('score');
	        this.draw();
	    }
	    // update score with some number
	    GameScore.prototype.update = function (p) {
	        if (p === void 0) { p = 0; }
	        this._points += p;
	        this.draw();
	    };
	    // draw it on screen
	    GameScore.prototype.draw = function () {
	        this._displayElement.innerHTML = String(this._points);
	    };
	    return GameScore;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = GameScore;


/***/ }
/******/ ]);