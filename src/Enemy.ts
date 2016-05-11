// ENEMIES
// This class is labeled ABSTRACT which means it can only be extended from, and not be initiated
abstract class Enemy
{
    /// FIELDS (class variables)
    _x: number;
    _y: number;
    _health: number;
    _animation: number;

    // should never be changed (outside this class)
    private _sprite: string;


    /// CONSTRUCTOR (called when creating new class)
    constructor(pos_x: number, pos_y: number, s: string, hp: number) {
        this._x = pos_x;
        this._y = pos_y;
        this._sprite = s;
        this._health = hp;
        this._animation = 0;
    }

    /// METHODS (class functions)
    updateAnimation() {
    }

    // draw enemies on screen
    draw() {
    }

    // update sprite's animation / position
    update() {
    }
}

export default Enemy;