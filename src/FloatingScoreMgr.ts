import {canvas} from "./Defines";
import FloatingScore from "./FloatingScore";
import GameScene from "./GameScene";

export default class FloatingScoreMgr
{
    private _scores: FloatingScore[];
    private _gameScene: GameScene;

    constructor(gameScene: GameScene)
    {
        this._scores = [];
        this._gameScene = gameScene;
    }

    public addFloatingScore(points: number):void 
    {
        var playerPos = this._gameScene.getPlayer().getPosition(),
            x = playerPos.x,
            y = playerPos.y;
        
        var score = new FloatingScore(x, y, points);
        this._scores.push(score); 
    }

    private removeFloatingScore(indexList: number[]) {
        for(var i = this._scores.length - 1; i >= 0; i -= 1) {
            if(i === indexList[i]) {
                this._scores.splice(i, 1);
            }
        }
    }
    
    public update():void
    {
        var removeScoresList: number[] = [];

        for (var i = 0; i < this._scores.length; i += 1) {
            var s = this._scores[i];

            s.update();

            if (s.getPosition().y > canvas.height)
                removeScoresList.push(i);
        }

        if (removeScoresList.length > 0) this.removeFloatingScore(removeScoresList);
    }
}