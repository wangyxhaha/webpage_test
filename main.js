"use strict"

import Resource from "./resource.js"
import Canvas from "./canvas.js";
import Button from "./button.js";
import Animation from "./animation.js";
import Input from "./input.js";
import MyAudio from "./audio.js";
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
    },
    // {
    //     name: "victory",
    //     type: "image",
    //     value: "./menu/victory.png"
    // },
    {
        name: "open_door1",
        type: "image",
        value: "./menu/开门1.jpg"
    },
    {
        name: "open_door2",
        type: "image",
        value: "./menu/开门2.jpg"
    },
    {
        name: "open_door3",
        type: "image",
        value: "./menu/开门3.jpg"
    },
    {
        name: "open_door4",
        type: "image",
        value: "./menu/开门4.jpg"
    },
    {
        name: "open_door_sound",
        type: "audio",
        value: "./menu/开门音效.mp3"
    },
    {
        name: "bgm_menu",
        type: "audio",
        value: "./menu/莫愁乡.mp3"
    },
    {
        name: "bgm_boy",
        type: "audio",
        value: "./menu/bgm-钢琴.mp3"
    },
    {
        name: "bgm_girl",
        type: "audio",
        value: "./menu/bgm-弦乐.mp3"
    },
    {
        name: "start1",
        type: "image",
        value: "./menu/start1.png"
    },
    {
        name: "start2",
        type: "image",
        value: "./menu/start2.png"
    }
];

var menuRes=new Resource(menuResInfor);

var victory_open_door;
var victory_scene_resolve;

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
    let loadingAnimation=new Animation([
        {
            image: menuRes.getResource("loading1"),
            interval: 200
        },
        {
            image: menuRes.getResource("loading2"),
            interval: 200
        }
    ])
    doorAnimation.start();
    newGameAnimation.start();
    continueAnimation.start();
    exitAnimation.start();
    loadingAnimation.start();
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

    victory_open_door=new Animation([
        {
            image: menuRes.getResource("open_door1"),
            interval: 1000
        },
        {
            image: menuRes.getResource("open_door2"),
            interval: 75
        },
        {
            image: menuRes.getResource("open_door3"),
            interval: 75
        },
        {
            image: menuRes.getResource("open_door4"),
            interval: 75
        }
    ]);

    var victory_scene_img=new Button(canvas.scene("victory_scene"),0,0,935,935,1,victory_open_door,null,null,()=>{},()=>{
        if (victory_scene_resolve!=null) victory_scene_resolve();
    });

    canvas.createNewScene("loading_scene",loadingAnimation);


    canvas.createNewScene("start_scene");
    let start_animation=new Animation([
        {
            image: menuRes.getResource("start1"),
            interval: 200
        },
        {
            image: menuRes.getResource("start2"),
            interval: 200
        }
    ]);
    start_animation.start();

    let start_scene_item=new Button(canvas.scene("start_scene"),0,0,935,935,0,start_animation,null,null,()=>{},()=>{
        canvas.changeScene("menu")
        MyAudio.resume();
        MyAudio.play_bgm(menuRes.getResource("bgm_menu"));
    });

    canvas.changeScene("start_scene");
}

//异步加载关卡资源
var levelList;
var nowLevel;

async function loadLevel(){
    if (nowLevel===null) return;
    const _nowLevel=nowLevel;
    if (!levelList[_nowLevel].resReady){
        levelList[_nowLevel].resource=await import(`./${levelList[_nowLevel].dir}/${levelList[_nowLevel].dir}.js`);
        levelList[_nowLevel].resource.default.init();
        let stop=false;
        levelList[_nowLevel].resource.default.setOnload(()=>stop=true);
        await until(()=>stop);
        // levelList[_nowLevel].resource.default.build(canvas);
        levelList[_nowLevel].resReady=true;
    }
    if (_nowLevel+1<levelList.length && !levelList[_nowLevel+1].resReady){
        levelList[_nowLevel+1].resource=await import(`./${levelList[_nowLevel+1].dir}/${levelList[_nowLevel+1].dir}.js`);
        levelList[_nowLevel+1].resource.default.init();
        let stop=false;
        levelList[_nowLevel+1].resource.default.setOnload(()=>stop=true);
        await until(()=>stop);
        // levelList[_nowLevel+1].resource.default.build(canvas);
        levelList[_nowLevel+1].resReady=true;
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

function dataURLToImage(data){
    return new Promise(resolve=>{
        let img=new Image();
        img.src=data;
        img.onload=resolve(img);
    });
}

async function controlLevel(){
    console.log("cl");
    canvas.changeScene("loading_scene");
    await until(()=>levelList[nowLevel].resReady);

    if (localStorage.getItem("save")!=null){
        localStorage.removeItem("save");
    }
    localStorage.setItem("save",String(nowLevel));

    MyAudio.play_bgm(menuRes.getResource(`bgm_${levelList[nowLevel].bgm}`));

    console.log(levelList[nowLevel].resReady,nowLevel,levelList[nowLevel].resource.default);

    levelList[nowLevel].resource.default.build(canvas);
    canvas.changeScene(`${levelList[nowLevel].dir}_door_scene`);
    await until(()=>inputElement.value===levelList[nowLevel].ans);

    inputElement.value="";
    inputElement.blur();

    // let vimg_dataurl=document.getElementById("gameCanvas").toDataURL("image/png");
    // let vimg=await dataURLToImage(vimg_dataurl);
    // canvas.scene("victory_scene").setBackground(vimg);
    victory_open_door.reset();
    victory_open_door.start();
    menuRes.getResource("open_door_sound").play(0,"mute_bgm");
    setTimeout(()=>victory_open_door.pause(),1225);
    victory_scene_resolve=null;
    canvas.changeScene("victory_scene");
    await until(()=>victory_open_door.nowFrame()===3);
    await new Promise(resolve=>victory_scene_resolve=resolve);
    menuRes.getResource("open_door_sound").stop();

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


