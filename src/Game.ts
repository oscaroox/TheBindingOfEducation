import GameScene from "./GameScene";
import ImageMgr from "./ImageMgr";
import {canvas, Lane_Position, Lane} from "./Defines";
import AudioMgr from "./AudioMgr";

export default class Game
{
    constructor()
    {
        this.init();
        var imageMgr = new ImageMgr(this);
    }

    private init():void
    {
        // adjust canvas size to screen
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;

        // changes lane X-coordinates according to window size
        Lane_Position[Lane.LANE_LEFT]   = Math.floor((510 / 1280) * window.innerWidth);
        Lane_Position[Lane.LANE_MIDDLE] = Math.floor((640 / 1280) * window.innerWidth);
        Lane_Position[Lane.LANE_RIGHT]  = Math.floor((760 / 1280) * window.innerWidth);
    }
    
    public loadAudio():void
    {
        var audioMgr = new AudioMgr(this);
    }
    
    public startGame():void
    {
        var gameScene = new GameScene();
    }
}