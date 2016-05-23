import Unit from './Unit';

abstract class Enemy extends Unit
{
    constructor(x: number, y: number, health: number, sprite: string)
    {
        super(x, y, health, sprite);
    }

    updatePosition():void
    {

        var x = this.getPositionX(),
            y = this.getPositionY() ;
        this.setPosition(x, y);
    }

    update():void
    {
        super.update();

        this.updatePosition();
    }
}

export default Enemy;
