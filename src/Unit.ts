import Object from './Object';
import {BACKGROUND_SPEED} from "./Defines";

abstract class Unit extends Object
{
    private _health: number;
    
    constructor(x: number, y: number, health: number, sprite: string, lane: number)
    {
        super(x, y, sprite, lane);
        
        this._health = health;
        this.spawn();
    }
    
    public getHealth():number { return this._health; }
    
    protected removeHealth(amount):void { this._health -= amount; }
}

export default Unit;