"use strict"
import Sprite from "./sprite.js";
import Animation from "./animation.js";

class Button extends Sprite{
    constructor(cvs,x,y,boxWidth,boxHeight,layer,img_initial,img_onMouseOver,img_onClick,buttonDownCallBack,buttonUpCallBack,boxX=0,boxY=0){
        super(cvs,x,y); //获取所在位置的坐标
        // console.log(this.canvas);
        // this.transparentAlpha=1.0;
        this.setTransparentAlpha(1.0); //0=完全透明 1=完全不透明
        // this.x=x; 
        // this.y=y;
        this.boxHeight=boxHeight; //获取判定区域的大小
        this.boxWidth=boxWidth;
        this.layer=layer;
        this.img_initial=img_initial; //获取默认显示样式
        this.img_onMouseOver=img_onMouseOver; //获取鼠标悬停样式
        this.img_onClick=img_onClick; //获取鼠标点击样式
        cvs.addClickCallBack(
            this.mouseMoveCallBack.bind(this), //设置对鼠标移动的监听
            this.mouseDownCallBack.bind(this), //设置对鼠标按下的监听
            this.mouseUpCallBack.bind(this), //设置对鼠标松开的监听
            this.touchMoveCallBack.bind(this), //设置对触摸移动的监听
            this.touchStartCallBack.bind(this), //设置对触摸屏按下的监听
            this.touchEndCallBack.bind(this), //设置对触摸屏松开的监听
            layer
        );
        this.status=0; //0=inital 1=mouseOver 2=mouseDown
        this.buttonDownCallBack=buttonDownCallBack; //设置按下按钮时调用的回调函数
        this.buttonUpCallBack=buttonUpCallBack; //设置抬起按钮时调用的回调函数
        cvs.addObjectNeedToDraw(layer,this.draw.bind(this)) //向canvas进行注册
        this.draggable=false; //可否拖动
        this.clickable=true; //可否点击
        this.ignoreClickEvent=false; //是否忽略点击事件（不再会遮挡后方可触发点击事件的元素）
        this.mouseDownRelativeX=undefined; //拖动时与鼠标的相对位置
        this.mouseDownRelativeY=undefined;
        this.boxX=boxX;
        this.boxY=boxY;
        // console.log(this.img_initial);
        // console.log(this.img_onMouseOver);
        // console.log(this.img_onClick);
    }
    draw(){
        this.canvasContext.globalAlpha=this.transparentAlpha;
        this.canvasContext.drawImage(this.getImg(),this.x,this.y);
        // this.canvasContext.strokeStyle="black";
        // this.canvasContext.lineWidth=3;
        // this.canvasContext.strokeRect(this.x+this.boxX,this.y+this.boxY,this.boxWidth,this.boxHeight);
        this.canvasContext.globalAlpha=1;
    }
    setDraggable(d){
        this.draggable=d;
    }
    setClickable(c){
        this.clickable=c;
    }
    setIgnoreClickEven(i){
        this.ignoreClickEvent=i;
    }
    // setTransparentAlpha(a){
    //     if (a>=0 && a<=1) this.transparentAlpha=a;
    // }
    mouseMoveCallBack(pos){ //处理鼠标移动事件
        // console.log(pos.x,pos.y,this.x,this.y,this.boxWidth,this.boxHeight);
        // console.log(pos.x>=this.x,pos.x<=this.x+this.boxWidth,pos.y>=this.y,pos.y<=this.y+this.boxHeight)
        if (this.ignoreClickEvent) return false;
        if (this.status==2 && this.draggable){ //如果可拖动且目前为摁下状态，更新位置
            this.x=pos.x-this.mouseDownRelativeX;
            this.y=pos.y-this.mouseDownRelativeY;
            return true;
        }
        if (pos.x>=this.x+this.boxX && pos.x<=this.x+this.boxWidth+this.boxX &&
            pos.y>=this.y+this.boxY && pos.y<=this.y+this.boxHeight+this.boxY){ //判定点击是否在判定区内
            if (this.status!=2) this.status=1;
            return true;
        }
        this.status=0;
        return false;
    }
    mouseDownCallBack(pos){ //处理鼠标按下事件
        if (this.ignoreClickEvent) return false;
        if (pos.x>=this.x+this.boxX && pos.x<=this.x+this.boxWidth+this.boxX &&
            pos.y>=this.y+this.boxY && pos.y<=this.y+this.boxHeight+this.boxY){ //判定点击是否在判定区内
            this.status=2;
            this.mouseDownRelativeX=pos.x-this.x; //被按下，设置按钮坐标和鼠标坐标的相对位置
            this.mouseDownRelativeY=pos.y-this.y;
            if (this.clickable) this.buttonDownCallBack();
            return true;
        }
        return false;
    }
    mouseUpCallBack(pos){ //处理鼠标松开事件
        // console.log("mouse up",pos);
        if (this.ignoreClickEvent) return false;
        if (this.status!=2) return false;
        if (pos.x>=this.x+this.boxX && pos.x<=this.x+this.boxWidth+this.boxX &&
            pos.y>=this.y+this.boxY && pos.y<=this.y+this.boxHeight+this.boxY){ //判定点击是否在判定区内
            this.status=1;
            if (this.clickable) this.buttonUpCallBack();
            return true;
        }
        // this.status=0
        return false;
    }
    touchMoveCallBack(pos){ //处理触摸移动事件
        if (this.ignoreClickEvent) return false;
        if (this.status==2 && this.draggable){ //如果可拖动且目前为摁下状态，更新位置
            this.x=pos.x-this.mouseDownRelativeX;
            this.y=pos.y-this.mouseDownRelativeY;
            return true;
        }
        if (pos.x>=this.x+this.boxX && pos.x<=this.x+this.boxWidth+this.boxX &&
            pos.y>=this.y+this.boxY && pos.y<=this.y+this.boxHeight+this.boxY){ //判定点击是否在判定区内
            this.status=2;
            return true;
        }
        this.status=0;
        return false;
    }
    touchStartCallBack(pos){ //处理触摸屏按下事件
        if (this.ignoreClickEvent) return false;
        if (pos.x>=this.x+this.boxX && pos.x<=this.x+this.boxWidth+this.boxX &&
            pos.y>=this.y+this.boxY && pos.y<=this.y+this.boxHeight+this.boxY){ //判定点击是否在判定区内
            this.status=2;
            this.mouseDownRelativeX=pos.x-this.x; //被按下，设置按钮坐标和触摸位置坐标的相对位置
            this.mouseDownRelativeY=pos.y-this.y;
            if (this.clickable) this.buttonDownCallBack();
            return true;
        }
        return false;
    }
    touchEndCallBack(pos){ //处理触摸屏松开事件
        // console.log(pos);
        if (this.ignoreClickEvent) return false;
        if (this.status!=2) return false;
        if (pos.x>=this.x+this.boxX && pos.x<=this.x+this.boxWidth+this.boxX &&
            pos.y>=this.y+this.boxY && pos.y<=this.y+this.boxHeight+this.boxY){ //判定点击是否在判定区内
            this.status=0;
            if (this.clickable) this.buttonUpCallBack();
            return true;
        }
        // this.status=0;
        return false;
    }
    getImg(){
        var temp;
        if (!this.clickable) temp=this.img_initial;
        else if (this.status==1){
            if (this.img_onMouseOver==null) temp=this.img_initial;
            else temp=this.img_onMouseOver;
        }
        else if (this.status==2){
            if (this.img_onClick==null) temp=this.img_initial;
            else temp=this.img_onClick;
        }
        else temp=this.img_initial;
        if (temp instanceof HTMLImageElement) return temp;
        else if (temp instanceof Animation) return temp.image;
        else throw `unknown type of image`;
    }
}

export default Button;
