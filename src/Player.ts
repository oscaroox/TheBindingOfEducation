import * as d from './Defines';
import Unit from './Unit';
import GameController from "./GameController";

// PLAYER
// all updates and movement is done in this class
export default class Player extends Unit
{
    private _gameController: GameController;

    constructor(x: number, y: number, gameController: GameController)
    {
        var sprite = "images/player.png",
            health = 2;
        
        super(x, y, health, sprite);

        this._gameController = gameController;
        this.spawn();
    }


    // update our hero's position to some x and y coordinate on the scene
    updatePosition():void
    {
        // EXAMPLE
        // if user is touching screen animation state is set to RUN
        // if our animation state is run then increase our x position by 5 pixels every update
        if (this.getAnimationState() == d.Animation_State.Run) {
            let x = this.getPositionX() + 5,
                y = this.getPositionY();
            this.setPosition(x, y);
        }
    }

    // update everything that changed with our hero
    // we get the input from GameScene, which gets it from the EventHandlers of GameController
    update():void
    {
        let inputState = this._gameController.getInputState();
        this.setAnimationState(inputState);
        this.updateAnimation();
        this.updatePosition();

        // after updating everything we redraw player sprite on screen with our new data
        super.update();
    }
}
