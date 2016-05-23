import * as d from './Defines'
import * as g from './global'
import Fruit from './Fruit'
import Apple from './Apple'
import Banana from './Banana'

export default class FruitGroup
{
    private _size: number;                              // max size of this group
    private _groupSizes: { min: number, max: number };  // min and max group size
    private _fruitID: number;                           // identifier of the fruit we have in this group
    private _fruits: Fruit[];                           // fruit array to hold our fruits
    private _lanePos: number;                           // what lane this group will travel along
    
    constructor(fruitID: number, lanePos: number)
    {
        this._fruits    = [];
        this._fruitID   = fruitID;
        this._groupSizes = { min: 2, max: 7 };
        this._lanePos   = d.Lane_Position[lanePos];

        this.generateSize();
        this.generateGroup();
    }
    
    getFruits():Fruit[] { return this._fruits; }
    
    getGroupSize():number { return this._fruits.length; }
    
    generateSize():void { this._size = g.getRandomInt(this._groupSizes.min, this._groupSizes.max); }
    
    generateGroup():void
    {
        for(var i = 0; i < this._size; i += 1) {
            var uniqueID = i;

            switch (this._fruitID)
            {
                case d.Fruits.FRUIT_APPLE:
                    var f = new Apple(uniqueID, this._lanePos);
                    break;

                case d.Fruits.FRUIT_BANANA:
                    var f = new Banana(uniqueID, this._lanePos);
                    break;

                default:
                    console.log('ERROR: generateGroup defaulted');
            }
            
            this._fruits.push(f);
        }
    }

    despawn(indexList:number[]):void
    {
        for(var i = this._fruits.length - 1; i >= 0; i -= 1) {
            if(i === indexList[i]) { this._fruits.splice(i, 1); }
        }
    }
    
    update():void
    {
        var removeFruitsList: number[] = [],
            length = this._fruits.length - 1;

        // render them last to first so depth is correct
        for(var i = length; i >= 0; i -= 1) {
            var f = this._fruits[i];
            
            f.update();
            
            // remove fruit from list if out of screen
            if (f.getPositionY() > d.canvas.height) {
                removeFruitsList.push(i);
            }
        }

        if (removeFruitsList.length > 0) { this.despawn(removeFruitsList); }
    }
}
