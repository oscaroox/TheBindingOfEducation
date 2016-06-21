export var canvas = <HTMLCanvasElement> document.getElementById('canvas');
export var ctx: CanvasRenderingContext2D = canvas.getContext('2d');

<<<<<<< HEAD
export var BACKGROUND_SPEED = 5; 
=======
export var BACKGROUND_SPEED = 5;
export var PLAYER_SPEED = 80;

>>>>>>> origin/master

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
<<<<<<< HEAD
    510,
    639,
    760
=======
    710,
    840,
    970
>>>>>>> origin/master
];

export var enemiesAmount = 2;
export enum Enemies {
    ENEMY_HAMBURGER = 1,
    ENEMY_PIZZA
}

<<<<<<< HEAD
export var fruitAmount = 2;
export enum Fruits {
    FRUIT_BANANA = 1,
    FRUIT_APPLE
}

// export var Fruits_Info = {
//     banana: {
//         points: 5,
//         sprite: 'images/banana.jpeg'
//     },
//   
//     apple: {
//         points: 10,
//         sprite: 'images/apple.jpg'
//     }
// };
=======
export var fruitAmount = 4;
export enum Fruits{
    FRUIT_BANANA = 1,
    FRUIT_APPLE,
    FRUIT_STRAWBERRY,
    FRUIT_WATERMELON
}
>>>>>>> origin/master
