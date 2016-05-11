import * as d from './Defines';

// PLAYER
// all updates and movement is done in this class
export default class Player
{
    _x: number;
    _y: number;
    _health: number;
    _animation: number;

    // do not change
    private _sprite: string;


    constructor(pos_x: number, pos_y: number) {
        this._x = pos_x;
        this._y = pos_y;
        this._sprite = "player.png";
        this._health = 100;
        this._animation = d.Animation_State.Idle;
    }

    
    jump() {
        this._animation = d.Animation_State.Jump;     // change back to run state after jump animation

        // do some jump timing and positioning stuff
    }

    updateAnimation() {
        if (this._animation == d.Animation_State.Run) {
            // loop through run animation
        }

        if (this._animation == d.Animation_State.Jump) {
            // loop through jump animation
        }
    }

    updatePosition() {
        // update our _x and _y according to some button presses and super complicated formulas like
        // _x += 5

        // EXAMPLE
        // if user is touching screen we increase _x by 5
        if (d.Input_State.Touch || d.Input_State.Click) {
            this._x += 5;
        }
    }

    draw() {

    }

    update() {
        this.updateAnimation();
        this.updatePosition();

        // after updating everything we draw player sprite on screen with our new data
        this.draw();
    }
}