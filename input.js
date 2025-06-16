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
        this.canvasContext.font='30px Arial';          // 字体大小和类型
        this.canvasContext.fillStyle='red';            // 填充颜色
        this.canvasContext.strokeStyle='blue';         // 描边颜色
        this.canvasContext.lineWidth=2;                // 描边宽度
        this.inputElement.addEventListener("keydown",this.submitCallBack.bind(this));
    }
    draw(){
        this.canvasContext.fillText(this.inputElement.value,this.x,this.y);
        // this.canvasContext.strock
        // console.log("draw input");
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
        if (evt.key==="Enter"){
            evt.preventDefault();
            this.disable();
        }
        // else this.inputElement.value=this.inputElement.value+evt.key;
        console.log("smcb:",evt.key,evt.keyCode,this.inputElement.value);
    }
}
