import FruitMgr from './FruitMgr';
import EnemiesMgr from './EnemiesMgr';

export default class WorldMgr
{
    public _fruitMgr: FruitMgr;
    public _enemiesMgr: EnemiesMgr;
    
    constructor(fruitMgr: FruitMgr, enemiesMgr: EnemiesMgr) 
    {
        this._fruitMgr = fruitMgr;
        this._enemiesMgr = enemiesMgr;
    }
}
