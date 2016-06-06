var i = 0,
    error = false;

var imagesArray = [
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
    'images/character_walking.png',
    'images/character_walking_big.png',
    'images/cherry.png',
    'images/cookingoil.png',
    'images/hamburger.png',
    'images/lilypad.gif',
    'images/pineapple.png',
    'images/pizza.png',
    'images/strawberry.png',
    'images/tangerine.png',
    'images/watermelon.png'
];

function increase():any { i += 1; }

function onError():any { error = true; }

function loadSprite(source):void
{
    var image = new Image();
    image.onload = increase();
    // image.onerror = onError();
    image.src = source;
}


export function loadImages():boolean
{
    var previ = -1;
    var escape = 0;
    while (i < imagesArray.length) {
        if (previ != i) {
            console.log('loading image "' + imagesArray[i] + '"...');
            loadSprite(imagesArray[i]);
        }

        // escaper
        if (escape > 500 || error) {
            console.error('could not load image: ' + imagesArray[i]);
            return false;
        }
        escape += 1;
    }
    
    return true;
}