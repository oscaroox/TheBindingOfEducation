import * as d from './Defines';

// PLAYER
// all updates and movement is done in this class
export default class Player
{
    private _x: number;                         // x coordinate
    private _y: number;                         // y coordinate
    private _health: number;                    // health
    private _animation: number;                 // animation state
    private _sprite: string;                    // path to sprite(sheet) file
    private _stage: CanvasRenderingContext2D;   // canvas target of this page


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


    // __EXAMPLE METHODS__
    // IF YOU DON'T USE THEM JUST DELETE THEM

    // when enemy first enters the scene
    spawn():void
    {
    }

    // when enemy leaves the scene for whatever reason
    despawn():void
    {
    }
    
    // when our hero dies
    onDeath():void
    {
    }

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

    // update our hero's position to some x and y coordinate on the scene
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

    // function for some kind of jump animation
    jump():void
    {
        this._animation = d.Animation_State.Jump;     // change back to run or idle state after jump animation

        // do some jump timing and positioning stuff
    }

    // (re)draw our hero on the scene
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

    // update everything that changed with our hero
    // we get the input from GameScene, which gets it from the EventHandlers of GameController
    update(input):void 
    {
        this.setAnimationState(input);
        this.updateAnimation();
        this.updatePosition();

        // after updating everything we redraw player sprite on screen with our new data
        this.draw();
    }
}