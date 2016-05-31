import {canvas, enemiesAmount, Enemies, Lane_Position, Theme, BACKGROUND_SPEED} from './Defines'
import {getRandomInt, isCollision} from './Globals'
import Enemy from './Enemy'
import Hamburger from './Hamburger'
import Pizza from './Pizza'
import ObjectsMgr from "./ObjectsMgr";
import LilypadsMgr from "./LilypadsMgr";

export default class EnemiesMgr extends ObjectsMgr
{
    private _enemySprites: Enemy[];
    private _lilypadsMgr: LilypadsMgr;
    
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

    private generatePositionY(enemy: Enemy):void
    {
        var fruitMgr = this.getWorldMgr().getFruitsMgr(),
            x1       = enemy.getPositionX(),
            x2       = enemy.getPositionX() + enemy.getSprite().width,
            y1       = enemy.getPositionY(),
            y2       = enemy.getPositionY() + enemy.getSprite().height,
            groups   = fruitMgr.getFruitGroups(),
            group,
            fruits,
            fruit,
            didCollide = false;

        // loop through collection of fruitGroups
        for(var i = 0; i < groups.length; i += 1) {
            group  = groups[i];
            fruits = group.getFruitSprites();

            // loop through collection of fruits from fruitGroups
            for(var j = 0; j < fruits.length; j += 1) {
                fruit = fruits[j];

                // get fruit coordinates
                var fruitX1 = fruit.getPositionX(),
                    fruitX2 = fruit.getPositionX() + fruit.getSprite().width,
                    fruitY1 = fruit.getPositionY(),
                    fruitY2 = fruit.getPositionY() + fruit.getSprite().height;


                // check for collision and adjust position accordingly
                if (isCollision(x1, x2, y1, y2, fruitX1, fruitX2, fruitY1, fruitY2)) {
                    didCollide = true;

                    // place both sprites on same Y level first
                    var newY = fruitY1;

                    // then place enemy sprite on top of fruit sprite
                    newY = Math.floor(newY - enemy.getSprite().height);

                    // set new position
                    enemy.setPosition(x1, newY);
                }
            }
        }

        // shift a lane left or right when we encounter another enemy
        var enemies = this._enemySprites;
        for (var i = 0; i < enemies.length; i += 1) {
            var e = enemies[i];
            var ex1 = e.getPositionX(),
                ex2 = e.getPositionX() + e.getSprite().width,
                ey1 = e.getPositionY(),
                ey2 = e.getPositionY() + e.getSprite().height;

            if (isCollision(x1, x2, y1, y2, ex1, ex2, ey1, ey2)) {
                didCollide = true;
                
                var newLane = (enemy.getCurLane() < 2) ? enemy.getCurLane() + 1 : enemy.getCurLane() - 1,
                    newX    = Math.floor(Lane_Position[newLane]) - enemy.getSprite().width / 2;

                enemy.setCurLane(newLane);
                enemy.setPosition(newX, enemy.getPositionY());
            }
        }

        // set enemy a bit further away from last fruit
        if (didCollide) {
            var x = enemy.getPositionX(),
                y = enemy.getPositionY() - enemy.getSprite().height * Math.random();

            enemy.setPosition(x, y);
        }
    }

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

            // checks if our initial Y position is within other objects
            // if so, change Y position
            this.generatePositionY(enemy);


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