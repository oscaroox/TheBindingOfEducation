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



var imagesArray = [
    'images/apple.png',
    'images/banana.png',
    'images/bg_2_end_540_960.png',
    'images/bg_2_end_1080_1920.png',
    'images/bg_2_mid_540_960.png',
    'images/bg_2_mid_1080_1920.png',
    'images/bg_2_start_540_960.png',
    'images/bg_2_start_1080_1920.png',
    'images/bg_540_960.png',
    'images/bg_720_1280.png',
    'images/bg_1080_1920.png',
    'images/boat.png',
    'images/character_walking.png',
    'images/character_walking_big.png',
    'images/cookingoil.png',
    'images/hamburger.png',
    'images/lilypad.gif',
    'images/pizza.png',
    'images/strawberry.png',
    'images/watermelon.png'
];

// initialize and start game scene
if (loadImages(imagesArray)) {
    console.log('starting game');
    var gameScene = new GameScene();
} else {
    console.log('unable to start game');
}