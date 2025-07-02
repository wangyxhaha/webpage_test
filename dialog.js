"use strict"

class Dialog extends Sprite{
    constructor(cvs,x,y,tx,ty,e,k,layer,text){
        super(cvs,x,y);
        this.tx=tx;
        this.ty=ty;
        this.e=e;
        this.text=text;
        console.log(typeof(this.text));
        this.fontHeight=30;
        this.lineInterval=3;
        cvs.addObjectNeedToDraw(layer,this.draw.bind(this)) //向canvas进行注册
    }
    #divide(){ //按换行符分割内容并返回包含分割内容的Array和最长行的长度
        var temp=new Array();
        var pre=0;
        var maxlength=0;
        for (var i=0;i<this.text.length;i++){
            if (this.text[i]=='\n'){
                temp.push(this.text.substring(pre,i));
                maxlength=Math.max(maxlength,this.canvasContext.measureText(temp[temp.length-1]).width);
                pre=i+1;
            }
            else if (this.text[i]=='\0'){
                temp.push(this.text.substring(pre,i));
                maxlength=Math.max(maxlength,this.canvasContext.measureText(temp[temp.length-1]).width);
                break;
            }
        }
        temp.push(this.text.substring(pre,this.text.length));
        maxlength=Math.max(maxlength,this.canvasContext.measureText(temp[temp.length-1]).width);
        return {maxlength:maxlength,sentence:temp};
    }
    draw(){
        this.canvasContext.globalAlpha=this.transparentAlpha;
        this.canvasContext.font=`${this.fontHeight}px Arial`;          // 字体大小和类型
        this.canvasContext.fillStyle='white';            // 填充颜色
        this.canvasContext.strokeStyle='black';         // 描边颜色
        this.canvasContext.lineWidth=2;                // 描边宽度
        var parts=this.#divide(); //对内容按换行符进行划分
        // console.log(parts);
        var height=parts.sentence.length*this.fontHeight+(parts.sentence.length-1)*this.lineInterval; //计算全部内容所占高
        var a=Math.sqrt(parts.maxlength*parts.maxlength/4+height*height/4/(1-this.e*this.e)); //计算椭圆半长轴
        var b=a*Math.sqrt(1-this.e*this.e); //计算椭圆半短轴
        //绘制椭圆
        this.canvasContext.beginPath();
        this.canvasContext.ellipse(this.x,this.y,a,b,0,0,Math.PI*2);
        this.canvasContext.fill();
        this.canvasContext.stroke();
        this.canvasContext.strokeRect(this.x-parts.maxlength/2,this.y-height/2,parts.maxlength,height);
        //绘制尾巴
        // if (tx)
        //绘制字体
        this.canvasContext.fillStyle='black';            // 填充颜色
        this.canvasContext.textAlign="center";
        this.canvasContext.textBaseline="middle";
        for (var i=0;i<parts.sentence.length;i++){
            // console.log(parts.sentence[i],this.x,this.y+i*(this.lineInterval+this.fontHeight)+this.fontHeight/2-height/2);
            this.canvasContext.fillText(parts.sentence[i],this.x,this.y+i*(this.lineInterval+this.fontHeight)+this.fontHeight/2-height/2);
            this.canvasContext.beginPath();
            // this.canvasContext.moveTo(this.x-parts.maxlength/2,this.y+i*(this.lineInterval+this.fontHeight)+this.fontHeight/2-height/2);
            // this.canvasContext.lineTo(this.x+parts.maxlength/2,this.y+i*(this.lineInterval+this.fontHeight)+this.fontHeight/2-height/2);
            // this.canvasContext.stroke();
        }
        this.canvasContext.globalAlpha=1;
    }
}
