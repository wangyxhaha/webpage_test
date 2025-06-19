"use strict"

class Input{
    constructor(cvs,input_id,x,y,layer){
        this.canvas=cvs.canvas; //获取canvas环境
        this.canvasContext=cvs.canvasContext;
        this.inputElement=document.getElementById(input_id); //获取实际文本框元素
        this.inputElement.style="position: fixed top: -100px opacity: 0 height: 0"; //隐藏实际文本框，很重要！！
        this.x=x; //获取坐标（x的定位由textAlign决定，y的定位由textBaseLine决定）
        this.y=y;
        this.layer=layer;
        cvs.addObjectNeedToDraw(layer,this.draw.bind(this));
        // 设置文本样式
        this.fontHeight=30;
        this.canvasContext.font=`${this.fontHeight}px Arial`;          // 字体大小和类型
        this.canvasContext.fillStyle='red';            // 填充颜色
        this.canvasContext.strokeStyle='blue';         // 描边颜色
        this.canvasContext.lineWidth=2;                // 描边宽度
        this.inputElement.addEventListener("keydown",this.submitCallBack.bind(this));
        this.cursorPos=0; //光标的位置
    }
    draw(){
        this.canvasContext.fillText(this.inputElement.value,this.x,this.y);
        // this.canvasContext.strock
        // console.log("draw input");
        var w=this.canvasContext.measureText(this.inputElement.value.substring(0,this.cursorPos));
        this.canvasContext.fillRect(this.x+w.width,this.y-this.fontHeight,2,this.fontHeight);
        console.log(this.cursorPos);
    }
    enable(){
        this.inputElement.focus();
        console.log("enable");
    }
    disable(){
        this.inputElement.blur();
        console.log("disable");
    }
    submitCallBack(evt){
        if (evt.key==="ArrowLeft"){
            evt.preventDefault();
            this.cursorPos=Math.max(0,this.cursorPos-1);
        }
        else if (evt.key==="ArrowRight"){
            evt.preventDefault();
            this.cursorPos=Math.min(this.inputElement.value.length,this.cursorPos+1);
        }
        else if (evt.key==="Enter"){
            evt.preventDefault();
            this.disable();
        }
        else if (evt.key==="Backspace"){
            this.cursorPos=Math.max(0,this.cursorPos-1);
        }
        else if (evt.key.length==1){
            evt.preventDefault();
            this.inputElement.value=this.inputElement.value.substring(0,this.cursorPos)+evt.key+this.inputElement.value.substring(this.cursorPos);
            this.cursorPos=Math.min(this.inputElement.value.length,this.cursorPos+1);
        }
        // else this.inputElement.value=this.inputElement.value+evt.key;
        console.log("smcb:",evt.key,evt.keyCode,this.inputElement.value);
    }
}
