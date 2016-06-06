import {ctx, canvas} from "./Defines";
import WorldMgr from "./WorldMgr";
import FloatingScore from "./FloatingScore";

export default class FloatingScoreMgr
{
    private _scores: FloatingScore[];
    private _worldMgr: WorldMgr;

    constructor()
    {
        this._scores = [];
    }

    public addWorldMgr(worldMgr: WorldMgr):void { this._worldMgr = worldMgr; }

    public addFloatingScore(points: number):void 
    {
        var playerPos = this._worldMgr.getPlayer().getPosition(),
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