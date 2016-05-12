export enum Animation_State {
    Idle,
    Run,
    Jump
}

export enum Input_State {
    None,
    Touch,
    Click
}

export var canvas = <HTMLCanvasElement> document.getElementById('canvas');
export var ctx: CanvasRenderingContext2D = canvas.getContext('2d');