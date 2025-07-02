"use strict"

class Dialog extends Sprite{
    constructor(cvs,x,y,tx,ty,e,tailBottomWidth,layer,text){
        super(cvs,x,y);
        this.tx=tx;
        this.ty=ty;
        this.e=e;
        this.tailBottomWidth=tailBottomWidth;
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
        //初始准备
        var parts=this.#divide(); //对内容按换行符进行划分
        var height=parts.sentence.length*this.fontHeight+(parts.sentence.length-1)*this.lineInterval; //计算全部内容所占高
        var a=Math.sqrt(parts.maxlength*parts.maxlength/4+height*height/4/(1-this.e*this.e)); //计算椭圆半长轴
        var b=a*Math.sqrt(1-this.e*this.e); //计算椭圆半短轴
        var tanx=-((this.tx-this.x)/(this.ty-this.y)); //计算尾巴底部两侧点距离中心坐标的偏移量
        var dx=this.tailBottomWidth/2/Math.sqrt(1+tanx*tanx); //x轴偏移量
        var dy=dx*tanx; //y轴偏移量
        var ell=new Path2D(); //椭圆路径
        ell.ellipse(this.x,this.y,a,b,0,0,Math.PI*2);
        ell.closePath();
        var tail=new Path2D(); //尾巴路径
        tail.moveTo(this.x+dx,this.y+dy);
        tail.lineTo(this.tx,this.ty);
        tail.lineTo(this.x-dx,this.y-dy);
        tail.closePath();
        //开始绘制气泡框
        this.canvasContext.globalAlpha=this.transparentAlpha;
        this.canvasContext.fillStyle='white';            // 填充颜色
        this.canvasContext.strokeStyle='black';         // 描边颜色
        this.canvasContext.lineWidth=5;                // 描边宽度
        this.canvasContext.stroke(ell);
        this.canvasContext.stroke(tail);
        this.canvasContext.fill(ell);
        this.canvasContext.fill(tail);
        // this.canvasContext.strokeRect(this.x-parts.maxlength/2,this.y-height/2,parts.maxlength,height);
        //绘制字体
        this.canvasContext.font=`${this.fontHeight}px Arial`;          // 字体大小和类型
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
    setTailPos(tx,ty){
        this.tx=tx;
        this.ty=ty;
    }
    setE(e){
        this.e=e;
    }
    setText(t){
        this.text=t;
    }
}
