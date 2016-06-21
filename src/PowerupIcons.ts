import {Powerup_Flags, ctx} from "./Defines";
import GameScene from "./GameScene";

export default class PowerupIcons
{
    private _gameScene: GameScene;
    private _powerups: HTMLImageElement[];

    constructor(gameScene: GameScene)
    {
        this._gameScene = gameScene;
        this._powerups = [];
    }

    public removeFlag(index: number):void
    {
        var length = this._powerups.length - 1;

        for(var i = length; i >= 0; i -= 1) {
            if(i === index) this._powerups.splice(i, 1);
        }
    }

    public updateFlags(flag: Powerup_Flags):void
    {
        if (flag & Powerup_Flags.FLAG_DOUBLE_POINTS) {
            var image = new Image();
            image.src = "images/doublePoints.png";

            this._powerups.push(image);
        }

        if (flag & Powerup_Flags.FLAG_INVULNERABLE) {
            var image = new Image();
            image.src = "images/invulnerable.png";

            this._powerups.push(image);
        }

        if (flag & Powerup_Flags.FLAG_MAGNET) {
            var image = new Image();
            image.src = "images/magnet.png";

            this._powerups.push(image);
        }
    }

    public update():void
    {
        for (var i = 0; i < this._powerups.length; i += 1) {
            var sprite = this._powerups[i];

            var scorepos = this._gameScene.getScore().getPosition(),
                x = scorepos.x,
                y = scorepos.y + sprite.height * 0.3;

            // put below eachother
            if (i > 0) {
                var prevSprite = this._powerups[i-1];
                y += (prevSprite.height * 1.1) * i;
            }

            ctx.beginPath();
            ctx.drawImage(sprite, x, y);
            ctx.closePath();
        }
    }
}