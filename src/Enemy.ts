import Unit from './Unit';

abstract class Enemy extends Unit
{
    constructor(x: number, y: number, health: number, sprite: string, width: number, height: number, color: string)
    {
        super(x, y, health, sprite, width, height, color);
    }
}

export default Enemy;