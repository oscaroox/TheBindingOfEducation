import Object from "./Object";
import {Lane, BACKGROUND_SPEED, DEBUG_SHOW_MOUNT_HITBOX} from "./Defines";
import Playfield from "./Playfield";

export default class Mount extends Object
{
    public _isMountable: boolean;

    constructor(sprite: string, x: number, y: number, laneID: Lane)
    {
        super(x, y, sprite, laneID);

        this._isMountable = true;
        this.setInitPosition();
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
            var player = playfield.getWorldMgr().getPlayer(),
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
        if (playerIsMounted) {
            this.moveWithPlayer(playfield);
        } else {
            this.updatePosition(BACKGROUND_SPEED);
        }
        
        if (DEBUG_SHOW_MOUNT_HITBOX) this.drawHitbox();
        super.update();
    }
}