"use strict"

class Animation{
    constructor(imgList,interval){
        this.imgList=imgList;
        this.interval=interval;
        this.now=0;
        this.playStatus=false; //true=playing, false=pausing
        this.intervalID=null;
    }
    start(){
        this.intervalID=setInterval(()=>{
            this.now++;
            if (this.now==this.imgList.length) this.now=0;
        },this.interval);
    }
    pause(){
        clearInterval(this.intervalID);
        this.intervalID=null;
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
        return this.imgList[this.now];
    }
}

export default Animation;
