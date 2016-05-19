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
        this._animation = d.Animation_State.ANIM_IDLE;
        this.spawn();
    }

    // get current animation
    getAnimationState():number { return this._animation; }

    // set animation state which will be used to determine the current or next animation cycle
    setAnimationState(input):void
    {
        // not moving
        if (input == d.Input_State.INPUT_NONE) {
            this._animation = d.Animation_State.ANIM_IDLE;
        }

        // move
        if (input == d.Input_State.INPUT_TOUCH || input == d.Input_State.INPUT_CLICK) {
            this._animation = d.Animation_State.ANIM_RUN;
        }
    }

    // loop through animations (spritesheets)
    updateAnimation():void
    {
        // EXAMPLES
        if (this._animation == d.Animation_State.ANIM_RUN) {
        }

        if (this._animation == d.Animation_State.ANIM_RUN) {
        }
    }
}

export default Unit;
