import * as d from './Defines';
import Unit from './Unit';
import {Click_Position} from "./Defines";


// PLAYER
// all updates and movement is done in this class
export default class Player extends Unit
{
    private _curLane: number ;

    constructor() {

        var sprite = "images/player_50.png",
            health = 2;
        var x = d.canvas.width / 2;
        var y = d.canvas.height;

        super(x, y, health, sprite);

        this._curLane = d.Lane.LANE_MIDDLE;

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
    handleClick(x): void
    {
        if (x < d.canvas.width / 2) {
            this.updatePosition(d.Click_Position.POS_LEFT);
        } else {
            this.updatePosition(d.Click_Position.POS_RIGHT);
        }
    }

    // update our hero's position to some x and y coordinate on the scene
    updatePosition(clickPosition: number):void
    {
        if (clickPosition == Click_Position.POS_LEFT) {
            if (this._curLane > d.Lane.LANE_LEFT) this._curLane -= 1;
        } else {
            if (this._curLane < d.Lane.LANE_RIGHT) this._curLane += 1;
        }

        var x = d.Lane_Position[this._curLane] - this.getSprite().width / 2,
            y = this.getPositionY();

        this.setPosition(x, y);

    }

    // update everything that changed with our hero
    update():void
    {
        // after updating everything we redraw player sprite on screen with our new data
        super.update();
    }
}
