import WorldMgr from "./WorldMgr";
import {Theme, Lane_Position, BACKGROUND_SPEED, canvas} from "./Defines";
import __Object from "./Object";
import Unit from "./Unit";

export default class LilypadsMgr
{
    private _worldMgr: WorldMgr;
    private _lilypadSprites: Unit[] = [];

    constructor(worldMgr: WorldMgr)
    {
        this._worldMgr = worldMgr;
    }

    public spawnLilypads(object: __Object, type: string):void
    {
        var playfield         = this._worldMgr.getPlayfield(),
            playfieldSpritesY = playfield.getPositionYArray();

        for (var j = 0; j < playfieldSpritesY.length; j += 1) {
            var bg_top    = playfieldSpritesY[j],
                bg_theme  = playfield.getSpriteTheme(j),
                bg_bottom = bg_top + playfield.getSprite(j).height;

            if (bg_theme == Theme.THEME_RIVER)
            {
                if (object.getHitbox().y2 < bg_bottom &&     // bottom of fruit above bg bottom
                    object.getHitbox().y2 > bg_top)          // bottom of fruit lower than bg top
                {
                    var sprite = "images/lilypad.gif",
                        x      = object.getPositionX(),
                        y      = object.getPositionY(),
                        laneID = object.getCurLane();

                    var lilypad = new Unit(x, y, 0, sprite, laneID);

                    // center
                    switch(type) 
                    {
                        case "enemy":
                            x = Lane_Position[laneID] - lilypad.getSprite().width / 2;
                            y = lilypad.getPositionY() + lilypad.getSprite().height * 0.9;
                            break;

                        case "powerup":
                        case "fruit":
                            x = Lane_Position[laneID] - lilypad.getSprite().width / 2;
                            break;

                        default:
                            console.log("Error: lilypadsMgr spawnLilypads defaulted");
                    }
                    
                    lilypad.setPosition(x, y);
                    this._lilypadSprites.push(lilypad);
                }
            }
        }
    }

    private updatePosition():void
    {
        var removeLilypadsList: number[] = [];

        for (var i = 0; i < this._lilypadSprites.length; i += 1) {
            var lilypad = this._lilypadSprites[i];
            
            lilypad.updatePosition(BACKGROUND_SPEED);
            lilypad.update();

            if (lilypad.getHitbox().y1 > canvas.height) removeLilypadsList.push(i);
        }

        if (removeLilypadsList.length > 0) this.remove(removeLilypadsList);
    }

    private remove(indexList: number[])
    {
        for(var i = this._lilypadSprites.length - 1; i >= 0; i -= 1) {
            if(i === indexList[i]) {
                this._lilypadSprites.splice(i, 1);
            }
        }
    }

    public update():void
    {
        this.updatePosition();
    }
}