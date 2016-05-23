export var canvas = <HTMLCanvasElement> document.getElementById('canvas');
export var ctx: CanvasRenderingContext2D = canvas.getContext('2d');

export var BACKGROUND_SPEED = 5;

export enum Animation_State {
    ANIM_IDLE = 0,
    ANIM_RUN,
    ANIM_JUMP
}

export enum Click_Position {
    POS_LEFT = 0,
    POS_RIGHT
}

export enum Lane {
    LANE_LEFT = 0,
    LANE_MIDDLE,
    LANE_RIGHT
}

export var Lane_Position = [
    710,
    840,
    970
];

export var enemiesAmount = 2;
export enum Enemies {
    ENEMY_HAMBURGER = 1,
    ENEMY_PIZZA
}

export var fruitAmount = 2;
export enum Fruits{
    FRUIT_BANANA = 1,
    FRUIT_APPLE
}
