import Game from "./Game";

export default class ImageManager
{
    private _game: Game;
    private _images: string[];
    private _loaded: number;
    
    constructor(g: Game)
    {
        this._game = g;
        this._loaded = 0;

        this._images = [
            'images/apple.png',
            'images/banana.png',
            'images/bg_2_end_540_960.png',
            'images/bg_2_end_1080_1920.png',
            'images/bg_2_mid_540_960.png',
            'images/bg_2_mid_1080_1920.png',
            'images/bg_2_start_540_960.png',
            'images/bg_2_start_1080_1920.png',
            'images/bg_540_960.png',
            'images/bg_720_1280.png',
            'images/bg_1080_1920.png',
            'images/boat.png',
            'images/box.png',
            'images/character_walking.png',
            'images/character_walking_big.png',
            'images/cherry.png',
            'images/cookingoil.png',
            'images/doublePoints.png',
            'images/hamburger.png',
            'images/invulnerable.png',
            'images/lilypad.gif',
            'images/magnet.png',
            'images/pineapple.png',
            'images/pizza.png',
            'images/strawberry.png',
            'images/tangerine.png',
            'images/watermelon.png'
        ];

        this.loadImages();
    }

    private loadImages():void
    {
        let fn = this.imageLoaded.bind(this);

        for (var i = 0; i < this._images.length; i += 1) {
            var image = new Image();
            image.onload = fn;
            image.src = this._images[i];
        }
    }
    
    private imageLoaded():void
    {
        this._loaded += 1;
        console.log('image loaded');

        if(this._loaded == this._images.length) {
            console.log('starting game');
            this._game.startGame();
        }
    }
}