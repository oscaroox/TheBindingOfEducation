import GameScene from './GameScene';
import * as d from './Defines';

// START
// adjust canvas size to screen
d.canvas.width = window.innerWidth;
d.canvas.height = window.innerHeight;

// initialize and start game scene
var gameScene = new GameScene();