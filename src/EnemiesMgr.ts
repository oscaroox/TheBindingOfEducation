import {canvas, enemiesAmount, Enemies, Lane_Position} from './Defines'
import {getRandomInt} from './Globals'
import Enemy from './Enemy'
import Hamburger from './Hamburger'
import Pizza from './Pizza'
import ObjectsMgr from "./ObjectsMgr";
import LilypadsMgr from "./LilypadsMgr";

export default class EnemiesMgr extends ObjectsMgr
{
    private _enemySprites: Enemy[];         // save all powerups we are keeping track of
    private _lilypadsMgr: LilypadsMgr;      // keeps track of and controls lilypads
    
    constructor()
    {
        var time = Date.now(),
            timeDiffMin = 750,
            timeDiffMax = 1500;
        super(time, timeDiffMin, timeDiffMax);
        
        this._enemySprites = [];
        
        this._lilypadsMgr = null;
    }
    
    public getEnemySprites():Enemy[] { return this._enemySprites; }

    // add enemies to our game field every x seconds
    private spawn():void
    {
        var curTime = Date.now(),
            diff    = curTime - this._time;

        if (diff > this._timeDiff.min) {
            // get a random enemy and lane ID
            var randEnemy = getRandomInt(1, enemiesAmount),
                randLane  = getRandomInt(0, 2);
            
            switch(randEnemy)
            {
                case Enemies.ENEMY_HAMBURGER:
                    var enemy = new Hamburger(Lane_Position[randLane], randLane);
                    break;

                case Enemies.ENEMY_PIZZA:
                    var enemy = new Pizza(Lane_Position[randLane], randLane);
                    break;

                default:
                    console.log('ERROR: randEnemy defaulted');
            }

            // check if we are not colliding with anything, delay spawning otherwise
            if (!this.getWorldMgr().collisionCheck(enemy)) {

                // check if it needs a lilypad
                if (this._lilypadsMgr == null)
                    this._lilypadsMgr = new LilypadsMgr(this.getWorldMgr());

                this._lilypadsMgr.spawnLilypads(enemy, "enemy");

                // add new enemy to our array
                this._enemySprites.push(enemy);

                // new time for next spawn
                this.generateRandomSpawnTime();
                this._time = curTime;
            }
        }
    }

    public updatePosition():void
    {
        var removeEnemiesList: number[] = [];

        for (var i = 0; i < this._enemySprites.length; i += 1) {
            var e = this._enemySprites[i];

            // update each enemy on screen
            e.update();

            // add to our safe remove array
            if (e.getPositionY() > canvas.height) removeEnemiesList.push(i);
        }

        // safely remove enemy from our enemies array
        if (removeEnemiesList.length > 0) this.removeFromArray(this._enemySprites, removeEnemiesList);
    }

    // remove enemies from our array that are off screen
    private removeFromArray(array: any[], indexList: number[]):void
    {
        for(var i = array.length - 1; i >= 0; i -= 1) {
            if(i === indexList[i]) array.splice(i, 1);
        }
    }

    public update():void
    {
        this.spawn();

        if (this._lilypadsMgr)
            this._lilypadsMgr.update();
        
        this.updatePosition();
    }
}