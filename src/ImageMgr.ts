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
            'images/bg_0_start_540_960.png',
            'images/bg_0_mid_540_960.png',
            'images/bg_0_end_540_960.png',
            'images/bg_1_start_540_960.png',
            'images/bg_1_mid_540_960.png',
            'images/bg_1_end_540_960.png',
            'images/bg_2_start_540_960.png',
            'images/bg_2_mid_540_960.png',
            'images/bg_2_end_540_960.png',
            'images/bg_3_start_540_960.png',
            'images/bg_3_mid_540_960.png',
            'images/bg_3_end_540_960.png',
            'images/boat.png',
            'images/box.png',
            'images/character_walking.png',
            'images/character_walking_big.png',
            'images/cherry.png',
            'images/cookingoil_sprites.png',
            'images/Donut.png',
            'images/doublePoints.png',
            'images/hamburger.png',
            'images/hotdog.png',
            'images/invulnerable.png',
            'images/lilypad.gif',
            'images/magnet.png',
            'images/pannekoek.png',
            'images/pineapple.png',
            'images/pizza.png',
            'images/shark.png',
            'images/strawberry.png',
            'images/tangerine.png',
            'images/watermelon.png'
        ];
        
        this.loadImages();
    }

    private loadImages(): void
    {
        console.log('Loading images...');
        
        let fn = this.imageLoaded.bind(this);

        for (var i = 0; i < this._images.length; i += 1) {
            var image = new Image();
            image.onload = fn;
            image.src = this._images[i];
        }
    }

    private imageLoaded(): void
    {
        this._loaded += 1;

        if (this._loaded == this._images.length) {
            console.log('All images loaded.');
            // this._game.loadAudio();
            this._game.startGame();
        }
    }
}