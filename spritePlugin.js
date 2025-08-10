"use strict"

import Sprite from "./sprite.js";

function distance(x1,y1,x2,y2){
    return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
}

Sprite.prototype.floatUp=function(targetX,targetY,time,startX=targetX,startY=targetY+200){
    if (this.nowMoveStop!==null) this.nowMoveStop();
    this.setTransparentAlpha(0);
    let startTime=performance.now();
    let startPos={x:startX,y:startY};
    let running=true;
    this.nowMoveStop=()=>running=false;
    let moveFuntion=()=>{
        if (!running) return;
        if (performance.now()>=startTime+time){
            this.x=targetX;
            this.y=targetY;
            this.transparentAlpha=1;
            this.nowMoveStop=null;
            return;
        }
        let dt=performance.now()-startTime;
        this.x=startPos.x+(targetX-startPos.x)*dt/time;
        this.y=startPos.y+(targetY-startPos.y)*dt/time;
        this.setTransparentAlpha(dt/time);
        requestAnimationFrame(moveFuntion);
    }
    requestAnimationFrame(moveFuntion);
};

Sprite.prototype.shakeHorizontally=function(time=500,A=20,f=6){ //水平震动
    var startTime=performance.now();
    var update=()=>{
        let nowTime=performance.now();
        this.offsetX=A*Math.sin(Math.PI*(nowTime-startTime)/time)*Math.sin(2*Math.PI*f*(nowTime-startTime)/1000);
        if (nowTime<startTime+time) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}
