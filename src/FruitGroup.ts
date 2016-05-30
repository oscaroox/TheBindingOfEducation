import {BACKGROUND_SPEED, Lane_Position, Fruits, canvas} from "./Defines";
import {getRandomInt, isCollision} from './Globals'
import Fruit from './Fruit'
import {Powerup_Flags} from "./Defines";
import WorldMgr from "./WorldMgr";

export default class FruitGroup
{
    private _size: number;                              // max size of this group
    private _groupSizes: { min: number, max: number };  // min and max group size
    private _fruitID: number;                           // identifier of the fruit we have in this group
    private _fruitSprites: Fruit[];                     // fruit array to hold our fruits
    private _curLane: number;                           // identifier of our lane
    private _x: number;                                 // what X this group will travel along
    private _worldMgr: WorldMgr;                        // holds all object managers
    
    constructor(fruitID: number, lanePos: number, worldMgr: WorldMgr)
    {
        this._fruitSprites = [];
        this._fruitID      = fruitID;
        this._groupSizes   = { min: 5, max: 10 };
        this._curLane      = lanePos;
        this._x            = Lane_Position[lanePos];
        this._worldMgr     = worldMgr;

        this.generateSize();
        this.generateGroup();
    }
    
    public getCurLane():number { return this._curLane; }
    
    public getFruitSprites():Fruit[] { return this._fruitSprites; }
    
    public getGroupSize():number { return this._fruitSprites.length; }
    
    private generateSize():void { this._size = getRandomInt(this._groupSizes.min, this._groupSizes.max); }
    
    private generateGroup():void
    {
        var offSetY = 0;
        
        for(var i = 0; i < this._size; i += 1) {
            // properties of fruit
            var uniqueID = i,
                sprite   = "",
                points   = 0,
                speed    = BACKGROUND_SPEED;

            switch (this._fruitID)
            {
                case Fruits.FRUIT_APPLE:
                    sprite = "images/apple.png";
                    points = 10;
                    speed  = BACKGROUND_SPEED;
                    break;

                case Fruits.FRUIT_BANANA:
                    sprite = "images/banana.png";
                    points = 15;
                    speed  = BACKGROUND_SPEED;
                    break;

                default:
                    console.log('ERROR: generateGroup defaulted');
            }

            var fruit = new Fruit(uniqueID, this._x, sprite, points, speed, this._curLane, offSetY);

            // this.generatePositionY(fruit);
            // offSetY = this.generatePositionY(fruit);
            this._fruitSprites.push(fruit);
        }
    }

    private generatePositionY(fruit: Fruit):number
    {
        var enemyMgr   = this._worldMgr.getEnemiesMgr(),
            enemies    = enemyMgr.getEnemySprites(),
            newY       = 0;

        // loop through collection of fruitGroups
        for(var i = 0; i < enemies.length; i += 1) {
            var enemy = enemies[i];

            // skip enemies not in our lane
            if (enemy.getCurLane() != this._curLane)
                continue;

            // get enemy's coordinates
            var x1    = enemy.getPositionX(),
                x2    = enemy.getPositionX() + enemy.getSprite().width,
                y1    = enemy.getPositionY(),
                y2    = enemy.getPositionY() + enemy.getSprite().height;

            // get fruit coordinates
            var fruitY1 = Math.floor(fruit.getPositionY()),
                fruitY2 = Math.floor(fruit.getPositionY() + fruit.getSprite().height),
                fruitX1 = Math.floor(fruit.getPositionX()),
                fruitX2 = Math.floor(fruit.getPositionX() + fruit.getSprite().width);

            // check for collision and adjust position accordingly
            if (isCollision(x1, x2, y1, y2, fruitX1, fruitX2, fruitY1, fruitY2)) {
                // set new position starting from enemy's Y position
                newY = Math.floor(enemy.getPositionY() - Math.random() * (fruit.getSprite().height * 2));

                // set new position
                fruit.setPosition(fruit.getPositionX(), newY);

                console.log('spawn collision for fruitgroup! new Y set.');
            }
        }
        
        return newY;
    }

    private remove(indexList:number[]):void
    {
        for(var i = this._fruitSprites.length - 1; i >= 0; i -= 1) {
            if(i === indexList[i]) { this._fruitSprites.splice(i, 1); }
        }
    }

    private removeSingleFruit(index:number):void
    {
        for(var i = this._fruitSprites.length - 1; i >= 0; i -= 1) {
            var fruit = this._fruitSprites[i],
                id    = fruit.getId();

            if(index === id) { this._fruitSprites.splice(i, 1); }
        }
    }

    public collided(fruitID: number):void
    {
        var mod = 1;
        
        if (this._worldMgr.getPlayer().getPowerupFlags() & Powerup_Flags.FLAG_DOUBLE_POINTS)
            mod = 2;

        // there is always a 0th fruit in the array and all fruits are the same in a group
        // so it's safe to grab points amount it like this
        // but not recommended
        var points = this._fruitSprites[0].getPoints() * mod;

        // update score with fruit points
        this._worldMgr.getScore().updatePoints(points);

        // remove from group and game
        this.removeSingleFruit(fruitID);
    }
    
    public update():void
    {
        var removeFruitsList: number[] = [],
            length = this._fruitSprites.length - 1;

        // render them last to first so depth is correct
        for(var i = length; i >= 0; i -= 1) {
            var f = this._fruitSprites[i];
            
            f.update();
            
            // remove fruit from list if out of screen
            if (f.getPositionY() > canvas.height) {
                removeFruitsList.push(i);
            }
        }

        if (removeFruitsList.length > 0) { this.remove(removeFruitsList); }
    }
}