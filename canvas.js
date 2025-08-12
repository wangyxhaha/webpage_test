"use strict"

// var megumi=new Image();
// megumi.src="./Megumi.jpg";

import Animation from "./animation.js";

function logicalEvtChange(cvs,e){
    var rect=cvs.canvas.getBoundingClientRect();
    // var relativeX=(e.clientX-rect.left)/cvs.canvas.clientWidth*cvs.logicalWidth;
    // var relativeY=(e.clientY-rect.top)/cvs.canvas.clientHeight*cvs.logicalHeight;
    // console.log(rect);
    var relativeX=(e.clientX-rect.left)/rect.width*cvs.logicalWidth;
    var relativeY=(e.clientY-rect.top)/rect.height*cvs.logicalHeight;
    // console.log(cvs.canvas.style.x,cvs.canvas.style.y,relativeX,relativeY);
    // console.log("lec!",cvs.canvas.clientWidth,':',cvs.canvas.clientHeight,cvs.logicalWidth,':',cvs.logicalHeight);
    return {x:relativeX,y:relativeY};
}

class Canvas{
    constructor(canvasid,height,width){
        this.canvasid=canvasid;
        this.canvas=document.getElementById(canvasid); //设置canvas和上下文
        this.canvasContext=this.canvas.getContext("2d");
        this.logicalHeight=height; //逻辑分辨率 （原尺寸）
        this.logicalWidth=width;
        this.canvas.height=this.logicalHeight;
        this.canvas.width=this.logicalWidth;
        this.ratio=height/width; //计算canvas的长宽比（高比宽）
        this.sceneArray=new Array();
        this.sceneArray["main"]=new CanvasScene(canvasid,height,width,null);
        this.nowScene="main";
        this.canvas.addEventListener("pointermove",this.mouseMoveCallBack.bind(this)) //设置对鼠标移动的监听
        this.canvas.addEventListener("pointerdown",this.mouseDownCallBack.bind(this)) //设置对鼠标按下的监听
        this.canvas.addEventListener("pointerup",this.mouseUpCallBack.bind(this)) //设置对鼠标松开的监听
        // this.canvas.addEventListener("mousemove",this.mouseMoveCallBack.bind(this)) //设置对鼠标移动的监听
        // this.canvas.addEventListener("mousedown",this.mouseDownCallBack.bind(this)) //设置对鼠标按下的监听
        // this.canvas.addEventListener("mouseup",this.mouseUpCallBack.bind(this)) //设置对鼠标松开的监听
        // this.canvas.addEventListener("touchmove",this.touchMoveCallBack.bind(this),{passive:false}) //设置对触摸移动的监听
        // this.canvas.addEventListener("touchstart",this.touchStartCallBack.bind(this),{passive:false}) //设置对触摸屏按下的监听
        // this.canvas.addEventListener("touchend",this.touchEndCallBack.bind(this)) //设置对触摸屏松开的监听
        this.mainLoop=()=>{
            this.draw();
            requestAnimationFrame(this.mainLoop);
        };
        requestAnimationFrame(this.mainLoop);
    }
    draw(){
        this.sceneArray[this.nowScene].draw();
        // console.log(`now scene: ${this.nowScene}`);
    }
    scene(name){
        if (name in this.sceneArray) return this.sceneArray[name];
        throw `${name} isn't existed.`;
    }
    createNewScene(name,background){
        if (name in this.sceneArray){
            throw `${name} is already existed.`;
        }
        // this.sceneArray["scene2"]=new CanvasScene(canvasid,height,width,hitori);
        console.log(name,this.canvasid,this.logicalHeight,this.logicalWidth,background);
        this.sceneArray[name]=new CanvasScene(this.canvasid,this.logicalHeight,this.logicalWidth,background);
    }
    changeScene(name){
        if (name in this.sceneArray){
            this.nowScene=name;
        }
        else throw `${name} isn't existed.`;
    }
    mouseMoveCallBack(evt){
        this.sceneArray[this.nowScene].mouseMoveCallBack(evt);
    }
    mouseDownCallBack(evt){
        this.sceneArray[this.nowScene].mouseDownCallBack(evt);
    }
    mouseUpCallBack(evt){
        this.sceneArray[this.nowScene].mouseUpCallBack(evt);
    }
    touchMoveCallBack(evt){
        this.sceneArray[this.nowScene].touchMoveCallBack(evt);
    }
    touchStartCallBack(evt){
        this.sceneArray[this.nowScene].touchStartCallBack(evt);
    }
    touchEndCallBack(evt){
        this.sceneArray[this.nowScene].touchEndCallBack(evt);
    }
}

export class CanvasScene{ //不同场景（可以方便切换）
    constructor(canvasid,height,width,background){
        this.canvas=document.getElementById(canvasid); //设置canvas和上下文
        this.canvasContext=this.canvas.getContext("2d");
        this.logicalHeight=height; //逻辑分辨率 （原尺寸）
        this.logicalWidth=width;
        this.canvas.height=this.logicalHeight;
        this.canvas.width=this.logicalWidth;
        this.background=background;
        // this.ratio=height/width; //计算canvas的长宽比（高比宽）
        // this.canvasContext.fillStyle="rgba(255,255,255)"; //测试canvas显示用
        // this.canvasContext.fillRect(0,0,this.logicalWidth,this.logicalHeight);
        // this.canvasContext.fillRect(10,10,this.logicalWidth-20,this.logicalHeight-20);
        this.objectToDraw=new Array(); //包含{layer(图层，越大越靠前),object(需要绘制的对象的this)}
        this.listeners=new Array();
        // this.mouseMoveCallBackArray=new Array();
        // this.mouseDownCallBackArray=new Array();
        // this.mouseUpCallBackArray=new Array();
        // this.touchMoveCallBackArray=new Array();
        // this.touchStartCallBackArray=new Array();
        // this.touchEndCallBackArray=new Array();
        this.clickFocusPoint=null; //可点击元素的焦点，null为无焦点（存在焦点时只对焦点元素进行判定）
    }
    setBackground(img){
        this.background=img;
    }
    addObjectNeedToDraw(ly,f){
        this.objectToDraw.push({layer:ly,func:f});
    }
    draw(){
        // document.getElementById("information").innerHTML=this.clickFocusPoint;
        this.canvasContext.clearRect(0,0,this.canvas.width,this.canvas.height);
        if (this.background!=null){
            let temp;
            if (this.background instanceof HTMLImageElement) temp=this.background;
            else if (this.background instanceof Animation) temp=this.background.image;
            else throw `unknown type of image(in background)`;
            this.canvasContext.drawImage(temp,0,0,this.logicalWidth,this.logicalHeight);
        }
        this.objectToDraw.sort(function(a,b){
            return a.layer-b.layer;
        });
        var t;
        for (var i in this.objectToDraw){
            // t=this.objectToDraw[i].object.getImg();
            // this.canvasContext.drawImage(t,this.objectToDraw[i].object.x,this.objectToDraw[i].object.y);
            this.objectToDraw[i].func();
        }
    }
    addClickCallBack(mm,md,mu,tm,ts,te,l){
        this.listeners.push({
            layer: l,
            mouseMoveCallBack: mm,
            mouseDownCallBack: md,
            mouseUpCallBack: mu,
            touchMoveCallBack: tm,
            touchStartCallBack: ts,
            touchEndCallBack: te
        });
        this.listeners.sort((a,b)=>b.layer-a.layer); //以图层从前到后的顺序排序
    }
    mouseMoveCallBack(evt){
        evt.preventDefault();
        var logicalPos=logicalEvtChange(this,evt);
        // console.log(logicalPos);
        if (evt.pointerType==="touch" && evt.pressure.length>1){
            
            return;
        }
        if (this.clickFocusPoint!==null){
            // this.mouseMoveCallBackArray[this.clickFocusPoint].func(logicalPos);
            this.clickFocusPoint.mouseMoveCallBack(logicalPos);
            return;
        }
        var t=true; //从最靠前的开始判定，如果判定成功则把t设为false，并给予后续元素虚假的不可能的逻辑坐标，以免重叠元素被判定
        for (var i in this.listeners){
            if (t){
                if (this.listeners[i].mouseMoveCallBack(logicalPos)){
                    // this.clickFocusPoint=i;
                    // break;
                    t=false;
                }
            }
            else this.listeners[i].mouseMoveCallBack({x:Infinity,y:Infinity});
            // this.mouseMoveCallBackArray[i].func(logicalPos);
        }
        // if (t) console.log("mm t=true");
    }
    mouseDownCallBack(evt){
        evt.preventDefault();
        var logicalPos=logicalEvtChange(this,evt);
        // if (this.clickFocusPoint!=-1){
        //     this.mouseDownCallBackArray[this.clickFocusPoint].func(logicalPos);
        //     return;
        // }
        if (evt.pointerType==="touch" && evt.pressure.length>1){
            
            return;
        }
        for (var i in this.listeners){
            if (this.listeners[i].mouseDownCallBack(logicalPos)){
                this.clickFocusPoint=this.listeners[i]; //只有按下动作会产生焦点
                break;
            }
        }
    }
    mouseUpCallBack(evt){
        evt.preventDefault();
        var logicalPos=logicalEvtChange(this,evt);
        if (evt.pointerType==="touch" && evt.pressure.length>1){
            return;
        }
        if (this.clickFocusPoint!==null){ //无焦点时松开判定无效
            this.clickFocusPoint.mouseUpCallBack(logicalPos);
            this.clickFocusPoint=null;
            return;
        }
        // for (var i in this.mouseUpCallBackArray){
        //     if (this.mouseUpCallBackArray[i].func(logicalPos)) break;
        // }
    }
    touchMoveCallBack(evt){
        evt.preventDefault(); //触摸屏事件的preventDefault很重要，可防止浏览器模拟鼠标事件导致重复触发
        var logicalPos=logicalEvtChange(this,evt.touches[0]);
        console.log(this.clickFocusPoint);
        if (this.clickFocusPoint!==null){
            this.clickFocusPoint.touchMoveCallBack(logicalPos);
            return;
        }
        var t=true;
        for (var i in this.listeners){
            if (t){
                if (this.listeners[i].touchMoveCallBack(logicalPos)){
                    t=false;
                }
            }
            else this.listeners[i].touchMoveCallBack({x:Infinity,y:Infinity});
        }
    }
    touchStartCallBack(evt){
        evt.preventDefault();
        var logicalPos=logicalEvtChange(this,evt.touches[0]);
        console.log(this.clickFocusPoint);
        if (this.clickFocusPoint!==null){ //因为触摸屏有多指点击，有必要限制一下有焦点时的点击
            // this.clickFocusPoint.touchStartCallBack(logicalPos);
            return;
        }
        for (var i in this.listeners){
            if (this.listeners[i].touchStartCallBack(logicalPos)){
                this.clickFocusPoint=this.listeners[i];
                break;
            }
        }
    }
    touchEndCallBack(evt){
        evt.preventDefault();
        var logicalPos=logicalEvtChange(this,evt.changedTouches[0]);
        console.log(this.clickFocusPoint);
        if (this.clickFocusPoint!==null){
            this.clickFocusPoint.touchEndCallBack(logicalPos);
            this.clickFocusPoint=null;
            return;
        }
        // for (var i in this.touchEndCallBackArray){
        //     if (this.touchEndCallBackArray[i].func(logicalPos)) break;
        // }
    }
}

export default Canvas;
