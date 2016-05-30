export function getRandomInt(min:number , max:number):number 
{
    return Math.floor(Math.random() * (1 + max - min)) + min;
}

export function isCollision(ax1, ax2, ay1, ay2, bx1, bx2, by1, by2):boolean
{
    return  ax1 < bx2 &&
            ax2 > bx1 &&
            ay1 < by2 &&
            ay2 > by1;
}

export function splice(index, remove, string1, string2):string
{
    return string1.slice(0, index) + string2 + string1.slice(index + Math.abs(remove));
}