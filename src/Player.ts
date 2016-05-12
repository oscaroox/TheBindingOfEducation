import * as d from './Defines';

// PLAYER
// all updates and movement is done in this class
export default class Player
{
    private _x: number;
    private _y: number;
    private _health: number;
    private _animation: number;
    private _sprite: string;
    private _stage: CanvasRenderingContext2D;


    constructor(pos_x: number, pos_y: number, stage: CanvasRenderingContext2D) 
    {
        this._x = pos_x;
        this._y = pos_y;
        this._sprite = "player.png";
        this._health = 100;
        this._animation = d.Animation_State.Idle;
        this._stage = stage;

        this.draw();
    }


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

    updateAnimation():void
    {
        if (this._animation == d.Animation_State.Run) {
            // loop through run animation
        }

        if (this._animation == d.Animation_State.Jump) {
            // loop through jump animation
        }
    }

    updatePosition():void
    {
        // update our _x and _y according to some button presses and super complicated formulas like
        // _x += 5

        // EXAMPLE
        // if user is touching screen we increase _x by 5
        if (this._animation == d.Animation_State.Run) {
            this._x += 5;
        }
    }

    jump():void
    {
        this._animation = d.Animation_State.Jump;     // change back to run or idle state after jump animation

        // do some jump timing and positioning stuff
    }

    draw():void 
    {
        // temporarily renaming it because lazy
        var ctx = this._stage;

        // the process of drawing something in canvas
        ctx.beginPath();
        ctx.rect(this._x, this._y, 100, 100);           // x, y, width, height
        ctx.fillStyle = "rgba(255,244,84,1)";           // color
        ctx.fill();
        ctx.closePath();
    }

    update(input):void 
    {
        this.setAnimationState(input);
        this.updateAnimation();
        this.updatePosition();

        // after updating everything we redraw player sprite on screen with our new data
        this.draw();
    }
}