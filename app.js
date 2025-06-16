"use strict"

console.log("test console.");

// var canvas=document.getElementById("my_canvas");
// var canvasCTX=canvas.getContext("2d");
// canvasCTX.fillRect(0,0,600,600);

var megumi=new Image();
megumi.src="./Megumi.jpg";

var canvas=new Canvas("gameCanvas",600,600)

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
    var b=new Button(canvas,0,0,100,100,1,img1,img2,img3,cb);
    var c=new Button(canvas,300,300,100,100,0,img1,img2,img3,cb)
    b.setDraggable(true);
    c.setDraggable(true);
    setInterval(canvas.draw.bind(canvas), 16.7);
}

window.onload=main;
