"use strict"

class Button extends Sprite{
    /*
    cvs：绘图canvas（准确来说是scene即场景，但是scene是封装了多场景功能后才有的概念，此对象仍将scene视作一个canvas）
    x：左上角x坐标
    y：左上角y坐标
    boxHeight：判定区域高度
    boxWidth：判定区域宽度
    layer：位于的图层（越大越靠前
    img_inital：初始样式
    img_onMouseOver：鼠标悬停或刚触摸过的的样式
    img_onClick：鼠标点击时或触摸时的样式
    buttonCallBack：按钮被点击后（鼠标松开或触摸结束后）调用的回调函数
    */
    constructor(cvs,x,y,boxHeight,boxWidth,layer,img_initial,img_onMouseOver,img_onClick,buttonCallBack){
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
        this.buttonCallBack=buttonCallBack; //设置按下按钮后调用的回调函数
        cvs.addObjectNeedToDraw(layer,this.draw.bind(this)) //向canvas进行注册
        this.draggable=false; //可否拖动
        this.clickable=true; //可否点击
        this.mouseDownRelativeX=undefined; //拖动时与鼠标的相对位置
        this.mouseDownRelativeY=undefined;
        // console.log(this.img_initial);
        // console.log(this.img_onMouseOver);
        // console.log(this.img_onClick);
    }
    draw(){
        this.canvasContext.globalAlpha=this.transparentAlpha;
        this.canvasContext.drawImage(this.getImg(),this.x,this.y);
        this.canvasContext.globalAlpha=1;
    }
    setDraggable(d){
        this.draggable=d;
    }
    setClickable(c){
        this.clickable=c;
    }
    // setTransparentAlpha(a){
    //     if (a>=0 && a<=1) this.transparentAlpha=a;
    // }
    mouseMoveCallBack(pos){ //处理鼠标移动事件
        // console.log(pos.x,pos.y,this.x,this.y,this.boxWidth,this.boxHeight);
        // console.log(pos.x>=this.x,pos.x<=this.x+this.boxWidth,pos.y>=this.y,pos.y<=this.y+this.boxHeight)
        if (this.status==2 && this.draggable){ //如果可拖动且目前为摁下状态，更新位置
            this.x=pos.x-this.mouseDownRelativeX;
            this.y=pos.y-this.mouseDownRelativeY;
            return true;
        }
        if (pos.x>=this.x && pos.x<=this.x+this.boxWidth &&
            pos.y>=this.y && pos.y<=this.y+this.boxHeight){ //判定点击是否在判定区内
            if (this.status!=2) this.status=1;
            return true;
        }
        this.status=0;
        return false;
    }
    mouseDownCallBack(pos){ //处理鼠标按下事件
        if (pos.x>=this.x && pos.x<=this.x+this.boxWidth &&
            pos.y>=this.y && pos.y<=this.y+this.boxHeight){ //判定点击是否在判定区内
            this.status=2;
            this.mouseDownRelativeX=pos.x-this.x; //被按下，设置按钮坐标和鼠标坐标的相对位置
            this.mouseDownRelativeY=pos.y-this.y;
            return true;
        }
        return false;
    }
    mouseUpCallBack(pos){ //处理鼠标松开事件
        // console.log("mouse up",pos);
        if (this.status!=2) return false;
        if (pos.x>=this.x && pos.x<=this.x+this.boxWidth &&
            pos.y>=this.y && pos.y<=this.y+this.boxHeight){ //判定点击是否在判定区内
            this.status=1;
            if (this.clickable) this.buttonCallBack();
            return true;
        }
        // this.status=0
        return false;
    }
    touchMoveCallBack(pos){ //处理触摸移动事件
        if (this.status==2 && this.draggable){ //如果可拖动且目前为摁下状态，更新位置
            this.x=pos.x-this.mouseDownRelativeX;
            this.y=pos.y-this.mouseDownRelativeY;
            return true;
        }
        if (pos.x>=this.x && pos.x<=this.x+this.boxWidth &&
            pos.y>=this.y && pos.y<=this.y+this.boxHeight){ //判定点击是否在判定区内
            this.status=2;
            return true;
        }
        this.status=0;
        return false;
    }
    touchStartCallBack(pos){ //处理触摸屏按下事件
        if (pos.x>=this.x && pos.x<=this.x+this.boxWidth &&
            pos.y>=this.y && pos.y<=this.y+this.boxHeight){ //判定点击是否在判定区内
            this.status=2;
            this.mouseDownRelativeX=pos.x-this.x; //被按下，设置按钮坐标和触摸位置坐标的相对位置
            this.mouseDownRelativeY=pos.y-this.y;
            return true;
        }
        return false;
    }
    touchEndCallBack(pos){ //处理触摸屏松开事件
        console.log(pos);
        if (this.status!=2) return false;
        if (pos.x>=this.x && pos.x<=this.x+this.boxWidth &&
            pos.y>=this.y && pos.y<=this.y+this.boxHeight){ //判定点击是否在判定区内
            this.status=0;
            if (this.clickable) this.buttonCallBack();
            return true;
        }
        // this.status=0;
        return false;
    }
    getImg(){
        if (!this.clickable) return this.img_initial;
        if (this.status==1) return this.img_onMouseOver;
        else if (this.status==2) return this.img_onClick;
        else return this.img_initial;
    }
}
