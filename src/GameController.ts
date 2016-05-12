import * as d from './Defines';

//GAMECONTROLLER
//handles player input
export default class GameController
{
    private _inputState: number;
    
    constructor()
    {
        this._inputState = d.Input_State.None;

        // add event handlers
        this.eventHandler();
    }

    getInputState():number {
        return this._inputState;
    }
    

    // event listeners
    eventHandler():void
    {
        var that = this;

        // mouse button pressed down
        d.canvas.addEventListener('mousedown', function() {
            that.setInput(d.Input_State.Click);
        });

        // mouse button pressed down
        d.canvas.addEventListener('touch', function() {
            that.setInput(d.Input_State.Touch);
        });

        // mouse button released
        d.canvas.addEventListener('mouseup', function() {
            that.setInput(d.Input_State.None);
        });
    }
    
    setInput(input):void
    {
        this._inputState = input;
    }
}