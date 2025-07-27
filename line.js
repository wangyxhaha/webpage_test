"use strict"

import Sprite from "./sprite.js";

class Line extends Sprite{
    constructor(cvs,layer,x=0,y=0){
        super(cvs);
        this.layer=layer;
        this.transparentAlpha=0;
        this.startX=x; //分别是开始和结束的坐标
        this.startY=y;
        this.endX=x;
        this.endY=y;
        this.lineColor="black";
        this.lineWidth=5;
        cvs.addObjectNeedToDraw(layer,this.draw.bind(this));
    }
    draw(){
        this.canvasContext.globalAlpha=this.transparentAlpha;
        this.canvasContext.lineWidth=this.lineWidth;
        this.canvasContext.strokeStyle=this.lineColor;
        this.canvasContext.lineCap="round";
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(this.startX,this.startY);
        this.canvasContext.lineTo(this.endX,this.endY);
        // this.canvasContext.arc(this.endX,this.endY,5,0,Math.PI*2);
        this.canvasContext.stroke();
        this.canvasContext.closePath();
        this.canvasContext.globalAlpha=1;
    }
    setStart(x,y){
        this.startX=x;
        this.startY=y;
    }
    setEnd(x,y){
        this.endX=x;
        this.endY=y;
    }
}

export default Line;
