"use strict"

class Dialog extends Sprite{
    constructor(cvs,cx,cy,tx,ty,e,text){
        super(cvs,cx,cy);
        this.tx=tx;
        this.ty=ty;
        this.e=e;
        this.text;
    }
}
