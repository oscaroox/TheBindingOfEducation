import FruitMgr from "./FruitMgr";
import EnemiesMgr from "./EnemiesMgr";
import GameScore from './GameScore';
import CookingOil from "./CookingOil";
import Player from './Player';
import PowerupMgr from "./PowerupMgr";
import Playfield from "./Playfield";
import __Object from "./Object";
import {isCollision} from "./Globals";
import FloatingScoreMgr from "./FloatingScoreMgr";

export default class WorldMgr
{
    private _player: Player;                // keeps track of and controls the player character
    private _fruitsMgr: FruitMgr;           // keeps track of and spawns group of fruits
    private _enemiesMgr: EnemiesMgr;        // keeps track of and spawns enemies
    private _powerupsMgr: PowerupMgr;       // keeps track of and controls the powerup sprites (effects in player class)
    private _cookingOil: CookingOil;        // keeps track of and controls the oil on the bottom
    private _score: GameScore;              // keeps track of and controls the score
    private _playfield: Playfield;
    private _floatingScoreMgr: FloatingScoreMgr;
    
    constructor(player: Player, fruitsMgr: FruitMgr, enemiesMgr: EnemiesMgr, 
                powerupsMgr: PowerupMgr, floatingScoreMgr: FloatingScoreMgr, 
                cookingOil: CookingOil, score: GameScore, playfield: Playfield)
    {
        this._player      = player;
        this._fruitsMgr   = fruitsMgr;
        this._enemiesMgr  = enemiesMgr;
        this._powerupsMgr = powerupsMgr;
        this._cookingOil  = cookingOil;
        this._score       = score;
        this._playfield   = playfield;
        this._floatingScoreMgr = floatingScoreMgr;
    }
    
    public getPlayer():Player { return this._player; }
    
    public getCookingOil():CookingOil { return this._cookingOil; }
    
    public getFruitsMgr():FruitMgr { return this._fruitsMgr; }

    public getEnemiesMgr():EnemiesMgr { return this._enemiesMgr; }
    
    public getPowerUpsMgr():PowerupMgr { return this._powerupsMgr; }
    
    public getScore():GameScore { return this._score; }
    
    public getPlayfield():Playfield { return this._playfield; }
    
    public getFloatingScoreMgr():FloatingScoreMgr { return this._floatingScoreMgr; }


    // check collision against every object on the field
    public collisionCheck(object: __Object):boolean
    {
        var ax1       = object.getHitbox().x1,
            ax2       = object.getHitbox().x2,
            ay1       = object.getHitbox().y1,
            ay2       = object.getHitbox().y2,
            bx1,
            bx2,
            by1,
            by2;

        // fruit groups
        var groups = this._fruitsMgr.getFruitGroups();
        for(var i = 0; i < groups.length; i += 1) {
            var group  = groups[i];
            var fruits = group.getFruitSprites();

            // loop through collection of fruits from fruitGroups
            for(var j = 0; j < fruits.length; j += 1) {
                var fruit = fruits[j];

                // get fruit hitbox coordinates
                bx1 = fruit.getHitbox().x1;
                bx2 = fruit.getHitbox().x2;
                by1 = fruit.getHitbox().y1;
                by2 = fruit.getHitbox().y2;
                
                // check for collision
                if (isCollision(ax1, ax2, ay1, ay2, bx1, bx2, by1, by2)) {
                    console.log('spawn collision with fruit');
                    return true;
                }
            }
        }

        // enemies
        var enemies = this._enemiesMgr.getEnemySprites();
        for (var i = 0; i < enemies.length; i += 1) {
            var enemy = enemies[i];
            
            // get enemy hitbox coordinates
            bx1 = enemy.getHitbox().x1;
            bx2 = enemy.getHitbox().x2;
            by1 = enemy.getHitbox().y1;
            by2 = enemy.getHitbox().y2;

            // check for collision
            if (isCollision(ax1, ax2, ay1, ay2, bx1, bx2, by1, by2)) {
                console.log('spawn collision with enemy');
                return true;
            }
        }
        
        // powerups
        var powerups = this._powerupsMgr.getPowerupSprites();
        for (var i = 0; i < powerups.length; i += 1) {
            var power = powerups[i];
            
            // get powerup hitbox coordinates
            bx1 = power.getHitbox().x1;
            bx2 = power.getHitbox().x2;
            by1 = power.getHitbox().y1;
            by2 = power.getHitbox().y2;

            // check for collision
            if (isCollision(ax1, ax2, ay1, ay2, bx1, bx2, by1, by2)) {
                console.log('spawn collision with powerup');
                return true;
            }
        }

        // playfield objects (mounts)
        var mount = this._playfield.getPlayfieldObject();
        if (mount != null) {
            bx1 = mount.getHitbox().x1;
            bx2 = mount.getHitbox().x2;
            by1 = mount.getHitbox().y1 - mount.getSprite().height * 1.5;      // leave room for boat
            by2 = mount.getHitbox().y2 + mount.getSprite().height * 1.5;

            // check for collision
            if (isCollision(ax1, ax2, ay1, ay2, bx1, bx2, by1, by2)) {
                console.log('spawn collision with mount');
                return true;
            }
        }

        // found no collision!
        return false;
    }
}