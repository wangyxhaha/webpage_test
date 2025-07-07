"use strict"
import Sprite from "./sprite.js";

class Input extends Sprite{
    constructor(cvs,input_id,x,y,layer){
        super(cvs,x,y);
        // this.canvas=cvs.canvas; //获取canvas环境
        // this.canvasContext=cvs.canvasContext;
        this.inputElement=document.getElementById(input_id); //获取实际文本框元素
        this.inputElement.style="position: fixed top: -100px opacity: 0 height: 0"; //隐藏实际文本框，很重要！！
        // this.x=x; //获取坐标（x的定位由textAlign决定，y的定位由textBaseLine决定）
        // this.y=y;
        this.layer=layer;
        cvs.addObjectNeedToDraw(layer,this.draw.bind(this));
        this.fontHeight=30;
        this.inputElement.addEventListener("keydown",this.submitCallBack.bind(this)); //用于检测Enter
        this.inputElement.addEventListener("blur",this.disable.bind(this)); //用于检测失去焦点
        this.timeHandler.flag=true;
        this.oninput=false;
        setInterval(this.timeHandler.bind(this),500); //用来处理光标周期性闪烁
    }
    timeHandler(){
        this.timeHandler.flag=!this.timeHandler.flag;
        // console.log("switch cursor");
    }
    draw(){
        this.canvasContext.globalAlpha=this.transparentAlpha;
        // 设置文本样式
        this.canvasContext.font=`${this.fontHeight}px Arial`;          // 字体大小和类型
        this.canvasContext.fillStyle='red';            // 填充颜色
        this.canvasContext.strokeStyle='blue';         // 描边颜色
        this.canvasContext.lineWidth=2;                // 描边宽度
        this.canvasContext.textAlign="start";
        this.canvasContext.textBaseline="alphabetic";
        this.canvasContext.fillText(this.inputElement.value,this.x,this.y);
        // this.canvasContext.strock
        // console.log("draw input");
        if (this.oninput && this.timeHandler.flag){
            var w=this.canvasContext.measureText(this.inputElement.value.substring(0,this.inputElement.selectionStart)); //获取到光标位置的内容的宽度
            this.canvasContext.fillRect(this.x+w.width,this.y-this.fontHeight,2,this.fontHeight);
        }
        this.canvasContext.globalAlpha=1;
    }
    enable(){
        this.inputElement.focus();
        this.oninput=true;
        console.log("enable");
    }
    disable(){
        this.inputElement.blur();
        this.oninput=false;
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

export default Input;
