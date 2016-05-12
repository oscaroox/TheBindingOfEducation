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

    getInputState():number
    {
        return this._inputState;
    }
    

    // event listeners
    eventHandler():void
    {
        // save controller object
        // the next time 'this' is called ANYWHERE in this project, 'this' gets replaced.
        // We save 'this' into the variable 'that'
        // so the code references to the correct object in the future.
        // try changing that.setInput to this.setInput and look at the error in console.
        //// "When do you save this in that?"
        // If you get the 'undefined' error in the console you should try it first.
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