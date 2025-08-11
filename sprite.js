"use strict"

class Sprite{
    constructor(cvs,x,y,visible=true){
        this.canvas=cvs.canvas; //获取所在的canvas
        this.canvasContext=cvs.canvasContext; //获取所在canvas的绘图上下文
        // this.x=x;
        // this.y=y;
        this.trueX=x;
        this.trueY=y;
        this.offsetX=0;
        this.offsetY=0;
        this.visible=visible;
        this.transparentAlpha=1.0;
        this.nowMoveStop=null;
    }
    get x(){
        return this.trueX+this.offsetX;
    }
    get y(){
        return this.trueY+this.offsetY;
    }
    set x(m){
        this.trueX=m;
    }
    set y(m){
        this.trueY=m;
    }
    setPosition(x,y){
        this.x=x;
        this.y=y;
    }
    getPosition(){
        return {x:this.x,y:this.y};
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
        if (this.nowMoveStop!==null) this.nowMoveStop();
        let startTime=performance.now();
        let startPos=this.getPosition();
        let running=true;
        this.nowMoveStop=()=>running=false;
        let moveFuntion=()=>{
            if (!running) return;
            if (performance.now()>=startTime+time){
                this.x=x;
                this.y=y;
                this.nowMoveStop=null;
                return;
            }
            let dt=performance.now()-startTime;
            this.x=startPos.x+(x-startPos.x)*dt/time;
            this.y=startPos.y+(y-startPos.y)*dt/time;
            requestAnimationFrame(moveFuntion);
        }
        requestAnimationFrame(moveFuntion);
    }
    //平滑移动至(x,y)，k为强度(0<=k<=1)
    slideTo(x,y,k){
        let k2=1-k;
        if (this.nowMoveStop!==null) this.nowMoveStop();
        let startTime=performance.now();
        let startPos=this.getPosition();
        let running=true;
        this.nowMoveStop=()=>running=false;
        let moveFuntion=()=>{
            if (!running) return;
            let dt=performance.now()-startTime;
            if ((1-(k2**(dt/1000)-0.001)/0.999)>=1){
                this.x=x;
                this.y=y;
                this.nowMoveStop=null;
                return;
            }
            this.x=startPos.x+(x-startPos.x)*(1-(k2**(dt/1000)-0.001)/0.999);
            this.y=startPos.y+(y-startPos.y)*(1-(k2**(dt/1000)-0.001)/0.999);
            console.log(this.x,this.y);
            requestAnimationFrame(moveFuntion);
        }
        requestAnimationFrame(moveFuntion);
    }
    cancelMovement(){
        this.nowMoveStop();
        this.nowMoveStop=null;
    }
}

export default Sprite;
