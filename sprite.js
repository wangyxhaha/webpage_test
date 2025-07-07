"use strict"

class Sprite{
    constructor(cvs,x,y,visible=true){
        this.canvas=cvs.canvas; //获取所在的canvas
        this.canvasContext=cvs.canvasContext; //获取所在canvas的绘图上下文
        this.x=x;
        this.y=y;
        this.visible=visible;
        this.transparentAlpha=1.0;
        this.nowMover=null;
    }
    setPostition(x,y){
        this.x=x;
        this.y=y;
    }
    setTransparentAlpha(a){
        if (a>=0 && a<=1) this.transparentAlpha=a;
    }
    setVisible(v){
        this.visible=v;
    }
    isVisible(){
        return this.visible;
    }
    //匀速运动至(x,y)，time为运动时间，单位为ms
    moveTo(x,y,time){
        clearInterval(this.nowMover);
        var startTime=new Date().valueOf();
        var endTime=startTime+time;
        this.nowMover=setInterval(()=>{
            if (endTime<=new Date().valueOf()){
                this.x=x;
                this.y=y;
                // console.log(`pos:(${this.x},${this.y}),v:(${vx},${vy})`);
                clearInterval(this.nowMover);
            }
            var vx=(x-this.x)/(endTime-new Date().valueOf())*16.7;
            var vy=(y-this.y)/(endTime-new Date().valueOf())*16.7;
            this.x+=vx;
            this.y+=vy;
            // console.log(`endTime:${endTime}, nowTime${new Date().valueOf()}`);
        },16.7)
    }
    //平滑移动至(x,y)，k为强度(0<=k<=1)
    slideTo(x,y,k){
        console.log("slide to");
        clearInterval(this.nowMover);
        this.nowMover=setInterval(()=>{
            if (Math.abs(x-this.x)<=0.1 && Math.abs(y-this.y)<=0.1){
                this.x=x;
                this.y=y;
                // console.log(`pos:(${this.x},${this.y})`);
                clearInterval(this.nowMover);
                console.log("slide to end");
            }
            this.x+=(x-this.x)*k;
            this.y+=(y-this.y)*k;
            // console.log(`endTime:${endTime}, nowTime${new Date().valueOf()}`);
        },16.7)
    }
    cancelMovement(){
        clearInterval(this.nowMover);
        this.nowMover=null;
    }
}

export default Sprite;
