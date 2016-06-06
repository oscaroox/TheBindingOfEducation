import Object from "./Object";
import {Lane, DEBUG_SHOW_MOUNT_HITBOX} from "./Defines";
import Playfield from "./Playfield";
import GameScene from "./GameScene";

export default class Mount extends Object
{
    public _isMountable: boolean;       // determines if player and mount can connect
    private _gameScene: GameScene;

    constructor(sprite: string, x: number, y: number, laneID: Lane, gameScene: GameScene)
    {
        super(x, y, sprite, laneID);

        this._isMountable = true;
        this.setInitPosition();

        this._gameScene = gameScene;
    }

    protected setInitPosition():void
    {
        var x = this.getPositionX() - this.getSprite().width / 2,
            y = this.getPositionY();

        this.setPosition(x, y);
    }
    
    public moveWithPlayer(playfield: Playfield):void
    {
        if (this._isMountable) {
            var player = this._gameScene.getPlayer(),
                px = player.getPositionX(),
                py = player.getPositionY();

            this.setPosition(px, py);

            // check wether to release the boat or not
            var lastThemeSprite = playfield.getLastThemeSprite();
            if (lastThemeSprite != null) {
                var sy = playfield.getPosition(lastThemeSprite).y;

                // edge of theme sprite
                if (sy > this.getPositionY()) {
                    this._isMountable = false;
                    player._isMounted = false;
                }
            }
        }
    }
    
    public update(playerIsMounted: boolean, playfield?: Playfield):void
    {
        if (!this._gameScene._gameOver) {
            if (playerIsMounted) {
                this.moveWithPlayer(playfield);
            } else {
                this.updatePosition(this._gameScene._gameSpeed);
            }
        }

        if (DEBUG_SHOW_MOUNT_HITBOX)
            this.drawHitbox();

        super.update();
    }
}