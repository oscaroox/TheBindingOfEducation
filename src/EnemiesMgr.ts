import Enemy from './Enemy';
import {canvas, enemiesAmount, Enemies, Lane_Position} from './Defines';
import Hamburger from './Hamburger';
import Pizza from './Pizza';
import {getRandomInt} from './global';

export default class EnemiesMgr
{
    private _enemies:Enemy[];
    private _time:number;
    private _timeDiff:{ min:number, max:number};

    constructor()
    {
        this._enemies = [];
        this._time = Date.now();
        this._timeDiff = {min: 2500, max: 5000};
    }
    
    updatePosition():void 
    {
        for (var i = 0; i < this._enemies.length; i += 1) {
            var e = this._enemies[i];
            
            e.update();
        }
    }
    

    spawn():void
    {
        var curTime = Date.now(),
            diff = curTime - this._time;

        if (diff > this._timeDiff.min) {
            var randEnemy = getRandomInt(1, enemiesAmount),
                randLane = getRandomInt(0, 2);

            switch(randEnemy)
            {
                case Enemies.ENEMY_HAMBURGER:
                    var e = new Hamburger(Lane_Position[randLane]);
                    break;

                case Enemies.ENEMY_PIZZA:
                    var e = new Pizza(Lane_Position[randLane]);
                    break;
                
                default:
                    console.log('ERROR: randEnemy defaulted');
            }
            
            this._enemies.push(e);
            
            this._time = curTime;

            console.log('enemy spawned');
        }
    }

    update():void
    {
        this.spawn();
        this.updatePosition();
    }
}
