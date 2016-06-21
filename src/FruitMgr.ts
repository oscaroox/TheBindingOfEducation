import {fruitAmount} from './Defines'
import {getRandomInt} from './global'
import FruitGroup from './FruitGroup'

export default class FruitMgr
{
    private _fruitGroups: FruitGroup[];                 // save all fruit groups we are managing
    private _time: number;                              // time we last spawned a fruit group
    private _timeDiff: { min: number, max: number };   // min and max spawn times
    
    constructor()
    {
        this._fruitGroups = [];
        this._time = Date.now();
        this._timeDiff = { min: 1500, max: 2500 };
    }

    
    getFruitGroups():FruitGroup[] { return this._fruitGroups; }
    
    spawn():void
    {
        var curTime = Date.now(),
            diff    = curTime - this._time;

        // check if it is time to spawn a new group
        if (diff > this._timeDiff.min) {

            // get a random fruit and lane ID
            var randFruit = getRandomInt(1, fruitAmount),
                randLane  = getRandomInt(0, 2);

            var group = new FruitGroup(randFruit, randLane);
            this._fruitGroups.push(group);

            this._time = curTime;
        }
    }

    // remove groups from out fruits array if they have no more fruits in them
    remove(index):void
    {
        var length = this._fruitGroups.length - 1;

        // count down because we are removing array indexes while iterating through this array
        for(var i = length; i >= 0; i -= 1) {
            if(i === index) { this._fruitGroups.splice(i, 1); }
        }
    }
    
    updateGroups():void
    {
        var length = this._fruitGroups.length - 1;
        
        // count down because we are removing array indexes while iterating through this array
        for(var i = length; i >= 0; i -= 1) {
            var group = this._fruitGroups[i];
            
            // remove groups that have no more fruits in them
            if (group.getGroupSize() <= 0) {
                this.remove(i);
                continue;
            }

            group.update();
        }
    }

    update():void
    {
        this.spawn();
        this.updateGroups();
    }
}
