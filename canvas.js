"use strict"

// var megumi=new Image();
// megumi.src="./Megumi.jpg";

class Canvas{
    constructor(canvasid,height,width){
        this.canvas=document.getElementById(canvasid); //设置canvas和上下文
        this.canvasContext=this.canvas.getContext("2d");
        this.logicalHeight=height; //逻辑分辨率 （原尺寸）
        this.logicalWidth=width;
        this.canvas.height=this.logicalHeight;
        this.canvas.width=this.logicalWidth;
        this.ratio=height/width; //计算canvas的长宽比（高比宽）
        this.canvasContext.fillStyle="rgba(255,255,255)"; //测试canvas显示用
        this.canvasContext.fillRect(0,0,this.logicalWidth,this.logicalHeight);
        // this.canvasContext.fillRect(10,10,this.logicalWidth-20,this.logicalHeight-20);
        this.objectToDraw=new Array(); //包含{layer(图层，越大越靠前),object(需要绘制的对象的this)}
        this.mouseMoveCallBackArray=new Array();
        this.mouseDownCallBackArray=new Array();
        this.mouseUpCallBackArray=new Array();
        this.touchStartCallBackArray=new Array();
        this.touchEndCallBackArray=new Array();
        this.canvas.addEventListener("mousemove",this.mouseMoveCallBack.bind(this)) //设置对鼠标移动的监听
        this.canvas.addEventListener("mousedown",this.mouseDownCallBack.bind(this)) //设置对鼠标按下的监听
        this.canvas.addEventListener("mouseup",this.mouseUpCallBack.bind(this)) //设置对鼠标松开的监听
        this.canvas.addEventListener("touchstart",this.touchStartCallBack.bind(this)) //设置对触摸屏按下的监听
        this.canvas.addEventListener("touchend",this.touchEndCallBack.bind(this)) //设置对触摸屏松开的监听
    }
    addObjectNeedToDraw(ly,obj){
        this.objectToDraw.push({layer:ly,object:obj});
    }
    draw(){
        this.canvasContext.drawImage(megumi,0,0,600,600);
        this.objectToDraw.sort(function(a,b){
            return a.layer-b.layer;
        });
        var t;
        for (var i in this.objectToDraw){
            t=this.objectToDraw[i].object.getImg();
            // console.log(t.src);
            this.canvasContext.drawImage(t,this.objectToDraw[i].object.x,this.objectToDraw[i].object.y);
            // this.canvasContext.drawImage(t,this.objectToDraw[i].object.x,this.objectToDraw[i].object.y,
            //     this.objectToDraw[i].object.width,this.objectToDraw[i].object.height);
        }
    }
    mouseMoveCallBack(evt){
        for (var i in this.mouseMoveCallBackArray){
            this.mouseMoveCallBackArray[i](evt);
        }
    }
    mouseDownCallBack(evt){
        for (var i in this.mouseDownCallBackArray){
            this.mouseDownCallBackArray[i](evt);
        }
    }
    mouseUpCallBack(evt){
        for (var i in this.mouseUpCallBackArray){
            this.mouseUpCallBackArray[i](evt);
        }
    }
    touchStartCallBack(evt){
        for (var i in this.touchStartCallBackArray){
            this.touchStartCallBackArray[i](evt);
        }
    }
    touchEndCallBack(evt){
        for (var i in this.touchEndCallBackArray){
            this.touchEndCallBackArray[i](evt);
        }
    }
}