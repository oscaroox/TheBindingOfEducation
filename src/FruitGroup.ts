import {Lane_Position, Fruits, canvas, FruitPoints} from "./Defines";
import {getRandomInt} from './Globals'
import Fruit from './Fruit'
import {Powerup_Flags} from "./Defines";
import LilypadsMgr from "./LilypadsMgr";
import GameScene from "./GameScene";

export default class FruitGroup
{
    private _size: number;                              // max size of this group
    private _groupSizes: { min: number, max: number };  // min and max group size
    private _fruitType: number;                         // identifier of the fruit we have in this group
    private _fruitSprites: Fruit[];                     // array to hold our fruits
    private _curLane: number;                           // identifier of our lane
    private _x: number;                                 // what X this group will travel along
    private _gameScene: GameScene;                      // holds all object managers
    private _lilypadsMgr: LilypadsMgr;                  // manages lilypads of our fruits
    
    constructor(fruitType: Fruits, lanePos: number, gameScene: GameScene)
    {
        this._fruitSprites   = [];
        this._fruitType      = fruitType;
        this._groupSizes     = { min: 5, max: 10 };
        this._curLane        = lanePos;
        this._x              = Lane_Position[lanePos];
        this._gameScene      = gameScene;
        this._lilypadsMgr    = new LilypadsMgr(this._gameScene);

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
                points   = FruitPoints[this._fruitType];

            switch (this._fruitType)
            {
                case Fruits.FRUIT_APPLE:
                    sprite = "images/apple.png";
                    break;

                case Fruits.FRUIT_BANANA:
                    sprite = "images/banana.png";
                    break;

                case Fruits.FRUIT_WATERMELON:
                    sprite = "images/watermelon.png";
                    break;
                
                case Fruits.FRUIT_TANGERINE:
                    sprite = "images/tangerine.png";
                    break;

                case Fruits.FRUIT_CHERRY:
                    sprite = "images/cherry.png";
                    break;

                case Fruits.FRUIT_PINEAPPLE:
                    sprite = "images/pineapple.png";
                    break;

                default:
                    console.log('ERROR: generateGroup defaulted');
            }

            var fruit = new Fruit(uniqueID, this._x, sprite, points, this._curLane, offSetY, this._gameScene);

            // check if it needs a lilypad
            this._lilypadsMgr.spawnLilypads(fruit, "fruit");
            
            // add fruit to array
            this._fruitSprites.push(fruit);
        }
    }

    private removeFromArray(array: any[], indexList: number[]):void
    {
        for(var i = array.length - 1; i >= 0; i -= 1) {
            if(i === indexList[i]) {
                array.splice(i, 1);
            }
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
        
        if (this._gameScene.getPlayer().getPowerupFlags() & Powerup_Flags.FLAG_DOUBLE_POINTS)
            mod = 2;

        // there is always a 0th fruit in the array and all fruits are the same in a group
        // so it's safe to grab points amount it like this
        // but not recommended
        var points = this._fruitSprites[0].getPoints() * mod;

        // update score with fruit points
        this._gameScene.getScore().updatePoints(points);
        
        // floating score
        var floatingPoints = this._gameScene.getFloatingScoreMgr();
        floatingPoints.addFloatingScore(FruitPoints[this._fruitType]);

        // remove from group and game
        this.removeSingleFruit(fruitID);
    }
    
    private updatePosition(isGameOver: boolean):void
    {
        var removeFruitsList: number[] = [];
        
        // render them last to first so depth is correct
        length = this._fruitSprites.length - 1;
        for (var i = length; i >= 0; i -= 1) {
            var f = this._fruitSprites[i];

            f.update(isGameOver, this._gameScene._gameSpeed);

            // remove fruit from list if out of screen
            if (f.getPositionY() > canvas.height) removeFruitsList.push(i);
        }

        if (removeFruitsList.length > 0) this.removeFromArray(this._fruitSprites, removeFruitsList);
    }
    
    public update(isGameOver: boolean):void
    {
        this._lilypadsMgr.update(isGameOver);
        this.updatePosition(isGameOver);
    }
}