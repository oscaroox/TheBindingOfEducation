import Enemy from './Enemy';

export default class Hamburger extends Enemy
{
    constructor(x, y) {
        super(x, y, "hamburger.png", 100);
    }
}