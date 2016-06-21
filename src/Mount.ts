import Object from "./Object";
import {Lane, DEBUG_SHOW_MOUNT_HITBOX, ctx} from "./Defines";
import Playfield from "./Playfield";
import GameScene from "./GameScene";

export default class Mount extends Object
{
    public _isMountable: boolean;       // determines if player and mount can connect

    private _gameScene: GameScene;
    private _spriteDeathOffsetY: number;
    private _spriteDrawTime: number;
    private _spriteDrawTimeDiff: number;
    private _name: string;
    private _scale: number;

    constructor(name: string, sprite: string, x: number, y: number, laneID: Lane, gameScene: GameScene)
    {
        super(x, y, sprite, laneID);

        this._name = name;
        this._isMountable = true;
        this._spriteDeathOffsetY = 0;
        this._spriteDrawTime = Date.now();
        this._spriteDrawTimeDiff = 150;
        this._scale = 1.0;

        this._gameScene = gameScene;

        this.setInitPosition();
    }
    
    public getName():string { return this._name; }
    public setScale(scale: number) { this._scale = scale; }



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
                    player.setSprite(player.getSpawnSprite());
                }
            }
        }
    }

    private deathAnimation():void
    {
        ctx.drawImage(
            this.getSprite(),
            0,
            this._spriteDeathOffsetY,
            this.getSprite().width,
            this.getSprite().height,
            this.getPositionX(),
            this.getPositionY(),
            this.getSprite().width,
            this.getSprite().height
        );

        var curTime = Date.now(),
            diff    = curTime - this._spriteDrawTime;

        if (diff > this._spriteDrawTimeDiff) {
            this._spriteDeathOffsetY -= 15;
            this._spriteDrawTime = curTime;
        }
    }

    public draw():void
    {
        ctx.save();
        ctx.scale(this._scale, this._scale);
        ctx.drawImage(
            this.getSprite(),
            0,
            0,
            this.getSprite().width,
            this.getSprite().height,
            this.getPositionX(),
            this.getPositionY(),
            this.getSprite().width,
            this.getSprite().height
        );
        ctx.restore();
    }
    
    public update(playerIsMounted: boolean, playfield?: Playfield):void
    {
        if (!this._gameScene._gameOver) {
            if (playerIsMounted) {
                this.moveWithPlayer(playfield);
            } else {
                this.updatePosition(this._gameScene._gameSpeed);
            }
            
            this.draw();
        } else {
            if (this._gameScene.getPlayer()._isMounted)
                this.deathAnimation();
            else
                this.draw();
        }

        if (DEBUG_SHOW_MOUNT_HITBOX)
            this.drawHitbox();
    }
}