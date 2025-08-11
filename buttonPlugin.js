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

Button.prototype.isCoincide=function(anotherButton){
    if (this.x+this.boxX>=anotherButton.x+anotherButton.boxX+anotherButton.boxWidth) return false;
    if (this.y+this.boxY>=anotherButton.y+anotherButton.boxY+anotherButton.boxHeight) return false;
    if (this.x+this.boxX+this.boxWidth<=anotherButton.x+anotherButton.boxX) return false;
    if (this.y+this.boxY+this.boxHeight<=anotherButton.y+anotherButton.boxY) return false;
    return true;
}

Button.prototype.isPositionIn=function(pos){
    return pos.x>=this.x+this.boxX && pos.x<=this.x+this.boxX+this.boxWidth && pos.y>=this.y+this.boxY && pos.y<=this.y+this.boxY+this.boxHeight;
}

Button.prototype.setPosition_center=function(x,y){
    this.setPosition
}
