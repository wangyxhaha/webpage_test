"use strict"

// function calculateTruePosition(canvas,evt){
//     //计算canvas内真实点击坐标
//     var trueX=evt.clientX;
//     var trueY=evt.clientY;
//     var rect=canvas.getBoundingClientRect();
//     trueX-=rect.left;
//     trueY-=rect.top;
//     return {x:trueX,y:trueY};
// }

class Button{
    constructor(cvs,x,y,boxHeight,boxWidth,layer,img_initial,img_onMouseOver,img_onClick,buttonCallBack){
        this.canvas=cvs.canvas; //获取所在的canvas
        // console.log(this.canvas);
        this.canvasContext=cvs.canvasContext; //获取所在canvas的绘图上下文
        this.x=x; //获取所在位置的坐标
        this.y=y;
        this.boxHeight=boxHeight; //获取判定区域的大小
        this.boxWidth=boxWidth;
        this.img_initial=img_initial; //获取默认显示样式
        this.img_onMouseOver=img_onMouseOver; //获取鼠标悬停样式
        this.img_onClick=img_onClick; //获取鼠标点击样式
        // this.canvas.addEventListener("mousemove",this.mouseMoveCallBack.bind(this)) //设置对鼠标移动的监听
        // this.canvas.addEventListener("mousedown",this.mouseDownCallBack.bind(this)) //设置对鼠标按下的监听
        // this.canvas.addEventListener("mouseup",this.mouseUpCallBack.bind(this)) //设置对鼠标松开的监听
        // this.canvas.addEventListener("touchstart",this.touchStartCallBack.bind(this)) //设置对触摸屏按下的监听
        // this.canvas.addEventListener("touchend",this.touchEndCallBack.bind(this)) //设置对触摸屏松开的监听
        cvs.mouseMoveCallBackArray.push(this.mouseMoveCallBack.bind(this)); //设置对鼠标移动的监听
        cvs.mouseDownCallBackArray.push(this.mouseDownCallBack.bind(this)); //设置对鼠标按下的监听
        cvs.mouseUpCallBackArray.push(this.mouseUpCallBack.bind(this)); //设置对鼠标松开的监听
        cvs.touchMoveCallBackArray.push(this.touchMoveCallBack.bind(this)); //设置对触摸移动的监听
        cvs.touchStartCallBackArray.push(this.touchStartCallBack.bind(this)); //设置对触摸屏按下的监听
        cvs.touchEndCallBackArray.push(this.touchEndCallBack.bind(this)); //设置对触摸屏松开的监听
        this.status=0; //0=inital 1=mouseOver 2=mouseDown
        this.buttonCallBack=buttonCallBack; //设置按下按钮后调用的回调函数
        cvs.addObjectNeedToDraw(layer,this) //向canvas进行注册
        this.draggable=false; //可否拖动
        this.mouseDownRelativeX=undefined; //拖动时与鼠标的相对位置
        this.mouseDownRelativeY=undefined;

        console.log(this.img_initial);
        console.log(this.img_onMouseOver);
        console.log(this.img_onClick);
    }
    setDraggable(d){
        this.draggable=d;
    }
    mouseMoveCallBack(pos){ //处理鼠标移动事件
        // console.log(this.canvas);
        // var pos=calculateTruePosition(this.canvas,evt);
        // var pos={x:evt.clientX,y:evt.clientY};
        console.log(pos.x,pos.y,this.x,this.y,this.boxWidth,this.boxHeight);
        console.log(pos.x>=this.x,pos.x<=this.x+this.boxWidth,pos.y>=this.y,pos.y<=this.y+this.boxHeight)
        if (pos.x>=this.x && pos.x<=this.x+this.boxWidth &&
            pos.y>=this.y && pos.y<=this.y+this.boxHeight){ //判定点击是否在判定区内
            if (this.status!=2) this.status=1;
        }
        else{
            if (this.status!=2) this.status=0;
        }
        if (this.status==2 && this.draggable){ //如果可拖动且目前为摁下状态，更新位置
            this.x=pos.x-this.mouseDownRelativeX;
            this.y=pos.y-this.mouseDownRelativeY;
        }
    }
    mouseDownCallBack(pos){ //处理鼠标按下事件
        // var pos=calculateTruePosition(this.canvas,evt);
        // var pos={x:evt.clientX,y:evt.clientY};
        if (pos.x>=this.x && pos.x<=this.x+this.boxWidth &&
            pos.y>=this.y && pos.y<=this.y+this.boxHeight){ //判定点击是否在判定区内
            this.status=2;
            this.mouseDownRelativeX=pos.x-this.x; //被按下，设置按钮坐标和鼠标坐标的相对位置
            this.mouseDownRelativeY=pos.y-this.y;
        }
    }
    mouseUpCallBack(pos){ //处理鼠标松开事件
        // var pos=calculateTruePosition(this.canvas,evt);
        // var pos={x:evt.clientX,y:evt.clientY};
        console.log("mouse up",pos);
        if (pos.x>=this.x && pos.x<=this.x+this.boxWidth &&
            pos.y>=this.y && pos.y<=this.y+this.boxHeight){ //判定点击是否在判定区内
            this.status=1;
            this.buttonCallBack();
        }
        else this.status=0;
    }
    touchMoveCallBack(pos){ //处理触摸移动事件
        // evt.preventDefault();
        // console.log(this.canvas);
        // var pos=calculateTruePosition(this.canvas,evt.touches[0]);
        // var pos=calculateTruePosition(this.canvas,evt);
        // var pos={x:evt.clientX,y:evt.clientY};
        if (pos.x>=this.x && pos.x<=this.x+this.boxWidth &&
            pos.y>=this.y && pos.y<=this.y+this.boxHeight){ //判定点击是否在判定区内
            if (this.status!=2) this.status=1;
        }
        else{
            if (this.status!=2) this.status=0;
        }
        if (this.status==2 && this.draggable){ //如果可拖动且目前为摁下状态，更新位置
            this.x=pos.x-this.mouseDownRelativeX;
            this.y=pos.y-this.mouseDownRelativeY;
        }
    }
    touchStartCallBack(pos){ //处理触摸屏按下事件
        // evt.preventDefault();
        // var pos=calculateTruePosition(this.canvas,evt.touches[0]);
        // var pos=calculateTruePosition(this.canvas,evt);
        // var pos={x:evt.clientX,y:evt.clientY};
        if (pos.x>=this.x && pos.x<=this.x+this.boxWidth &&
            pos.y>=this.y && pos.y<=this.y+this.boxHeight){ //判定点击是否在判定区内
            this.status=2;
            this.mouseDownRelativeX=pos.x-this.x; //被按下，设置按钮坐标和触摸位置坐标的相对位置
            this.mouseDownRelativeY=pos.y-this.y;
        }
    }
    touchEndCallBack(pos){ //处理触摸屏松开事件
        // evt.preventDefault();
        // var pos=calculateTruePosition(this.canvas,evt.changedTouches[0]);
        // var pos=calculateTruePosition(this.canvas,evt);
        // var pos={x:evt.clientX,y:evt.clientY};
        console.log(pos);
        if (pos.x>=this.x && pos.x<=this.x+this.boxWidth &&
            pos.y>=this.y && pos.y<=this.y+this.boxHeight){ //判定点击是否在判定区内
            this.status=1;
            this.buttonCallBack();
        }
        else this.status=0;
    }
    getImg(){
        if (this.status==1) return this.img_onMouseOver;
        else if (this.status==2) return this.img_onClick;
        else return this.img_initial;
    }
}
