"use strict"

// var megumi=new Image();
// megumi.src="./Megumi.jpg";

function logicalEvtChange(cvs,e){
    var rect=cvs.canvas.getBoundingClientRect();
    var relativeX=(e.clientX-rect.left)/cvs.canvas.clientWidth*cvs.logicalWidth;
    var relativeY=(e.clientY-rect.top)/cvs.canvas.clientHeight*cvs.logicalHeight;
    // console.log(cvs.canvas.style.x,cvs.canvas.style.y,relativeX,relativeY);
    // console.log("lec!",cvs.canvas.clientWidth,':',cvs.canvas.clientHeight,cvs.logicalWidth,':',cvs.logicalHeight);
    return {x:relativeX,y:relativeY};
}

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
        this.touchMoveCallBackArray=new Array();
        this.touchStartCallBackArray=new Array();
        this.touchEndCallBackArray=new Array();
        this.canvas.addEventListener("mousemove",this.mouseMoveCallBack.bind(this)) //设置对鼠标移动的监听
        this.canvas.addEventListener("mousedown",this.mouseDownCallBack.bind(this)) //设置对鼠标按下的监听
        this.canvas.addEventListener("mouseup",this.mouseUpCallBack.bind(this)) //设置对鼠标松开的监听
        this.canvas.addEventListener("touchmove",this.touchMoveCallBack.bind(this)) //设置对触摸移动的监听
        this.canvas.addEventListener("touchstart",this.touchStartCallBack.bind(this)) //设置对触摸屏按下的监听
        this.canvas.addEventListener("touchend",this.touchEndCallBack.bind(this)) //设置对触摸屏松开的监听
    }
    addObjectNeedToDraw(ly,obj){
        this.objectToDraw.push({layer:ly,object:obj});
    }
    // logicalEvtChange(e){
    //     var t=e;
    //     var rect=this.canvas.getBoundingClientRect();
    //     var relativeX=(e.clientX-rect.left)/this.canvas.style.x*this.logicalWidth;
    //     var relativeY=(e.clientY-rect.top)/this.canvas.style.y*this.logicalHeight;
    //     t.clientX=relativeX;
    //     t.clientY=relativeY;
    //     return t;
    // }
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
        var logicalPos=logicalEvtChange(this,evt);
        for (var i in this.mouseMoveCallBackArray){
            this.mouseMoveCallBackArray[i](logicalPos);
        }
    }
    mouseDownCallBack(evt){
        var logicalPos=logicalEvtChange(this,evt);
        for (var i in this.mouseDownCallBackArray){
            this.mouseDownCallBackArray[i](logicalPos);
        }
    }
    mouseUpCallBack(evt){
        var logicalPos=logicalEvtChange(this,evt);
        for (var i in this.mouseUpCallBackArray){
            this.mouseUpCallBackArray[i](logicalPos);
        }
    }
    touchMoveCallBack(evt){
        evt.preventDefault();
        var logicalPos=logicalEvtChange(this,evt.touches[0]);
        for (var i in this.mouseMoveCallBackArray){
            this.touchMoveCallBackArray[i](logicalPos);
        }
    }
    touchStartCallBack(evt){
        evt.preventDefault();
        var logicalPos=logicalEvtChange(this,evt.touches[0]);
        for (var i in this.touchStartCallBackArray){
            this.touchStartCallBackArray[i](logicalPos);
        }
    }
    touchEndCallBack(evt){
        evt.preventDefault();
        var logicalPos=logicalEvtChange(this,evt.changedTouches[0]);
        for (var i in this.touchEndCallBackArray){
            this.touchEndCallBackArray[i](logicalPos);
        }
    }
}
