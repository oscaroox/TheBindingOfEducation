// debug hitbox markers
export var 
    DEBUG_SHOW_PLAYER_HITBOX  = 0,
    DEBUG_SHOW_ENEMY_HITBOX   = 0,
    DEBUG_SHOW_FRUIT_HITBOX   = 0,
    DEBUG_SHOW_POWERUP_HITBOX = 0,
    DEBUG_SHOW_MAGNET_HITBOX  = 1,
    DEBUG_SHOW_MOUNT_HITBOX   = 1;

// debug marker styling
export var DEBUG_COLOR        = "#fb31fd",  // purple/pink
           DEBUG_STROKE_WIDTH = 3;

// canvas 
export var canvas = <HTMLCanvasElement> document.getElementById('canvas');
export var ctx: CanvasRenderingContext2D = canvas.getContext('2d');

// background Y speed
export var BACKGROUND_SPEED = 5;

// UNUSED
export enum Animation_State {
    ANIM_IDLE = 0,
    ANIM_RUN,
    ANIM_JUMP
}

// differentiate between left and right clicks
export enum Click_Position {
    POS_LEFT = 0,
    POS_RIGHT
}

// background theme/level ID
export enum Theme {
    THEME_FORREST = 0,
    THEME_RIVER
}

// Lane ID
export enum Lane {
    LANE_LEFT = 0,
    LANE_MIDDLE,
    LANE_RIGHT
}

// X-axis position of lanes which can be grabbed with a Lane ID
export var Lane_Position = [
    510,
    640,
    760
];

// amount of different enemies and enemy ID
export var enemiesAmount = 2;
export enum Enemies {
    ENEMY_HAMBURGER = 1,
    ENEMY_PIZZA
}

// amount of different fruits and fruit ID
export var fruitAmount = 2;
export enum Fruits {
    FRUIT_BANANA = 1,
    FRUIT_APPLE
}

export var powerupAmount = 3;
export enum Powerups {
    POWER_MAGNET = 1,
    POWER_INVULNERABLE,
    POWER_DOUBLE_POINTS
}

// danger level of oil
export enum Cooking_Oil_State {
    STATE_LOW = 0,
    STATE_HIGH
}

export enum Powerup_Flags {
    FLAG_NONE          = 0x0,
    FLAG_DOUBLE_POINTS = 0x1,
    FLAG_MAGNET        = 0x2,
    FLAG_INVULNERABLE  = 0x4
}