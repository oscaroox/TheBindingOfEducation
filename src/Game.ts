import GameScene from "./GameScene";
import ImageManager from "./ImageManager";

export default class Game
{
    constructor()
    {
        var imageMgr = new ImageManager(this);
    }
    
    public startGame():void
    {
        var gameScene = new GameScene();
    }
}