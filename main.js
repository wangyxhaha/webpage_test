"use strict"

import Resource from "./resource.js"
import Canvas from "./canvas.js";
import Button from "./button.js";
import Animation from "./animation.js";
import Input from "./input.js";
import "./buttonPlugin.js";
import "./spritePlugin.js";

var canvas=new Canvas("gameCanvas",935,935);

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
    },
    {
        name: "loading1",
        type: "image",
        value: "./menu/loading1.png"
    },
    {
        name: "loading2",
        type: "image",
        value: "./menu/loading2.png"
    },
    {
        name: "victory",
        type: "image",
        value: "./menu/victory.png"
    }
];

var menuRes=new Resource(menuResInfor);
menuRes.onload=async()=>{
    levelList=(await fetch("./levelList.json").then(responce=>responce.json()).catch(()=>{throw "关卡信息炸了"})).value;
    for (let i=0;i<levelList.length;i++){
        levelList[i].resReady=false;
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
        // console.log("new game");
        if (localStorage.getItem("save")!=null){
            if (confirm("这会覆盖已有的存档，你确定吗？")){
                localStorage.removeItem("save");
            }
            else return;
        }
        nowLevel=0;
        loadLevel();
        controlLevel();
    },349,246);
    let menu_continue=new Button(canvas.scene("menu"),0,150,237,56,1,continueAnimation,null,null,()=>{},()=>{
        // console.log("new game");
        if (localStorage.getItem("save")===null){
            if (confirm("你现在没有存档，开始新游戏吗？")){
                nowLevel=0;
                loadLevel();
                controlLevel();
            }
            else return;
        }
        nowLevel=localStorage.getItem("save")*1;
        loadLevel();
        controlLevel();},349,394);
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

    canvas.createNewScene("victory_scene");
    let victory_scene_img=new Button(canvas.scene("victory_scene"),0,0,935,935,1,menuRes.getResource("victory"),null,null,()=>{},()=>{
        victory_scene_resolve();
    });

    canvas.changeScene("menu");
}

//异步加载关卡资源
var levelList;
var nowLevel;

async function loadLevel(){
    if (nowLevel===null) return;
    if (!levelList[nowLevel].resReady){
        levelList[nowLevel].resource=await import(`./${levelList[nowLevel].dir}/${levelList[nowLevel].dir}.js`);
        levelList[nowLevel].resource.default.init();
        let stop=false;
        levelList[nowLevel].resource.default.setOnload(()=>stop=true);
        await until(()=>stop);
        // levelList[nowLevel].resource.default.build(canvas);
        levelList[nowLevel].resReady=true;
    }
    if (nowLevel+1<levelList.length && !levelList[nowLevel+1].resReady){
        levelList[nowLevel+1].resource=await import(`./${levelList[nowLevel+1].dir}/${levelList[nowLevel+1].dir}.js`);
        levelList[nowLevel+1].resource.default.init();
        let stop=false;
        levelList[nowLevel+1].resource.default.setOnload(()=>stop=true);
        await until(()=>stop);
        // levelList[nowLevel+1].resource.default.build(canvas);
        levelList[nowLevel+1].resReady=true;
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

var victory_scene_resolve;

function dataURLToImage(data){
    return new Promise(resolve=>{
        let img=new Image();
        img.src=data;
        img.onload=resolve(img);
    });
}

async function controlLevel(){
    console.log("cl");
    await until(()=>levelList[nowLevel].resReady);
    if (localStorage.getItem("save")!=null){
        localStorage.removeItem("save");
    }
    localStorage.setItem("save",String(nowLevel));
    levelList[nowLevel].resource.default.build(canvas);
    canvas.changeScene(`${levelList[nowLevel].dir}_door_scene`);
    await until(()=>inputElement.value===levelList[nowLevel].ans);
    inputElement.value="";
    inputElement.blur();

    let vimg_dataurl=document.getElementById("gameCanvas").toDataURL("image/png");
    let vimg=await dataURLToImage(vimg_dataurl);
    canvas.scene("victory_scene").setBackground(vimg);
    canvas.changeScene("victory_scene");
    await new Promise(resolve=>victory_scene_resolve=resolve);

    levelList[nowLevel].resource.default.destroy(canvas);
    if (nowLevel<levelList.length-1){
        nowLevel++;
        setTimeout(controlLevel,10);
    }
    else{
        nowLevel=null;
        canvas.changeScene("menu");
    }
}

function setCookie(cookieName,cookieValue,exday){
    let time=new Date();
    time.setDate(time.getDate()+exday*24*60*60*1000);
    document.cookie=cookieName+'='+cookieValue+"; expires="+time.getUTCDate()+"; path=/";
}

function getCookie(cookieName){
    let cs=document.cookie.split(';');
    for (let i=0;i<cs.length;i++){
        if (cs[i].indexOf(cookieName)!==-1){
            return cs[i].substring(cookieName.length+1,cs[i].length);
        }
    }
    return "";
}


