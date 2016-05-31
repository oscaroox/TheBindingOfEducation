import FruitMgr from "./FruitMgr";
import EnemiesMgr from "./EnemiesMgr";
import GameScore from './GameScore';
import CookingOil from "./CookingOil";
import Player from './Player';
import PowerupMgr from "./PowerupMgr";
import Playfield from "./Playfield";

export default class WorldMgr
{
    private _player: Player;
    private _fruitsMgr: FruitMgr;
    private _enemiesMgr: EnemiesMgr;
    private _powerupsMgr: PowerupMgr;
    private _cookingOil: CookingOil;
    private _score: GameScore;
    private _playfield: Playfield;
    
    constructor(player: Player, fruitsMgr: FruitMgr, enemiesMgr: EnemiesMgr, 
                powerupsMgr: PowerupMgr, cookingOil: CookingOil, score: GameScore,
                playfield: Playfield)
    {
        this._player      = player;
        this._fruitsMgr   = fruitsMgr;
        this._enemiesMgr  = enemiesMgr;
        this._powerupsMgr = powerupsMgr;
        this._cookingOil  = cookingOil;
        this._score       = score;
        this._playfield   = playfield;
    }
    
    public getPlayer():Player { return this._player; }
    
    public getCookingOil():CookingOil { return this._cookingOil; }
    
    public getFruitsMgr():FruitMgr { return this._fruitsMgr; }

    public getEnemiesMgr():EnemiesMgr { return this._enemiesMgr; }
    
    public getPowerUpsMgr():PowerupMgr { return this._powerupsMgr; }
    
    public getScore():GameScore { return this._score; }
    
    public getPlayfield():Playfield { return this._playfield; }
}