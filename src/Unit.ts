import * as d from './Defines';
import Object from './Object';

abstract class Unit extends Object
{
    private _health: number;
    private _animation: number;
    
    constructor(x: number, y: number, health: number, sprite: string)
    {
        super(x, y, sprite);
        
        this._health = health;
        this._animation = d.Animation_State.Idle;
        this.spawn();
    }

    // get current animation
    getAnimationState():number { return this._animation; }

    // set animation state which will be used to determine the current or next animation cycle
    setAnimationState(input):void
    {
        // not moving
        if (input == d.Input_State.None) {
            this._animation = d.Animation_State.Idle;
        }

        // move
        if (input == d.Input_State.Touch || input == d.Input_State.Click) {
            this._animation = d.Animation_State.Run;
        }
    }

    // loop through animations (spritesheets)
    updateAnimation():void
    {
        // EXAMPLES
        if (this._animation == d.Animation_State.Run) {
        }

        if (this._animation == d.Animation_State.Jump) {
        }
    }
}

export default Unit;
