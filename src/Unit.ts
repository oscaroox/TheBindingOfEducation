import Object from './Object';

export default class Unit extends Object
{
    private _health: number;        // amount of time a unit can be hit before dying
    
    constructor(x: number, y: number, health: number, sprite: string, laneID: number)
    {
        super(x, y, sprite, laneID);
        
        this._health = health;
        this.spawn();
    }
    
    public getHealth():number { return this._health; }
    
    protected removeHealth(amount):void { this._health -= amount; }
    
    protected setHealth(amount):void { this._health = amount; }
}