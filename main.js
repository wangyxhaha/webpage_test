"use strict"

import Resource from "./resource.js"
import Canvas from "./canvas.js";
import Button from "./button.js";
import Animation from "./animation.js";
import Input from "./input.js";
import "./buttonPlugin.js";
import "./spritePlugin.js";

var canvas=new Canvas("gameCanvas",935,935)


// import("./qsy/qsy.js")
// .then(module=>{
//     module.default.init(canvas);
// });

var menuResInfor=[
    {
        name: "menu_bg",
        type: "image",
        value: "./menu/封面底图.jpg"
    },
    {
        name: "door1",
        type: "image",
        value: "./menu/封面门1.png"
    },
    {
        name: "door2",
        type: "image",
        value: "./menu/封面门2.png"
    },
    {
        name: "new_game1",
        type: "image",
        value: "./menu/新游戏1.png"
    },
    {
        name: "new_game2",
        type: "image",
        value: "./menu/新游戏2.png"
    },
    {
        name: "continue1",
        type: "image",
        value: "./menu/继续1.png"
    },
    {
        name: "continue2",
        type: "image",
        value: "./menu/继续2.png"
    },
    {
        name: "exit1",
        type: "image",
        value: "./menu/退出1.png"
    },
    {
        name: "exit2",
        type: "image",
        value: "./menu/退出2.png"
    }
];

var menuRes=new Resource(menuResInfor);
menuRes.onload=async()=>{
    levelList=(await fetch("./levelList.json").then(responce=>responce.json()).catch(()=>{throw "关卡信息炸了"})).value;
    for (let i=0;i<levelList.length;i++){
        levelList[i].ready=false;
    }
    console.log(levelList);
    let doorAnimation=new Animation([
        {
            image: menuRes.getResource("door1"),
            interval: 200
        },
        {
            image: menuRes.getResource("door2"),
            interval: 200
        }
    ]);
    let newGameAnimation=new Animation([
        {
            image: menuRes.getResource("new_game1"),
            interval: 200
        },
        {
            image: menuRes.getResource("new_game2"),
            interval: 200
        }
    ]);
    let continueAnimation=new Animation([
        {
            image: menuRes.getResource("continue1"),
            interval: 200
        },
        {
            image: menuRes.getResource("continue2"),
            interval: 200
        }
    ]);
    let exitAnimation=new Animation([
        {
            image: menuRes.getResource("exit1"),
            interval: 200
        },
        {
            image: menuRes.getResource("exit2"),
            interval: 200
        }
    ]);
    doorAnimation.start();
    newGameAnimation.start();
    continueAnimation.start();
    exitAnimation.start();
    canvas.createNewScene("menu",menuRes.getResource("menu_bg"));
    let menu_door=new Button(canvas.scene("menu"),10,0,0,0,0,doorAnimation,null,null,()=>{},()=>{});
    let menu_new_game=new Button(canvas.scene("menu"),0,150,237,56,1,newGameAnimation,null,null,()=>{},()=>{
        nowLevel=0;
        loadLevel();
        controlLevel();
    },349,246);
    let menu_continue=new Button(canvas.scene("menu"),0,150,237,56,1,continueAnimation,null,null,()=>{},()=>{},349,394);
    let exitFlag=0;
    let menu_exit=new Button(canvas.scene("menu"),0,150,237,56,1,exitAnimation,null,null,()=>{},()=>{
        switch (exitFlag){
            case 0:
                alert("其实你直接关闭浏览器标签页就好了");
                exitFlag++;
                break;
            case 1:
                alert("真的，你直接关闭标签页就行了");
                exitFlag++;
                break;
            case 2:
                alert("行吧，我给你关了行吧");
                exitFlag++;
                window.close();
                break;
            case 3:
                alert("猜你想问：怎么还没关？\n事实是：有的浏览器的策略会限制代码关闭标签页的行为\n所以要不你换个浏览器，要不你自己关吧\nHave a nice day");
                break;
        }
        
    },349,546);
    canvas.changeScene("menu");
}

//异步加载关卡资源
var levelList;
var nowLevel;

async function loadLevel(){
    // levelList=(await fetch("./levelList.json").then(responce=>responce.json()).catch(()=>{throw "关卡信息炸了"})).value;
    // levelList[from].ready=true;
    // let nextLevel;
    // for (let i=from+1;i<levelList.length;i++){
    //     console.log(`loading: ${levelList[i].dir}`);
    //     nextLevel=await import(`./${levelList[i].dir}/${levelList[i].dir}.js`);
    //     nextLevel.init();
    //     levelList[i].ready=true;
    //     let stopWaiting;
    //     let loop=()=>{
    //         if (levelList[i-1].finish) stopWaiting();
    //         else requestAnimationFrame(loop);
    //     };
    //     await new Promise(resolve=>{
    //         stopWaiting=resolve;
    //         requestAnimationFrame(loop);
    //     });
    //     nowLevel=nextLevel;
    // }
    if (nowLevel===null) return;
    if (!levelList[nowLevel].ready){
        levelList[nowLevel].resource=await import(`./${levelList[nowLevel].dir}/${levelList[nowLevel].dir}.js`);
        levelList[nowLevel].resource.default.init();
        let stop=false;
        levelList[nowLevel].resource.default.setOnload(()=>stop=true);
        await until(()=>stop);
        levelList[nowLevel].ready=true;
    }
    if (!levelList[nowLevel+1].ready){
        levelList[nowLevel+1].resource=await import(`./${levelList[nowLevel+1].dir}/${levelList[nowLevel+1].dir}.js`);
        levelList[nowLevel+1].resource.default.init();
        let stop=false;
        levelList[nowLevel+1].resource.default.setOnload(()=>stop=true);
        await until(()=>stop);
        levelList[nowLevel+1].ready=true;
    }
    setTimeout(loadLevel,10);
}

//

async function until(requirement){
    let stopWaiting;
    let loop1=()=>{
        if (requirement()){
            stopWaiting();
            return;
        }
        setTimeout(loop1,10);
    };
    await new Promise(resolve=>{
        stopWaiting=resolve;
        loop1();
    });
}

var inputElement=document.getElementById("gameInput");

async function controlLevel(){
    console.log("cl");
    await until(()=>levelList[nowLevel].ready);
    levelList[nowLevel].resource.default.build(canvas);
    await until(()=>inputElement.value===levelList[nowLevel].ans);
    if (nowLevel<levelList.length-1){
        nowLevel++;
        setTimeout(controlLevel,10);
    }
    else{
        nowLevel=null;
        canvas.changeScene("menu");
    }
}




