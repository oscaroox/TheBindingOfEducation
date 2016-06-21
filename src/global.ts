export function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (1 + max - min)) + min;
}

export function isCollision(ax1, ax2, ay1, ay2, bx1, bx2, by1, by2):boolean
{
    if ((ax1 >= bx1 && ax2 <= bx2)                  // fully inside
        ||  (ax1 <= bx1 && ax2 <= bx2 && ax2 >= bx1)    // right corner inside
        ||  (ax1 >= bx1 && ax2 >= bx2 && ax1 <= bx2)    // left corner inside
        ||  (ax1  < bx1 && ax2 >  bx2))                 // overlapping completely but on same Y position
    {
        if ((ay1 >= by1 && ay2 <= by2)                  // fully inside
            ||  (ay1 <= by1 && ay2 <= by2 && ay2 >= by1)    // top/bot corner inside
            ||  (ay1 >= by1 && ay2 >= by2 && ay1 <= by2)    // top/bot corner inside
            ||  (ay1 <  by1 && ay2 >  by2))                 // overlapping completely but MAYBE on same X position
        {
            return true;
        }
    }

    return false;
}
