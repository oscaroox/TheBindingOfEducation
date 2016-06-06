import {getRandomInt} from "./Globals";
import GameScene from "./GameScene";

abstract class ObjectsMgr
{
    protected _time: number;                                // last time since we spawned an object                   
    protected _timeDiff: { min: number, max: number };      // min and max time between spawning objects
    protected _gameScene: GameScene;

    private _nextSpawnTime: number;                         // difference in time between previous and next spawn
    
    constructor(time: number, timeDiffMin: number, timeDiffMax: number, gameScene: GameScene)
    {
        this._time = time;
        this._timeDiff = { min: timeDiffMin, max: timeDiffMax };
        
        this._gameScene = gameScene;

        this.generateRandomSpawnTime();
    }

    protected getNextSpawnTime():number { return this._nextSpawnTime; }
    
    protected generateRandomSpawnTime():void
    {
        var min = this._timeDiff.min,
            max = this._timeDiff.max;

        if (this._gameScene._gameSpeed > 5) {
            var mod = this._gameScene._gameSpeed / 5;

            min = min / mod;
            max = max / mod;
        }

        this._nextSpawnTime = getRandomInt(min, max);
    }
}

export default ObjectsMgr;