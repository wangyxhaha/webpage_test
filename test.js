"use strict"

import Canvas from "./canvas.js";
// import Sprite from "./sprite";
import Button from "./button.js";
import Input from "./input.js";
import Dialog from "./dialog.js";

console.log("test console.");

// var canvas=document.getElementById("my_canvas");
// var canvasCTX=canvas.getContext("2d");
// canvasCTX.fillRect(0,0,600,600);

var megumi=new Image();
megumi.src="./Megumi.jpg";
var hitori=new Image();
hitori.src="./Hitori.jpeg";

var canvas=new Canvas.Canvas("gameCanvas",1000,1000)
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
    var input1=new Input.Input(canvas.sceneArray["main"],"gameInput",200,200,5);
    input1.setTransparentAlpha(0.5);
    var tb=new Dialog.Dialog(canvas.scene("main"),500,500,700,700,0.5,50,1,"123\n12345\n一二三四五六七八九\n1234\n12");
    var b=new Button.Button(canvas.scene("main"),0,0,100,100,1,img1,img2,img3,()=>{},()=>{
        input1.enable();
    });
    var c=new Button.Button(canvas.scene("main"),300,300,100,100,0,img1,img2,img3,
    ()=>{
        c.cancelMovement();
    },
    ()=>{
        input1.disable();
        tb.setText(input1.inputElement.value);
        c.slideTo(300,300,0.05);
    });
    console.log(canvas.scene("main"));
    var d=new Button.Button(canvas.scene("main"),300,0,100,100,0,img1,img2,img3,()=>{},()=>{
        canvas.changeScene("scene2");
    });
    var s2b=new Button.Button(canvas.scene("scene2"),0,400,100,100,0,img1,img2,img3,()=>{},()=>{
        canvas.changeScene("main");
    });
    b.setTransparentAlpha(0.5);
    c.setTransparentAlpha(0.5);
    d.setTransparentAlpha(0.5);
    s2b.setTransparentAlpha(0.5);
    tb.setTransparentAlpha(0.5);
    b.setDraggable(true);
    c.setDraggable(true);
    // setInterval(()=>{
    //     tb.text=input1.inputElement.value;
    // });
    // c.setClickable(false);
    // setInterval(canvas.draw.bind(canvas),16.7);
}

window.onload=main;
