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
    private _clickedPosition: number;   // positie waar er is geklikt (waarde links of rechts)
    
    constructor() {

        var sprite = "images/player_50.png",
            health = 2;
        var x = d.canvas.width / 2;
        var y = d.canvas.height;

        super(x, y, health, sprite);

        this._curLane = d.Lane.LANE_MIDDLE;

        this._speedX = 5;

        this.addEventHandlers();
        this.init();
        this.spawn();
    }

    init():void
    {
        var x = this.getPositionX() - (this.getSprite().width / 2),
            y = this.getPositionY() - (this.getSprite().height * 1.5);

        this.setPosition(x, y);
    }
    //voeg een event toe aan click, geef door de x waarde van de muis
    // geeft door aan handleCLick

    addEventHandlers():void { d.canvas.addEventListener('click', (e)=> { this.handleClick(e.clientX) }); }

    // kijkt of de x kleiner dan de helft van canvas is
    handleClick(clickX: number): void
    {
        if (clickX < d.canvas.width / 2) {
            if (this._curLane > d.Lane.LANE_LEFT) this._curLane -= 1;

            this._clickedPosition = Click_Position.POS_LEFT;
        } else {
            if (this._curLane < d.Lane.LANE_RIGHT) this._curLane += 1;

            this._clickedPosition = Click_Position.POS_RIGHT;
        }
    }

    animationMove(): void
    {
        var goal = d.Lane_Position[this._curLane] - this.getSprite().width / 2;

        if (this.getPositionX() != goal) {
            if (this._clickedPosition == Click_Position.POS_LEFT)
                var x = this.getPositionX() - this._speedX;
            else
                var x = this.getPositionX() + this._speedX;

            var y = this.getPositionY();

            this.setPosition(x, y);
        }
    }

    // update everything that changed with our hero
    update():void
    {
        // after updating everything we redraw player sprite on screen with our new data
        super.update();

        this.animationMove();
    }
}
