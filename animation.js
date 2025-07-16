"use strict"

class Animation{
    constructor(imgList){
        console.log(imgList);
        this.imgList=imgList;
        // this.interval=interval;
        this.now=0;
        this.playStatus=false; //true=playing, false=pausing
        // this.intervalID=null;
        this.nextFrameTime=performance.now()+this.imgList[0].interval;
        this.playAnimation=currentTime=>{
            if (!this.playStatus){
                requestAnimationFrame(this.playAnimation);
                return;
            }
            if (currentTime>=this.nextFrameTime){
                this.now++;
                if (this.now==this.imgList.length) this.now=0;
                this.nextFrameTime=currentTime+this.imgList[this.now].interval;
            }
            requestAnimationFrame(this.playAnimation);
        }
        requestAnimationFrame(this.playAnimation);
    }
    start(){
        // this.intervalID=setInterval(()=>{
        //     this.now++;
        //     if (this.now==this.imgList.length) this.now=0;
        // },this.interval);
        this.playStatus=true;
    }
    pause(){
        this.playStatus=false;
        // clearInterval(this.intervalID);
        // this.intervalID=null;
    }
    reset(){
        this.pause();
        this.now=0;
    }
    to(t){
        this.now=t;
    }
    nowFrame(){
        return this.now;
    }
    get image(){
        return this.imgList[this.now].image;
    }
}

export default Animation;
