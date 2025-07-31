"use strict"
import Sprite from "./sprite.js";

class Text extends Sprite{
    constructor(cvs,x,y,layer){
        super(cvs,x,y);
        // this.canvas=cvs.canvas; //获取canvas环境
        // this.x=x; //获取坐标（x的定位由textAlign决定，y的定位由textBaseLine决定）
        // this.y=y;
        this.value="";
        this.layer=layer;
        cvs.addObjectNeedToDraw(layer,this.draw.bind(this));
        this.fontHeight=30;
        this.fillColor="red";
        // this.strokeColor="blue";
        this.lineWidth=2;
        this.textAlign="start";
        this.font="Arial";
    }
    draw(){
        this.canvasContext.globalAlpha=this.transparentAlpha;
        // 设置文本样式
        this.canvasContext.font=`${this.fontHeight}px ${this.font}`;          // 字体大小和类型
        this.canvasContext.fillStyle=this.fillColor;            // 填充颜色
        this.canvasContext.lineWidth=this.lineWidth;                // 描边宽度
        this.canvasContext.textAlign=this.textAlign;
        this.canvasContext.textBaseline="alphabetic";
        this.canvasContext.fillText(this.value,this.x,this.y);
        this.canvasContext.globalAlpha=1;
    }
    setFillColor(color){
        this.fillColor=color;
    }
    setLineWidth(width){
        this.lineWidth=width;
    }
    setTextAlign(align){
        this.textAlign=align;
    }
    setFontHeight(height){
        this.fontHeight=height;
    }
    setFont(font){
        this.font=font;
    }
    clear(){
        this.value="";
    }
    getWidth(){
        this.canvasContext.font=`${this.fontHeight}px ${this.font}`;          // 字体大小和类型
        this.canvasContext.fillStyle=this.fillColor;            // 填充颜色
        this.canvasContext.lineWidth=this.lineWidth;                // 描边宽度
        this.canvasContext.textAlign=this.textAlign;
        this.canvasContext.textBaseline="alphabetic";
        return this.canvasContext.measureText(this.value);
    }
}

export default Text;
