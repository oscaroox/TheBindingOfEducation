export var canvas = <HTMLCanvasElement> document.getElementById('canvas');
export var ctx: CanvasRenderingContext2D = canvas.getContext('2d');

export enum Animation_State {
    ANIM_IDLE,
    ANIM_RUN,
    ANIM_JUMP
}

export enum Input_State {
    INPUT_NONE,
    INPUT_TOUCH,
    INPUT_CLICK
}

export enum Click_Position {
    POS_LEFT,
    POS_RIGHT
}

export enum Lane {
    LANE_LEFT = 0,
    LANE_MIDDLE,
    LANE_RIGHT
}

export var Lane_Position = [
    494,
    617,
    744
];