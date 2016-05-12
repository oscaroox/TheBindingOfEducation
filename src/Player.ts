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

    
    jump():void 
    {
        this._animation = d.Animation_State.Jump;     // change back to run state after jump animation

        // do some jump timing and positioning stuff
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

    updatePosition(input):void 
    {
        // update our _x and _y according to some button presses and super complicated formulas like
        // _x += 5

        // EXAMPLE
        // if user is touching screen we increase _x by 5
        if (input == d.Input_State.Touch || input == d.Input_State.Click) {
            this._x += 5;
        }
    }

    draw():void 
    {
        var ctx = this._stage;
        
        ctx.beginPath();
        ctx.rect(this._x, this._y, 100, 100);
        ctx.fillStyle = "rgba(255,244,84,1)";
        ctx.fill();
        ctx.closePath();
    }

    update(input):void 
    {
        this.updateAnimation();
        this.updatePosition(input);

        // after updating everything we draw player sprite on screen with our new data
        this.draw();
    }
}