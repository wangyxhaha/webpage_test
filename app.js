"use strict"

console.log("test console.");

// var canvas=document.getElementById("my_canvas");
// var canvasCTX=canvas.getContext("2d");
// canvasCTX.fillRect(0,0,600,600);

var megumi=new Image();
megumi.src="./Megumi.jpg";
var hitori=new Image();
hitori.src="./Hitori.jpeg";

var canvas=new Canvas("gameCanvas",800,800)
    canvas.createNewScene("scene2",hitori);

// console.log(canvas.canvas);

var img1=new Image(),img2=new Image(),img3=new Image;
img1.src="./button1.png";
img2.src="./button2.png";
img3.src="./button3.png";

function cb(){
    console.log("press down button");
}

function main(){
    console.log("loading successfully");
    // canvas.canvasContext.drawImage(megumi,0,0,600,600);
    canvas.scene("main").setBackground(megumi);
    var input1=new Input(canvas.sceneArray["main"],"gameInput",200,200,5);
    input1.setTransparentAlpha(0.5);
    var b=new Button(canvas.scene("main"),0,0,100,100,1,img1,img2,img3,()=>{
        input1.enable();
    });
    var c=new Button(canvas.scene("main"),300,300,100,100,0,img1,img2,img3,()=>{
        input1.disable();
        c.slideTo(500,500,0.1);
    });
    console.log(canvas.scene("main"));
    var d=new Button(canvas.scene("main"),300,0,100,100,0,img1,img2,img3,()=>{
        canvas.changeScene("scene2");
    });
    var s2b=new Button(canvas.scene("scene2"),0,400,100,100,0,img1,img2,img3,()=>{
        canvas.changeScene("main");
    });
    b.setTransparentAlpha(0.5);
    c.setTransparentAlpha(0.5);
    d.setTransparentAlpha(0.5);
    s2b.setTransparentAlpha(0.5);
    b.setDraggable(true);
    c.setDraggable(true);
    // c.setClickable(false);
    // setInterval(canvas.draw.bind(canvas),16.7);
}

window.onload=main;
