import * as d from './Defines';
import Unit from './Unit';
import {Click_Position} from "./Defines";
import {PLAYER_SPEED} from "./Defines";
import {BACKGROUND_SPEED} from "./Defines";



// PLAYER
// all updates and movement is done in this class
export default class Player extends Unit
{
    private _curLane: number;           // slaat baan positie op (0, 1, 2)
    private _speedX: number;            // snelheid van X verandering
    private _spriteWidth: number;
    private _spriteHeight: number;
    private _spriteAnimations: number;
    private _spriteDrawTime: number;
    private _spriteDrawTimeDiff: number;
    private _animationStep: number;

    constructor() {

        var sprite = "images/character_walking_big.png",
            health = 2;
        var x = d.canvas.width / 2;
        var y = d.canvas.height;

        super(x, y, health, sprite);

        this._animationStep      = 0;
        this._spriteAnimations   = 1;
        this._spriteWidth        = 45;
        this._spriteHeight       = 72;
        this._spriteDrawTime     = Date.now();
        this._spriteDrawTimeDiff = 150;

        this._curLane = d.Lane.LANE_MIDDLE;

        this._speedX = 5;

        this.addEventHandlers();
        this.init();
    }

    init():void
    {
        var x = this.getPositionX() - (this.getSprite().width / 2),
            y = this.getPositionY() - (this.getSprite().height * 1.5);

        this.setPosition(x, y);
        this.spawn();
    }
    //voeg een event toe aan click, geef door de x waarde van de muis
    // geeft door aan handleCLick
    //
    addEventHandlers():void
    {
        d.canvas.addEventListener('click', (e)=> { this.handleClick(e.clientX) });
        window.addEventListener('keydown', (e)=> { this.keyboardInput(e) });
    }

    // kijkt of de x kleiner dan de helft van canvas is
    handleClick(clickX: number): void
    {
        if (clickX < d.canvas.width / 2) {
            if (this._curLane > d.Lane.LANE_LEFT) this._curLane -= 1;

        } else {
            if (this._curLane < d.Lane.LANE_RIGHT) this._curLane += 1;
        }
    }

    keyboardInput(event: KeyboardEvent) {
        // PRESS LEFT ARROW OR 'A' KEY
        if ( event.keyCode == 37 || event.keyCode == 65) {
            if (this._curLane > d.Lane.LANE_LEFT ){
                this._curLane -= 1;
            }
        }
        // PRESS RIGHT ARROW OR 'D' KEY
        else if (event.keyCode == 39 || event.keyCode == 68 ) {
            if (this._curLane < d.Lane.LANE_RIGHT) {
                this._curLane += 1;
            }
        }

    }


    animationMove(): void
    {
        var goal = Math.floor(d.Lane_Position[this._curLane] - (this.getSprite().width / 2) /  2),
            x    = this.getPositionX(),
            y    = this.getPositionY();

        if (this.getPositionX() != goal) {
            if (this.getPositionX() >= goal) {
                if (this.getPositionX() - this._speedX < goal) {
                    x = goal;
                } else {
                    x = this.getPositionX() - this._speedX;
                }
            }

            if (this.getPositionX() <= goal) {
                if (this.getPositionX() + this._speedX > goal) {
                    x = goal;
                } else {
                    x = this.getPositionX() + this._speedX;
                }
            }

            this.setPosition(x, y);
        }
    }

    private drawImage(rounds: number = 1):void
    {
        for (var i = 0; i < rounds; ++i) {
            d.ctx.drawImage(
                this.getSprite(),
                this._spriteWidth * this._animationStep,
                i,
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
            if (this._animationStep < this._spriteAnimations) {
                this._animationStep += 1;
            } else {
                this._animationStep = 0;
            }

            this._spriteDrawTime = curTime;
        }
    }

    protected draw():void
    {
        this.drawImage();
        this.animateSprite();
    }

    // update everything that changed with our hero
    update():void
    {
        this.draw();
        this.animationMove();

    }
}
