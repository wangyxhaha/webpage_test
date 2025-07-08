"use strict"

import Button from "./button.js"

Button.prototype.stayIn=function(){
    if (this.x+this.boxX<0) this.x=-this.boxX;
    else if (this.x+this.boxX+this.boxWidth>this.canvas.width)
        this.x=this.canvas.width-this.boxX-this.boxWidth;
    if (this.y+this.boxY<0) this.y=-this.boxY;
    else if (this.y+this.boxY+this.boxHeight>this.canvas.height)
        this.y=this.canvas.height-this.boxY-this.boxHeight;
    
}
