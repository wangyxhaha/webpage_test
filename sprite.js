"use strict"

class Sprite{
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.transparentAlpha=1.0;
    }
    setPostition(x,y){
        this.x=x;
        this.y=y;
    }
    setTransparentAlpha(a){
        if (a>=0 && a<=1) this.transparentAlpha=a;
    }
}
