import * as d from './Defines';
import Object from './Object';

abstract class Unit extends Object
{
    private _health: number;
    
    constructor(x: number, y: number, health: number, sprite: string)
    {
        super(x, y, sprite);
        
        this._health = health;
        this.spawn();
    }
}

export default Unit;
