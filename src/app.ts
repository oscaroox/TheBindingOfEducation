import GameScene from './GameScene'
import {canvas, Lane_Position, Lane} from './Defines'
import {loadImages} from "./loadImages";

// START
// adjust canvas size to screen
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

// var cor = ((1280 - window.innerWidth) / 1280);

// changes lane X-coordinates according to window size
Lane_Position[Lane.LANE_LEFT]   = Math.floor((510 / 1280) * window.innerWidth);
Lane_Position[Lane.LANE_MIDDLE] = Math.floor((640 / 1280) * window.innerWidth);
Lane_Position[Lane.LANE_RIGHT]  = Math.floor((760 / 1280) * window.innerWidth);


// initialize and start game scene
if (loadImages()) {
    console.log('starting game');
    var gameScene = new GameScene();
} else {
    console.log('unable to start game');
}