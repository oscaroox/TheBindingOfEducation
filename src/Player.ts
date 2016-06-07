import {
    canvas, ctx, Lane, Lane_Position, Cooking_Oil_State,
    DEBUG_SHOW_PLAYER_HITBOX, DEBUG_STROKE_WIDTH, DEBUG_COLOR, Powerup_Flags, DEBUG_SHOW_MAGNET_HITBOX
} from "./Defines";
import {isCollision} from './Globals'
import Unit from './Unit';
import GameScene from "./GameScene";

// PLAYER
// all updates and movement is done in this class
export default class Player extends Unit
{
    public _isInvulnerable: boolean;            // can player be hit by enemies or not
    public _isMounted: boolean;                 // is player on a vehicle
    
    private _gameScene: GameScene;
        
    private _animationStep: number;             // number of step the animation of the sprite is in
    private _spriteAnimations: number;          // max number of steps in an animation
    private _spriteWidth: number;               // how wide is a SINGLE sprite
    private _spriteHeight: number;              // how high is a SINGLE sprite
    private _spriteDrawTime: number;            // when we last drawn the animation
    private _spriteDrawTimeDiff: number;        // how often the animation should be redrawn
    private _spriteDeathOffsetY: number;        // Y offset in sprite image on death
    
    private _speedX: number;                    // speed on X-axis
    private _speedY: number;                    // speed on Y-axis
    
    private _timeHit: number;                   // time when we were hit by an object
    private _maxInvulnerableTimer: number;      // how long we can not be hit for
    private _tick: number;                      // ticker for cos function for opacity change when we are invulnerable
    private _tickStartValue: number;            // what value should the ticker start at
    
    private _powerupFlags: number;              // bitwise powerup flag holder

    // holds information about powerups the player has
    private _powerups: { duration: number, startTime: number, flag: Powerup_Flags }[];
    
    constructor(gameScene: GameScene)
    {
        var sprite = "images/character_walking_big.png",
            health = 2,
            x      = (canvas.width / 2),
            y      = canvas.height,
            lane   = Lane.LANE_MIDDLE;
        super(x, y, health, sprite, lane);
        
        this._isMounted = false;

        this._animationStep      = 0;
        this._spriteAnimations   = 1;
        this._spriteWidth        = 45;
        this._spriteHeight       = 72;
        this._spriteDrawTime     = Date.now();
        this._spriteDrawTimeDiff = 150;
        this._spriteDeathOffsetY = 0;

        this._speedY = 1;
        this._speedX = 8;

        this._maxInvulnerableTimer = 3000;  // 3 seconds
        this._isInvulnerable = false;
        this._tickStartValue = 30;
        this._tick = this._tickStartValue;

        this._powerupFlags = Powerup_Flags.FLAG_NONE;
        this._powerups = [];
        
        this._gameScene = gameScene;
    
        this.addEventHandlers();
        this.init();
    }
    
    public getPowerupFlags():Powerup_Flags { return this._powerupFlags; }
    
    public addPowerupFlag(flag: Powerup_Flags):boolean
    {
        if (this._powerupFlags & flag)
            return false;

        this._powerupFlags |= flag;
        
        this._gameScene.getPowerupIcons().updateFlags(flag);

        if (flag & Powerup_Flags.FLAG_DOUBLE_POINTS) console.log('double points');
        if (flag & Powerup_Flags.FLAG_INVULNERABLE) console.log('invul');
        if (flag & Powerup_Flags.FLAG_MAGNET) console.log('magnet');

        return true;
    }
    
    public removePowerupFlag(flag: Powerup_Flags):void { this._powerupFlags &= ~flag; }

    // refresh powerup timer
    private extendPowerup(flag: Powerup_Flags):void
    {
        for (var i = 0; i < this._powerups.length; i += 1) {
            var p = this._powerups[i];

            if (p.flag & flag) {
                p.startTime = Date.now();

                console.log('powerup extended');
            }
        }
    }
    
    
    
    public getHitbox():{ x1: number, y1: number, x2: number, y2: number }
    {
        var y2 = this.getPositionY() + this.getSprite().height;
        return {
            x1: this.getPositionX(),
            y1: y2 - this.getSprite().height * 0.3,
            x2: this.getPositionX() + this.getSprite().width / (this._spriteAnimations+1),
            y2: y2
        }
    }
    
    // initialize
    private init():void
    {
        // adjust position to middle
        var oil = this._gameScene.getCookingOil().getSprite(),
            x   = this.getPositionX() - this._spriteWidth / 2,
            y   = canvas.height - oil.height / 2 - this.getSprite().height * 1.5;

        this.setPosition(x, y);
        this.spawn();
    }

    // add event listeners
    private addEventHandlers():void
    {
        canvas.addEventListener('click', (e)=> { this.handleClick(e.clientX) });
        window.addEventListener('keydown', (e)=> { this.keyboardInput(e) });
        window.addEventListener('keyup', (e)=> {
            if (e.keyCode == 38 || e.keyCode == 87)
                this._gameScene._gameSpeed = 5;
        });
    }

    // what to do with certain keypresses
    private keyboardInput(event: KeyboardEvent):void
    {
        // up arrow and W key
        if (event.keyCode == 38 || event.keyCode == 87) {
            // go twice as fast
            this._gameScene._gameSpeed = 10;
        }

        // left arrow and A key
        if (event.keyCode == 37 || event.keyCode == 65) {
            if (this._curLane > Lane.LANE_LEFT) this._curLane -= 1;
        }

        // right arrow and D key
        if (event.keyCode == 39 || event.keyCode == 68) {
            if (this._curLane < Lane.LANE_RIGHT) this._curLane += 1;
        }
    }

    // what to do when screen is clicked
    private handleClick(clickX: number):void
    {
        if (clickX < canvas.width / 2) {
            if (this._curLane > Lane.LANE_LEFT) this._curLane -= 1;
        } else {
            if (this._curLane < Lane.LANE_RIGHT) this._curLane += 1;
        }
    }
    
    private powerup():void
    {
        // count down in case any powerup gets removed from array
        for (var i = this._powerups.length-1; i >= 0; i -= 1)
        {
            var power = this._powerups[i],
                flag  = power.flag;

            if (flag & Powerup_Flags.FLAG_MAGNET && this._powerupFlags & Powerup_Flags.FLAG_MAGNET) {
                this.magnet(i);
            }

            if (flag & Powerup_Flags.FLAG_INVULNERABLE && this._powerupFlags & Powerup_Flags.FLAG_INVULNERABLE) {
                this.invulnerability(i);
            }

            if (flag & Powerup_Flags.FLAG_DOUBLE_POINTS && this._powerupFlags & Powerup_Flags.FLAG_DOUBLE_POINTS) {
                this.doublePoints(i);
            }
        }

        // TEST
        // this.magnet(0);
    }

    public removePowerup(index: number):void
    {
        var length = this._powerups.length - 1;

        // count down because we are removing array indexes while iterating through this array
        for(var i = length; i >= 0; i -= 1) {
            if(i === index) this._powerups.splice(i, 1);
        }
    }
    
    private collisionCheck():void
    {
        var fruitsMgr   = this._gameScene.getFruitsMgr(),
            enemiesMgr  = this._gameScene.getEnemiesMgr(),
            powerupsMgr = this._gameScene.getPowerUpsMgr(),
            fruitGroups = fruitsMgr.getFruitGroups(),
            enemies     = enemiesMgr.getEnemySprites(),
            powerups    = powerupsMgr.getPowerupSprites(),
            hitbox      = this.getHitbox();
        
        // fruits
        for (var i = 0; i < fruitGroups.length; i += 1) 
        {
            var fruitGroup = fruitGroups[i];
            if (fruitGroup) {
                var fruits = fruitGroups[i].getFruitSprites();
                for (var j = fruits.length - 1; j >= 0; j -= 1) 
                {
                    var fruit = fruits[j];
                    if (fruit) {
                        var fx1 = fruit.getPositionX(),
                            fx2 = fruit.getPositionX() + fruit.getSprite().width,
                            fy1 = fruit.getPositionY(),
                            fy2 = fruit.getPositionY() + fruit.getSprite().height;

                        if (isCollision(hitbox.x1, hitbox.x2, hitbox.y1, hitbox.y2, fx1, fx2, fy1, fy2)) {
                            fruitGroups[i].collided(fruit.getId());
                        }
                    }
                }
            }
        }

        // enemies
        for (var i = 0; i < enemies.length; i += 1)
        {
            var enemy = enemies[i];
            if (enemy) {
                var ex1 = enemy.getPositionX(),
                    ex2 = enemy.getPositionX() + enemy.getSprite().width,
                    ey1 = enemy.getPositionY(),
                    ey2 = enemy.getPositionY() + enemy.getSprite().height;

                if (isCollision(hitbox.x1, hitbox.x2, hitbox.y1, hitbox.y2, ex1, ex2, ey1, ey2)) {
                    if (!this._isInvulnerable)
                        this.collidedWithEnemy();
                }
            }
        }
        
        //powerups
        for (var i = powerups.length-1; i >= 0; i -= 1)
        {
            var power = powerups[i];
            if (power) {
                var px1 = power.getPositionX(),
                    px2 = power.getPositionX() + power.getSprite().width,
                    py1 = power.getPositionY(),
                    py2 = power.getPositionY() + power.getSprite().height;

                if (isCollision(hitbox.x1, hitbox.x2, hitbox.y1, hitbox.y2, px1, px2, py1, py2)) {
                    powerupsMgr.collided(i);

                    // grab and add powerup flag to player
                    var flag = power.getFlag();
                    if (this.addPowerupFlag(flag)) {

                        // add powerup data (duration, startTime, etc) to player's powerup list
                        this._powerups.push(power.getData());
                    } else {
                        this.extendPowerup(flag);
                    }
                }
            }
        }
        
        // playfield objects
        var object = this._gameScene.getPlayfield().getPlayfieldObject();
        if (object != null) {
            var ox1 = object.getHitbox().x1,
                oy1 = object.getHitbox().y1,
                ox2 = object.getHitbox().x2,
                oy2 = object.getHitbox().y2;

            if (isCollision(hitbox.x1, hitbox.x2, hitbox.y1, hitbox.y2, ox1, ox2, oy1, oy2)) {
                this._isMounted = (object._isMountable) ? true : false;
            }
        }


        // edge of theme sprite
        var bg = this._gameScene.getPlayfield(),
            firstSpriteIndex = bg.getFirstThemeSprite();

        if (firstSpriteIndex != null) {
            var sprite = bg.getSprite(firstSpriteIndex),
                spritePos = bg.getPosition(firstSpriteIndex);

            // if player reaches edge of first theme sprite, player dies
            var edge = spritePos.y + (sprite.height - this.getSprite().height * 1.1);

            if (this.getPositionY() < edge) {
                if (!this._isMounted)
                    this.die();
            }
        }
    }

    private collidedWithEnemy():void
    {
        this.removeHealth(1);

        // GAME OVER
        if (this.getHealth() == 0) {
            this.die();

        // remove health
        } else {
            this._timeHit = Date.now();
            this._isInvulnerable = true;

            this.moveUp();
            this._gameScene.getCookingOil().setState(Cooking_Oil_State.STATE_HIGH);
        }
    }

    private move():void
    {
        var oilState = this._gameScene.getCookingOil().getState();

        if (oilState == Cooking_Oil_State.STATE_HIGH) {
            this.moveUp();
        } else {
            this.moveDown();
        }
    }

    private moveUp():void
    {
        var oil  = this._gameScene.getCookingOil(),
            endY = canvas.height - oil.getSprite().height - this.getSprite().height * 1.5;

        if (oil.getState() == Cooking_Oil_State.STATE_HIGH) {
            if (this.getPositionY() > endY) {
                var x = this.getPositionX(),
                    y = this.getPositionY() - this._speedY;

                this.setPosition(x, y);
            }
        }
    }

    private moveDown():void
    {
        var oil  = this._gameScene.getCookingOil(),
            endY = canvas.height - oil.getSprite().height / 2 - this.getSprite().height * 1.5;

        if (oil.getState() == Cooking_Oil_State.STATE_LOW) {
            if (this.getPositionY() < endY) {
                if (this.getHealth() != 2) this.setHealth(2);

                var x = this.getPositionX(),
                    y = this.getPositionY() + this._speedY;

                this.setPosition(x, y);
            }
        }
    }

    private animationMove():void
    {
                                                              // divide by half of spritesheet and half of sprite
        var goal = Math.floor(Lane_Position[this._curLane] - (this.getSprite().width / 2) / 2),
            x    = this.getPositionX(),
            y    = this.getPositionY();

        if (this.getPositionX() != goal) {
            if (this.getPositionX() >= goal) {
                // in case we over- or undershoot our goal
                if (this.getPositionX() - this._speedX < goal) {
                    x = goal;
                } else {
                    x = this.getPositionX() - this._speedX;
                }
            }
            
            if (this.getPositionX() <= goal) {
                // in case we over- or undershoot our goal
                if (this.getPositionX() + this._speedX > goal) {
                    x = goal;
                } else {
                    x = this.getPositionX() + this._speedX;
                }
            }
            
            this.setPosition(x, y);
        }
    }

    private invulnerable():void
    {
        if (this._powerupFlags & Powerup_Flags.FLAG_INVULNERABLE)
            return;

        var curTime = Date.now(),
            diff    = curTime - this._timeHit;

        if (diff > this._maxInvulnerableTimer) {
            this._isInvulnerable = false;
            this._tick = this._tickStartValue;
        }
    }

    protected drawBlinking():void
    {
        var alpha = 1 + Math.sin(this._tick / 10);
        this._tick += 1;

        ctx.save();
        ctx.globalAlpha = alpha;
        this.drawImage();
        ctx.restore();

        this.animateSprite();
        this.invulnerable();
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
        if (this._isMounted)
            return;
        
        var curTime = Date.now(),
            diff    = curTime - this._spriteDrawTime;

        if (diff > this._spriteDrawTimeDiff) {
            this._animationStep  = (this._animationStep < this._spriteAnimations) ? this._animationStep += 1 : 0;

            if (this._gameScene._gameSpeed > 5) {
                var mod = this._gameScene._gameSpeed / 5;
                
                this._spriteDrawTimeDiff = 150 / mod;
                this._spriteDrawTime = curTime;
            } else {
                this._spriteDrawTimeDiff = 150;
                this._spriteDrawTime = curTime;
            }
        }
    }

    // a bit different because it is a spritesheet
    // so we have to divide our sprite with by the amount of sprite animations it contains
    // to get a single sprite's width
    protected drawHitbox(x1?: number, y1?: number, width?: number, height?: number):void {
        ctx.beginPath();
        ctx.strokeStyle = DEBUG_COLOR;
        ctx.lineWidth = DEBUG_STROKE_WIDTH;

        if (arguments.length < 4) {
            var hitbox = this.getHitbox(),
                w = this.getSprite().width / (this._spriteAnimations + 1),
                h = this.getHitbox().y2 - this.getHitbox().y1;

            ctx.strokeRect(hitbox.x1, hitbox.y1, w, h);
        } else {
            var w = width,
                h = height;

            ctx.strokeRect(x1, y1, w, h);
        }

        ctx.closePath();
    }

    private magnet(index: number):void
    {
        // attraction stuff
        var radius = 120,
            radx1  = this.getHitbox().x1 - radius,
            radx2  = this.getHitbox().x2 + radius,
            rady1  = this.getHitbox().y1 - radius,
            rady2  = this.getHitbox().y2 + radius;

        var fruitgroups = this._gameScene.getFruitsMgr().getFruitGroups();
        for (var i = 0; i < fruitgroups.length; i += 1) {
            var group  = fruitgroups[i],
                fruits = group.getFruitSprites();

            for (var j = 0; j < fruits.length; j += 1) {
                var fruit = fruits[j],
                    fx1   = fruit.getHitbox().x1,
                    fx2   = fruit.getHitbox().x2,
                    fy1   = fruit.getHitbox().y1,
                    fy2   = fruit.getHitbox().y2;

                if (isCollision(radx1, radx2, rady1, rady2, fx1, fx2, fy1, fy2)) {
                    fruit.moveToPlayer(this);
                }
            }
        }

        // debug hitbox
        if (DEBUG_SHOW_MAGNET_HITBOX) {
            var width  = radx2 - radx1,
                height = rady2 - rady1;

            this.drawHitbox(radx1, rady1, width, height);
        }

        // powerup timing
        this.powerUpTimer(index);
    }
    
    private invulnerability(index: number):void
    {
        this._isInvulnerable = true;
        this.powerUpTimer(index);
    }

    // modifier is done at the collided function of GroupMgr
    // this function is just for the flag timer
    private doublePoints(index: number):void { this.powerUpTimer(index); }

    private powerUpTimer(index: number):void
    {
        var power     = this._powerups[index],
            startTime = power.startTime,
            duration  = power.duration,
            flag      = power.flag;

        var curTime = Date.now(),
            diff    = curTime - startTime;

        if (diff > duration) {
            if (flag & Powerup_Flags.FLAG_INVULNERABLE)
                this._isInvulnerable = false;

            this.removePowerupFlag(flag);
            this.removePowerup(index);
            this._gameScene.getPowerupIcons().removeFlag(index);
        }
    }

    public deathAnimation():void
    {
        ctx.globalAlpha = 1.0;
        ctx.drawImage(
            this.getSprite(),
            this._spriteWidth * this._animationStep,
            this._spriteDeathOffsetY,
            this._spriteWidth,
            this._spriteHeight,
            this.getPositionX(),
            this.getPositionY(),
            this._spriteWidth,
            this._spriteHeight
        );

        var curTime = Date.now(),
            diff    = curTime - this._spriteDrawTime;

        if (diff > this._spriteDrawTimeDiff) {
            this._spriteDeathOffsetY -= 10;
            this._spriteDrawTime = curTime;
        }
    }

    protected die():void
    {
        this._gameScene._gameOver = true;
        super.die();
    }

    // update everything that changed with our hero
    public update():void
    {
        if (this._gameScene._gameOver) {
            this.deathAnimation();
            return;
        }

        this.collisionCheck();
        this.move();
        this.animationMove();
        this.powerup();

        if (!this._isInvulnerable) {
            this.draw();
        } else {
            this.drawBlinking();
        }

        if (DEBUG_SHOW_PLAYER_HITBOX)
            this.drawHitbox();
    }
}
