import {Cooking_Oil_State, canvas, Lane, ctx} from "./Defines";
import Object from './Object'

export default class CookingOil extends Object
{
    private _state: number;         // we can have a LOW and HIGH state
    private _speed: number;         // speed on Y-axis
    private _upTime: number;        // time it started going up
    private _maxTime: number;       // maximum time it can stay up

    private _animationStep: number;             // number of step the animation of the sprite is in
    private _spriteAnimations: number;          // max number of steps in an animation
    private _spriteWidth: number;               // how wide is a SINGLE sprite
    private _spriteHeight: number;              // how high is a SINGLE sprite
    private _spriteDrawTime: number;            // when we last drawn the animation
    private _spriteDrawTimeDiff: number;        // how often the animation should be redrawn

    constructor()
    {
        var x = canvas.width / 2,
            y = canvas.height,
            sprite = "images/cookingoil_sprites.png",
            curLane = Lane.LANE_MIDDLE;
        super(x, y, sprite, curLane);

        this._state = Cooking_Oil_State.STATE_LOW;  
        this._speed = 1;                            
        this._upTime  = Date.now();                 
        this._maxTime = 10000;                      // it stays 'up' 10 seconds

        this._animationStep      = 0;
        this._spriteAnimations   = 2;
        this._spriteWidth        = this.getSprite().width;
        this._spriteHeight       = this.getSprite().height / 3;
        this._spriteDrawTime     = Date.now();
        this._spriteDrawTimeDiff = 100;

        this.init();
    }

    public setState(state: Cooking_Oil_State):void 
    {
        if (state == Cooking_Oil_State.STATE_HIGH) 
            this._upTime = Date.now();
        
        this._state = state;
    }
    
    public getState():Cooking_Oil_State { return this._state; }

    private init():void
    {
        var x = this.getPositionX() - this.getSprite().width / 2,
            y = this.getPositionY() - this.getSprite().height / 6;

        this.setPosition(x, y);
    }

    private move():void
    {
        var curTime = Date.now(),
            diff    = curTime - this._upTime;
        
        if (Cooking_Oil_State.STATE_HIGH && diff > this._maxTime) 
            this._state = Cooking_Oil_State.STATE_LOW;
        
        if (this._state == Cooking_Oil_State.STATE_HIGH) {
            this.moveUp();
        } else {
            this.moveDown();
        }
    }

    private moveUp():void
    {
        var endY = canvas.height - this.getSprite().height / 3 + 5;

        if (this.getPositionY() > endY) {
            var x = this.getPositionX(),
                y = this.getPositionY() - this._speed;

            this.setPosition(x, y);
        }
    }

    private moveDown():void
    {
        var endY = canvas.height - this.getSprite().height / 6;

        if (this.getPositionY() < endY) {
            var x = this.getPositionX(),
                y = this.getPositionY() + this._speed;

            this.setPosition(x, y);
        }
    }

    protected draw():void
    {
        this.animateSprite();
        this.drawImage();
    }

    private drawImage(rounds:number = 1):void
    {
        for (var i = 0; i < rounds; ++i) {
            ctx.drawImage(
                this.getSprite(),
                0,
                this._spriteHeight * this._animationStep,
                this._spriteWidth,
                this._spriteHeight,
                this.getPositionX(),
                this.getPositionY(),
                this._spriteWidth,
                this._spriteHeight
            );
        }
    }

    private animateSprite():void
    {
        var curTime = Date.now(),
            diff    = curTime - this._spriteDrawTime;

        if (diff > this._spriteDrawTimeDiff) {
            this._animationStep = (this._animationStep < this._spriteAnimations) ? this._animationStep += 1 : 0;

            this._spriteDrawTime = Date.now();
        }
    }

    public update():void
    {
        this.draw();
        this.move();
    }
}