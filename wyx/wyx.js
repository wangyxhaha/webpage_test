"use strict"

import Resource from "../resource.js"
import Canvas from "../canvas.js";
import Button from "../button.js";
import Animation from "../animation.js";
import Input from "../input.js";
import Text from "../text.js";
import Line from "../line.js"
import "../buttonPlugin.js";
import "../spritePlugin.js"

var cfg=[ //所需素材的信息
    {
        name: "wyx_door",
        type: "image",
        value: "./wyx/data/wyx背景门.jpg"
    },
    {
        name: "wyx_top",
        type: "image",
        value: "./wyx/data/wyx顶.jpg"
    },
    {
        name: "wyx_right_bg",
        type: "image",
        value: "./wyx/data/wyx右底图.jpg"
    },
    {
        name: "wyx_left_bg",
        type: "image",
        value: "./wyx/data/wyx左底图.jpg"
    },
    {
        name: "wyx_easter_egg",
        type: "image",
        value: "./wyx/data/wyx迷宫彩蛋.jpg"
    },
    {
        name: "left_arrow",
        type: "image",
        value: "./wyx/data/左.png"
    },
    {
        name: "right_arrow",
        type: "image",
        value: "./wyx/data/右.png"
    },
    {
        name: "up_arrow",
        type: "image",
        value: "./wyx/data/上.png"
    },
    {
        name: "down_arrow",
        type: "image",
        value: "./wyx/data/下.png"
    },
    {
        name: "lock",
        type: "image",
        value: "./wyx/data/锁.png"
    },
    {
        name: "code_option_left",
        type: "image",
        value: "./wyx/data/left.png"
    },
    {
        name: "code_option_left_blue",
        type: "image",
        value: "./wyx/data/left_blue.png"
    },
    {
        name: "code_option_right",
        type: "image",
        value: "./wyx/data/right.png"
    },
    {
        name: "code_option_right_blue",
        type: "image",
        value: "./wyx/data/right_blue.png"
    },
    {
        name: "code_option_forward",
        type: "image",
        value: "./wyx/data/forward.png"
    },
    {
        name: "code_option_forward_blue",
        type: "image",
        value: "./wyx/data/forward_blue.png"
    },
    {
        name: "code_option_backward",
        type: "image",
        value: "./wyx/data/backward.png"
    },
    {
        name: "code_option_backward_blue",
        type: "image",
        value: "./wyx/data/backward_blue.png"
    },
    {
        name: "1",
        type: "image",
        value: "./wyx/data/1.png"
    },
    {
        name: "2",
        type: "image",
        value: "./wyx/data/2.png"
    },
    {
        name: "3",
        type: "image",
        value: "./wyx/data/3.png"
    },
    {
        name: "4",
        type: "image",
        value: "./wyx/data/4.png"
    },
    {
        name: "5",
        type: "image",
        value: "./wyx/data/5.png"
    },
    {
        name: "6",
        type: "image",
        value: "./wyx/data/6.png"
    },
    {
        name: "7",
        type: "image",
        value: "./wyx/data/7.png"
    },
    {
        name: "8",
        type: "image",
        value: "./wyx/data/8.png"
    },
    {
        name: "9",
        type: "image",
        value: "./wyx/data/9.png"
    },
    {
        name: "0",
        type: "image",
        value: "./wyx/data/0.png"
    },
    {
        name: "ok",
        type: "image",
        value: "./wyx/data/ok.png"
    },
    {
        name: "turtle_up",
        type: "image",
        value: "./wyx/data/turtle_up.png"
    },
    {
        name: "turtle_down",
        type: "image",
        value: "./wyx/data/turtle_down.png"
    },
    {
        name: "turtle_left",
        type: "image",
        value: "./wyx/data/turtle_left.png"
    },
    {
        name: "turtle_right",
        type: "image",
        value: "./wyx/data/turtle_right.png"
    },
    {
        name: "brush",
        type: "image",
        value: "./wyx/data/wyx刷子白.png"
    },
    {
        name: "brush_black",
        type: "image",
        value: "./wyx/data/wyx刷子黑.png"
    },
    {
        name: "printmaking_uncolored",
        type: "image",
        value: "./wyx/data/wyx版画未上色.png"
    },
    {
        name: "printmaking_colored",
        type: "image",
        value: "./wyx/data/wyx版画上色.png"
    },
    {
        name: "paper",
        type: "image",
        value: "./wyx/data/wyx白纸.png"
    },
    {
        name: "printmaking_final",
        type: "image",
        value: "./wyx/data/wyx版画最终.png"
    },
    {
        name: "ink",
        type: "image",
        value: "./wyx/data/wyx油漆桶.png"
    },
    {
        name: "Consolas",
        type: "font",
        value: "./wyx/data/consola.ttf"
    }
]

var codes=
`#这个就是一个很简单的编程@sleep=3000@@delete=12@填入正确的代码吧@sleep=3000@@delete=8@相信你可以的@sleep=3000@@delete=7@import turtle
turtle.setup(935,935)@special=3@
turtle.penup()
turtle.goto(-336,-334)@move=0@
turtle.pendown()
turtle.@option=F@@insert=forward@(@number=30@)@move=1@
turtle.@option=L@@insert=left@(@number=90@)@turn=U@
turtle.@option=F@@insert=forward@(@number=20@)@move=2@
turtle.@option=R@@insert=right@(@number=90@)@turn=R@
turtle.@option=F@@insert=forward@(@number=20@)@move=3@
turtle.@option=R@@insert=right@(@number=90@)@turn=D@
turtle.@option=F@@insert=forward@(@number=40@)@move=4@
turtle.@option=L@@insert=left@(@number=90@)@turn=R@
turtle.@option=F@@insert=forward@(@number=60@)@move=5@
turtle.@option=L@@insert=left@(@number=90@)@turn=U@
turtle.@option=F@@insert=forward@(@special=0@
turtle.@option=L@@insert=left@(@number=90@)@turn=L@
turtle.@option=F@@insert=forward@(@number=40@)@move=7@
turtle.@option=R@@insert=right@(@number=90@)@turn=U@
turtle.@option=F@@insert=forward@(@number=40@)@move=8@
turtle.@option=R@@insert=right@(@number=90@)@turn=R@
turtle.@option=F@@insert=forward@(@number=60@)@move=9@
turtle.@option=L@@insert=left@(@number=90@)@turn=U@
turtle.@option=F@@insert=forward@(@number=30@)@move=10@@end=@`

function build(canvas){
    console.log("build");
    canvas.createNewScene("wyx_door_scene",res.getResource("wyx_door"));
    canvas.createNewScene("wyx_top_scene",res.getResource("wyx_top"));
    canvas.createNewScene("wyx_right_scene",res.getResource("wyx_right_bg"));
    canvas.createNewScene("wyx_left_scene",res.getResource("wyx_left_bg"));
    canvas.createNewScene("wyx_easter_egg",res.getResource("wyx_easter_egg"));
    var wyx_door_scene_left_arrow=new Button(canvas.scene("wyx_door_scene"),0,0,57,89,5,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("wyx_left_scene"),98,443);
    var wyx_door_scene_right_arrow=new Button(canvas.scene("wyx_door_scene"),0,0,57,89,5,res.getResource("right_arrow"),null,null,()=>{},()=>{
        canvas.changeScene("wyx_right_scene");
        foo();
    },777,443);
    var wyx_left_scene_right_arrow=new Button(canvas.scene("wyx_left_scene"),0,0,57,89,10,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("wyx_door_scene"),777,443);
    var wyx_right_scene_left_arrow=new Button(canvas.scene("wyx_right_scene"),0,0,57,89,0,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("wyx_door_scene"),98,443);
    var wyx_door_scene_up_arrow=new Button(canvas.scene("wyx_door_scene"),0,0,88,46,5,res.getResource("up_arrow"),null,null,()=>{},()=>canvas.changeScene("wyx_top_scene"),416,114);
    var wyx_top_scene_down_arrow=new Button(canvas.scene("wyx_top_scene"),0,0,88,46,0,res.getResource("down_arrow"),null,null,()=>{},()=>canvas.changeScene("wyx_door_scene"),416,833);

    var wyx_door_scene_lock=new Button(canvas.scene("wyx_door_scene"),0,0,0,0,1,res.getResource("lock"),null,null,()=>{},()=>{});
    wyx_door_scene_lock.setClickable(false);

    var wyx_answer_box=new Input(canvas.scene("wyx_door_scene"),"gameInput",453,468,1);
    wyx_answer_box.setTextAlign("center");
    wyx_answer_box.setFillColor("black");
    wyx_answer_box.setFontHeight(40);
    wyx_answer_box.setFont("黑体");
    wyx_answer_box.clear();
    var wyx_answer_box_fake_button=new Button(canvas.scene("wyx_door_scene"),362,395,180,98,2,null,null,null,()=>{},()=>{
        wyx_answer_box.enable();
        wyx_answer_box_fake_disable_button.setClickable(true);
        wyx_answer_box_fake_disable_button.setIgnoreClickEven(false);
    });
    wyx_answer_box_fake_button.setClickable(false);

    var wyx_answer_box_fake_disable_button=new Button(canvas.scene("wyx_door_scene"),0,0,935,935,10,null,null,null,()=>{},()=>{
        wyx_answer_box.disable();
        wyx_answer_box_fake_disable_button.setClickable(false);
        wyx_answer_box_fake_disable_button.setIgnoreClickEven(true);
    });
    wyx_answer_box_fake_disable_button.setClickable(false);
    wyx_answer_box_fake_disable_button.setIgnoreClickEven(true);

    var wyx_easter_egg_resolve;
    var wyx_easter_egg_fake_button=new Button(canvas.scene("wyx_easter_egg"),0,0,935,935,10,null,null,null,()=>{},()=>{
        wyx_easter_egg_resolve();
        canvas.changeScene("wyx_right_scene");
    });

    var mazeFlag=false;
    var fooFlag=false;
    const initalX=50;
    const initalY=300;
    var codeLines=[new Text(canvas.scene("wyx_right_scene"),initalX,initalY)];
    function foo(){
        if (fooFlag) return;
        fooFlag=true;
        const dy=40
        codeLines[0].setFillColor("#5ee9aaff");
        codeLines[0].setFont("Consolas");
        let nowChara=0;
        let targetTime=performance.now();
        const standardDelay=50;
        let running=true;
        let loop=async()=>{ //主循环
            if (targetTime<=performance.now()){
                if (codes[nowChara]==='\n'){ //处理换行
                    for (let i=0;i<codeLines.length;i++){
                        let p=codeLines[i].getPosition();
                        codeLines[i].setPostition(p.x,p.y-dy);
                    }
                    codeLines.push(new Text(canvas.scene("wyx_right_scene"),initalX,initalY));
                    codeLines[codeLines.length-1].setFillColor("#5ee9aaff");
                    codeLines[codeLines.length-1].setFont("Consolas");
                    nowChara++;
                    targetTime=performance.now()+standardDelay;
                }
                else if (codes[nowChara]==='@'){ //处理特殊命令
                    let command=codes.substring(nowChara+1,codes.indexOf('=',nowChara));
                    switch (command){
                        case "option":{
                            // console.log("option");
                            nowChara+=8;
                            await chooseOption([codes.substring(nowChara,codes.indexOf('@',nowChara))],initalX+codeLines[codeLines.length-1].getWidth().width,initalY);
                            nowChara+=2;
                            break;
                        }
                        case "delete":{
                            // console.log("delete");
                            let atIndex=codes.indexOf('@',nowChara+8);
                            let numstring=codes.substring(nowChara+8,atIndex);
                            let num=parseInt(numstring);
                            if (num===NaN) throw `codes delete at ${nowChara}: Not an int`;
                            codeLines[codeLines.length-1].value=codeLines[codeLines.length-1].value.substring(0,codeLines[codeLines.length-1].value.length-1);
                            if (num===1) nowChara=atIndex+1;
                            else codes=codes.substring(0,nowChara+8)+(num-1)+codes.substring(atIndex);
                            targetTime=performance.now()+standardDelay;
                            break;
                        }
                        case "number":{
                            let atIndex=codes.indexOf('@',nowChara+8);
                            let numstring=codes.substring(nowChara+8,atIndex);
                            let num=parseInt(numstring);
                            if (num===NaN) throw `codes number at ${nowChara}: Not an int`;
                            await inputNum([num],initalX+codeLines[codeLines.length-1].getWidth().width,initalY);
                            nowChara=atIndex+1;
                            break;
                        }
                        case "insert":{
                            let atIndex=codes.indexOf('@',nowChara+8);
                            let insertstring=codes.substring(nowChara+8,atIndex);
                            nowChara=atIndex+1;
                            codeLines[codeLines.length-1].value+=insertstring;
                            break;
                        }
                        case "move":{
                            let atIndex=codes.indexOf('@',nowChara+6);
                            let numstring=codes.substring(nowChara+6,atIndex);
                            let num=parseInt(numstring);
                            if (num===NaN) throw `codes move at ${nowChara}: Not an int`;
                            await moveTurtle(num);
                            nowChara=atIndex+1;
                            break;
                        }
                        case "turn":{
                            // console.log("option");
                            nowChara+=6;
                            switch (codes[nowChara]){
                                case 'R':
                                    turtle.to(0);
                                    break;
                                case 'L':
                                    turtle.to(1);
                                    break;
                                case 'U':
                                    turtle.to(2);
                                    break;
                                case 'D':
                                    turtle.to(3);
                                    break;
                            }
                            nowChara+=2;
                            break;
                        }
                        case "sleep":{
                            let atIndex=codes.indexOf('@',nowChara+7);
                            let numstring=codes.substring(nowChara+7,atIndex);
                            let num=parseInt(numstring);
                            if (num===NaN) throw `codes sleep at ${nowChara}: Not an int`;
                            // console.log(`sleep=${num}(${numstring})`);
                            targetTime=performance.now()+num;
                            nowChara=atIndex+1;
                            break;
                        }
                        case "special":{
                            let atIndex=codes.indexOf('@',nowChara+9);
                            let numstring=codes.substring(nowChara+9,atIndex);
                            let num=parseInt(numstring);
                            if (num===NaN) throw `codes special at ${nowChara}: Not an int`;
                            nowChara=atIndex+1;
                            await specialCommand[num](nowChara,initalX+codeLines[codeLines.length-1].getWidth().width,initalY);
                            break;
                        }
                        case "end":{
                            running=false;
                            mazeFlag=true;
                            check();
                            break;
                        }
                        default:
                            throw `unknown command "${command}"`;
                    }
                }
                else{
                    codeLines[codeLines.length-1].value+=codes[nowChara++];
                    targetTime=performance.now()+standardDelay;
                }
            }
            if (running) requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);
    }

    var specialCommand=[
        async function(nowChara,x,y){
            let result=await inputNum([20,70],x,y);
            if (result===20){
                codes=codes.substring(0,nowChara)+")@move=11@\nturtle.@special=1@"+codes.substring(nowChara);
            }
            else if (result===70){
                codes=codes.substring(0,nowChara)+")@move=6@"+codes.substring(nowChara);
            }
            else await specialCommand[0](nowChara,x,y);
        },
        async function(nowChara,x,y){
            let result=await chooseOption(['F','R'],x,y);
            if (result==='F'){
                codes=codes.substring(0,nowChara)+"@insert=forward@(@number=50@)@move=6@"+codes.substring(nowChara);
            }
            else if (result==='R'){
                codes=codes.substring(0,nowChara)+"@insert=right@(@number=90@)@turn=R@\nturtle.@option=F@@insert=forward@(@number=30@)@move=12@@special=2@\nturtle.@option=B@@insert=backward@(@number=30@)@move=11@\nturtle.@option=L@@insert=left@(@number=90@)@turn=U@\nturtle.@option=F@@insert=forward@(@number=50@)@move=6@"+codes.substring(nowChara);
            }
            else await specialCommand[1](nowChara,x,y);
        },
        async function(nowChara,x,y){
            await new Promise(resolve=>{
                wyx_easter_egg_resolve=resolve;
                canvas.changeScene("wyx_easter_egg");
            });
        },
        async function(){
            wyx_right_scene_turtle.setTransparentAlpha(1);
        }
    ]

    var optionResolves=[null,null,null,null];

    var wyx_right_scene_code_option_left=new Button(canvas.scene("wyx_right_scene"),0,0,237,62,5,res.getResource("code_option_left"),res.getResource("code_option_left_blue"),res.getResource("code_option_left_blue"),()=>{},()=>optionResolves[0]('L'));
    var wyx_right_scene_code_option_right=new Button(canvas.scene("wyx_right_scene"),0,0,237,62,5,res.getResource("code_option_right"),res.getResource("code_option_right_blue"),res.getResource("code_option_right_blue"),()=>{},()=>optionResolves[1]('R'));
    var wyx_right_scene_code_option_forward=new Button(canvas.scene("wyx_right_scene"),0,0,237,62,5,res.getResource("code_option_forward"),res.getResource("code_option_forward_blue"),res.getResource("code_option_forward_blue"),()=>{},()=>optionResolves[2]('F'));
    var wyx_right_scene_code_option_backward=new Button(canvas.scene("wyx_right_scene"),0,0,237,62,5,res.getResource("code_option_backward"),res.getResource("code_option_backward_blue"),res.getResource("code_option_backward_blue"),()=>{},()=>optionResolves[3]('B'));

    wyx_right_scene_code_option_left.setTransparentAlpha(0);
    wyx_right_scene_code_option_right.setTransparentAlpha(0);
    wyx_right_scene_code_option_forward.setTransparentAlpha(0);
    wyx_right_scene_code_option_backward.setTransparentAlpha(0);

    wyx_right_scene_code_option_left.setClickable(false);
    wyx_right_scene_code_option_right.setClickable(false);
    wyx_right_scene_code_option_forward.setClickable(false);
    wyx_right_scene_code_option_backward.setClickable(false);

    wyx_right_scene_code_option_left.setIgnoreClickEven(true);
    wyx_right_scene_code_option_right.setIgnoreClickEven(true);
    wyx_right_scene_code_option_forward.setIgnoreClickEven(true);
    wyx_right_scene_code_option_backward.setIgnoreClickEven(true);

    async function chooseOption(ans,x,y){
        // console.log(ans,x,y);
        wyx_right_scene_code_option_left.setPostition(x,y);
        wyx_right_scene_code_option_right.setPostition(x,y+62);
        wyx_right_scene_code_option_forward.setPostition(x,y+62*2);
        wyx_right_scene_code_option_backward.setPostition(x,y+62*3);
        
        wyx_right_scene_code_option_left.setTransparentAlpha(0.5);
        wyx_right_scene_code_option_right.setTransparentAlpha(0.5);
        wyx_right_scene_code_option_forward.setTransparentAlpha(0.5);
        wyx_right_scene_code_option_backward.setTransparentAlpha(0.5);

        wyx_right_scene_code_option_left.setClickable(true);
        wyx_right_scene_code_option_right.setClickable(true);
        wyx_right_scene_code_option_forward.setClickable(true);
        wyx_right_scene_code_option_backward.setClickable(true);
        
        wyx_right_scene_code_option_left.setIgnoreClickEven(false);
        wyx_right_scene_code_option_right.setIgnoreClickEven(false);
        wyx_right_scene_code_option_forward.setIgnoreClickEven(false);
        wyx_right_scene_code_option_backward.setIgnoreClickEven(false);

        let result=await Promise.any(
            [
                new Promise(resolve=>{
                    optionResolves[0]=resolve;
                }),
                new Promise(resolve=>{
                    optionResolves[1]=resolve;
                }),
                new Promise(resolve=>{
                    optionResolves[2]=resolve;
                }),
                new Promise(resolve=>{
                    optionResolves[3]=resolve;
                })
            ]
        )

        wyx_right_scene_code_option_left.setTransparentAlpha(0);
        wyx_right_scene_code_option_right.setTransparentAlpha(0);
        wyx_right_scene_code_option_forward.setTransparentAlpha(0);
        wyx_right_scene_code_option_backward.setTransparentAlpha(0);

        wyx_right_scene_code_option_left.setClickable(false);
        wyx_right_scene_code_option_right.setClickable(false);
        wyx_right_scene_code_option_forward.setClickable(false);
        wyx_right_scene_code_option_backward.setClickable(false);

        wyx_right_scene_code_option_left.setIgnoreClickEven(true);
        wyx_right_scene_code_option_right.setIgnoreClickEven(true);
        wyx_right_scene_code_option_forward.setIgnoreClickEven(true);
        wyx_right_scene_code_option_backward.setIgnoreClickEven(true);

        if (ans.every(v=>v!==result)){
            codeLines[codeLines.length-1].shakeHorizontally();
            await chooseOption(ans,x,y);
        }
        return result;
    }



    var wyx_right_scene_fake_text=new Text(canvas.scene("wyx_right_scene"),0,0,5);
    wyx_right_scene_fake_text.setTransparentAlpha(0);
    wyx_right_scene_fake_text.setFillColor("#5ee9aaff");
    wyx_right_scene_fake_text.setFont("Consolas");
    var inputNumAnswer;

    var OKresolve;
    var wyx_right_scene_number_keyboard=[];
    for (let i=0;i<10;i++) wyx_right_scene_number_keyboard.push(new Button(canvas.scene("wyx_right_scene"),0,0,100,100,5,res.getResource(`${i}`),null,null,()=>{},()=>{
        wyx_right_scene_fake_text.value+=`${i}`;
        // console.log(`${i}`);
    }));
    wyx_right_scene_number_keyboard.push(new Button(canvas.scene("wyx_right_scene"),0,0,100,100,5,res.getResource("ok"),null,null,()=>{},()=>{
        if (inputNumAnswer===null || inputNumAnswer.some(v=>v===wyx_right_scene_fake_text.value*1)) OKresolve();
        else{
            codeLines[codeLines.length-1].shakeHorizontally();
            wyx_right_scene_fake_text.clear();
        }
    }));
    for (let i=0;i<11;i++){
        wyx_right_scene_number_keyboard[i].setClickable(false);
        wyx_right_scene_number_keyboard[i].setIgnoreClickEven(true);
        wyx_right_scene_number_keyboard[i].setTransparentAlpha(0);
    }

    async function inputNum(ans,x,y){ //输入数字
        for (let i=0;i<9;i++){
            wyx_right_scene_number_keyboard[i+1].setPostition(x+(i%3)*100,y+Math.floor(i/3)*100);
        }
        wyx_right_scene_number_keyboard[0].setPostition(x,y+300);
        wyx_right_scene_number_keyboard[10].setPostition(x+100,y+300);
        wyx_right_scene_fake_text.setPostition(x,y);
        wyx_right_scene_fake_text.clear();
        for (let i=0;i<11;i++){
            wyx_right_scene_number_keyboard[i].setClickable(true);
            wyx_right_scene_number_keyboard[i].setIgnoreClickEven(false);
            wyx_right_scene_number_keyboard[i].setTransparentAlpha(0.5);
        }
        wyx_right_scene_fake_text.setTransparentAlpha(1);

        inputNumAnswer=ans;
        await new Promise(resolve=>{
            OKresolve=resolve;
        })

        if (ans!==null) codeLines[codeLines.length-1].value+=wyx_right_scene_fake_text.value;

        for (let i=0;i<11;i++){
            wyx_right_scene_number_keyboard[i].setClickable(false);
            wyx_right_scene_number_keyboard[i].setIgnoreClickEven(true);
            wyx_right_scene_number_keyboard[i].setTransparentAlpha(0);
        }
        wyx_right_scene_fake_text.setTransparentAlpha(0);
        return wyx_right_scene_fake_text.value*1;
    }

    var destinations=[
        {x:102,y:802,line:false},
        {x:272,y:802,line:true},
        {x:272,y:672,line:true},
        {x:385,y:672,line:true},
        {x:385,y:874,line:true},
        {x:737,y:874,line:true},
        {x:737,y:449,line:true},
        {x:491,y:449,line:true},
        {x:491,y:265,line:true},
        {x:855,y:265,line:true},
        {x:855,y:107,line:true},
        {x:737,y:761,line:true},
        {x:934,y:761,line:true}
    ];

    var turtle=new Animation([
        {
            image: res.getResource("turtle_right"),
            interval: Infinity
        },
        {
            image: res.getResource("turtle_left"),
            interval: Infinity
        },
        {
            image: res.getResource("turtle_up"),
            interval: Infinity
        },
        {
            image: res.getResource("turtle_down"),
            interval: Infinity
        }
    ])

    var wyx_right_scene_turtle=new Button(canvas.scene("wyx_right_scene"),468,468,0,0,0,turtle,null,null,()=>{},()=>{});
    wyx_right_scene_turtle.setClickable(false);
    wyx_right_scene_turtle.setIgnoreClickEven(true);
    wyx_right_scene_turtle.setTransparentAlpha(0);
    var lines=[];

    async function moveTurtle(des){
        const v=300;
        let moveReslove;
        let startP=wyx_right_scene_turtle.getPosition();
        startP.x+=12,startP.y+=12;
        let distance=Math.sqrt((startP.x-destinations[des].x)**2+(startP.y-destinations[des].y)**2);
        let startTime=performance.now();
        if (destinations[des].line){
            lines.push(new Line(canvas.scene("wyx_right_scene"),0));
            lines[lines.length-1].setStart(startP.x,startP.y);
            lines[lines.length-1].setEnd(startP.x,startP.y);
            lines[lines.length-1].setTransparentAlpha(1);
        }
        let loop=()=>{
            // console.log(wyx_right_scene_turtle.getPosition(),(startP.x-destinations[des].x)**2+(startP.y-destinations[des].y)**2);
            let nowTime=performance.now();
            let s=v/1000*(nowTime-startTime);
            if (s>=distance){
                wyx_right_scene_turtle.setPostition(destinations[des].x-12,destinations[des].y-12);
                moveReslove();
                return;
            }
            let sinx=(destinations[des].y-startP.y)/distance;
            let cosx=(destinations[des].x-startP.x)/distance;
            wyx_right_scene_turtle.setPostition(startP.x+s*cosx-12,startP.y+s*sinx-12);
            if (destinations[des].line){
                lines[lines.length-1].setEnd(startP.x+s*cosx,startP.y+s*sinx);
            }
            requestAnimationFrame(loop);
        }
        await new Promise(resolve=>{
            moveReslove=resolve;
            requestAnimationFrame(loop);
        });
    }

    var brush=new Animation([
        {
            image: res.getResource("brush"),
            interval: Infinity
        },
        {
            image: res.getResource("brush_black"),
            interval: Infinity
        }
    ]);
    var brushFlag=false;
    var wyx_left_scene_brush=new Button(canvas.scene("wyx_left_scene"),749,300,72,111,3,brush,null,null,()=>{},()=>{
        if (wyx_left_scene_brush.isCoincide(wyx_left_scene_ink)){
            brushFlag=true;
            brush.to(1);
        }
        if (brushFlag && wyx_left_scene_brush.isCoincide(wyx_left_scene_printmaking_uncolored)){
            colorLevel=Math.min(colorLevel+1,5);
            wyx_left_scene_printmaking_colored.setTransparentAlpha(colorLevel/5);
        }
        wyx_left_scene_brush.setPostition(749,300);
    });
    wyx_left_scene_brush.setDraggable(true);

    var wyx_left_scene_ink=new Button(canvas.scene("wyx_left_scene"),0,0,126,156,1,res.getResource("ink"),null,null,()=>{},()=>{},721,81);
    wyx_left_scene_ink.setClickable(false);

    var colorLevel=0;
    var wyx_left_scene_printmaking_uncolored=new Button(canvas.scene("wyx_left_scene"),0,0,335,393,0,res.getResource("printmaking_uncolored"),null,null,()=>{},()=>{},173,64);
    wyx_left_scene_printmaking_uncolored.setClickable(false);

    var wyx_left_scene_printmaking_colored=new Button(canvas.scene("wyx_left_scene"),0,0,335,393,1,res.getResource("printmaking_colored"),null,null,()=>{},()=>{},173,64);
    wyx_left_scene_printmaking_colored.setClickable(false);
    wyx_left_scene_printmaking_colored.setTransparentAlpha(0);

    var printmaking_final_flag=false;
    var wyx_left_scene_paper=new Button(canvas.scene("wyx_left_scene"),172,497,338,393,2,res.getResource("paper"),null,null,()=>{},()=>{
        if (colorLevel==5 && wyx_left_scene_paper.isCoincide(wyx_left_scene_printmaking_uncolored)){
            wyx_left_scene_paper.setTransparentAlpha(0);
            wyx_left_scene_paper.setClickable(false);
            wyx_left_scene_printmaking_final.floatUp(0,0,1000);
            printmaking_final_flag=true;
            check();
        }
        else{
            wyx_left_scene_paper.setPostition(172,497);
        }
    });
    wyx_left_scene_paper.setDraggable(true);

    var wyx_left_scene_printmaking_final=new Button(canvas.scene("wyx_left_scene"),0,0,0,0,4,res.getResource("printmaking_final"),null,null,()=>{},()=>{});
    wyx_left_scene_printmaking_final.setClickable(false);
    wyx_left_scene_printmaking_final.setIgnoreClickEven(true);
    wyx_left_scene_printmaking_final.setTransparentAlpha(0);

    function check(){
        if (printmaking_final_flag && mazeFlag){
            wyx_answer_box_fake_button.setClickable(true);
            wyx_door_scene_lock.setTransparentAlpha(0);
        }
    }

    canvas.changeScene("wyx_door_scene");
    // wyx_answer_box.enable();
}

var res;

function init(canvas){
    res=new Resource(cfg); //加载素材
    res.onload=()=>build(canvas); //仅测试用
}

export default{
    init,build
};
