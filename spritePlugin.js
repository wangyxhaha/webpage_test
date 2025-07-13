"use strict"

import Sprite from "./sprite.js";

function distance(x1,y1,x2,y2){
    return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
}

Sprite.prototype.floatUp=function(targetX,targetY,time,startX=targetX,startY=targetY+200){
    this.setPostition(startX,startY);
    clearInterval(this.nowMover);
    var startTime=new Date().valueOf();
    var endTime=startTime+time;
    this.setTransparentAlpha(0);
    var d=distance(targetX,targetY,startX,startY);
    this.nowMover=setInterval(()=>{
        if (endTime<=new Date().valueOf()){
            this.x=targetX;
            this.y=targetY;
            // console.log(`pos:(${this.x},${this.y}),v:(${vx},${vy})`);
            clearInterval(this.nowMover);
        }
        var vx=(targetX-this.x)/(endTime-new Date().valueOf())*16.7;
        var vy=(targetY-this.y)/(endTime-new Date().valueOf())*16.7;
        this.x+=vx;
        this.y+=vy;
        this.setTransparentAlpha(distance(this.x,this.y,startX,startY)/d);
        // console.log(`endTime:${endTime}, nowTime${new Date().valueOf()}`);
    },16.7)
};
