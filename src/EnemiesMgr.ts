import {canvas, enemiesAmount, Enemies, Lane_Position} from './Defines'
import {getRandomInt, isCollision} from './global'
import Enemy from './Enemy'
import Hamburger from './Hamburger'
import Pizza from './Pizza'
import ObjectsMgr from './ObjectsMgr'

export default class EnemiesMgr
{
    private _enemies: Enemy[];
    private _time: number;
    private _timeDiff: { min: number, max: number };
    private _objectsMgr: ObjectsMgr;
    
    constructor()
    {
        this._enemies = [];
        this._time = Date.now();
        this._timeDiff = { min: 2500, max: 5000 };
    }

    addObjectsMgr(objectsMgr: ObjectsMgr):void { this._objectsMgr = objectsMgr; }

    updatePosition():void
    {
        var removeEnemiesList: number[] = [];

        for (var i = 0; i < this._enemies.length; i += 1) {
            var e = this._enemies[i];
            
            e.update();

            // add to our safe remove array
            if (e.getPositionY() > canvas.height) { removeEnemiesList.push(i) }
        }

        // safely remove enemy from our enemies array
        if (removeEnemiesList.length > 0) { this.despawn(removeEnemiesList); }
    }

    generatePositionY(enemy: Enemy):void
    {
        var fruitMgr = this._objectsMgr._fruitMgr,
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
            fruits = group.getFruits();

            // loop through collection of fruits from fruitGroups
            for(var j = 0; j < fruits.length; j += 1) {
                fruit = fruits[j];

                // get fruit coordinates
                var fruitY1 = Math.floor(fruit.getPositionY()),
                    fruitY2 = Math.floor(fruit.getPositionY() + fruit.getSprite().height),
                    fruitX1 = Math.floor(fruit.getPositionX()),
                    fruitX2 = Math.floor(fruit.getPositionX() + fruit.getSprite().width);

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

        // set enemy a bit further away from last fruit
        if (didCollide) {
            var x = enemy.getPositionX(),
                y = enemy.getPositionY() - enemy.getSprite().height * Math.random();

            enemy.setPosition(x, y);
        }
    }

    // add enemies to our game field every x seconds
    spawn():void
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
                    var e = new Hamburger(Lane_Position[randLane]);
                    break;

                case Enemies.ENEMY_PIZZA:
                    var e = new Pizza(Lane_Position[randLane]);
                    break;

                default:
                    console.log('ERROR: randEnemy defaulted');
            }

            // checks if our initial Y position is within other objects
            // if so, change Y position
            this.generatePositionY(e);
            this._enemies.push(e);
            
            this._time = curTime;
        }
    }

    // remove enemies from our array that are off screen
    despawn(indexList: number[]):void
    {
        for(var i = this._enemies.length - 1; i >= 0; i -= 1) {
            if(i === indexList[i]) { this._enemies.splice(i, 1); }
        }
    }

    update():void
    {
        this.spawn();
        this.updatePosition();
    }
}
