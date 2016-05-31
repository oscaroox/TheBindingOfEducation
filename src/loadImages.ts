var i = 0;

function increase():any { i += 1; }

function loadSprite(source):void
{
    var image = new Image();
    image.onload = increase();
    image.src = source;
}


export function loadImages(imagesArray: string[]):boolean
{
    var previ = -1;
    while (i < imagesArray.length) {
        if (previ != i) {
            console.log('loading image #' + imagesArray[i] + '...');
            loadSprite(imagesArray[i]);
        }
    }
    
    return true;
}