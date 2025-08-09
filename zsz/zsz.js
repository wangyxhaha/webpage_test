"use strict"

import Resource from "../resource.js";
import Sprite from "../sprite.js";
import Canvas from "../canvas.js";
import Button from "../button.js";
import Animation from "../animation.js";
import Input from "../input.js";
import Text from "../text.js";
import "../buttonPlugin.js";
import "../spritePlugin.js";

var cfg=[
    {
        name: "zsz_door_bg",
        type: "image",
        value: "./zsz/data/zsz背景门.jpg"
    },
    {
        name: "zsz_top_bg",
        type: "image",
        value: "./zsz/data/zsz顶.jpg"
    },
    {
        name: "zsz_left_bg",
        type: "image",
        value: "./zsz/data/zsz左底图.jpg"
    },
    {
        name: "zsz_right_bg",
        type: "image",
        value: "./zsz/data/zsz右.jpg"
    },
    {
        name: "left_arrow",
        type: "image",
        value: "./zsz/data/左.png"
    },
    {
        name: "right_arrow",
        type: "image",
        value: "./zsz/data/右.png"
    },
    {
        name: "up_arrow",
        type: "image",
        value: "./zsz/data/上.png"
    },
    {
        name: "down_arrow",
        type: "image",
        value: "./zsz/data/下.png"
    },
    {
        name: "lock",
        type: "image",
        value: "./zsz/data/锁.png"
    },
    {
        name: "notice",
        type: "image",
        value: "./zsz/data/说明.png"
    },
    {
        name: "lose",
        type: "image",
        value: "./zsz/data/失败.png"
    },
    {
        name: "start",
        type: "image",
        value: "./zsz/data/start.png"
    },
    {
        name: "try_again",
        type: "image",
        value: "./zsz/data/try again.png"
    },
    {
        name: "zhoubin",
        type: "image",
        value: "./zsz/data/zsz周斌.png"
    },
    {
        name: "hand",
        type: "image",
        value: "./zsz/data/zsz手.png"
    },
    {
        name: "phone",
        type: "image",
        value: "./zsz/data/zsz手机.png"
    }
]

function build(canvas){
    console.log("build");
    canvas.createNewScene("zsz_door_scene",res.getResource("zsz_door_bg"));
    canvas.createNewScene("zsz_top_scene",res.getResource("zsz_top_bg"));
    canvas.createNewScene("zsz_left_scene",res.getResource("zsz_left_bg"));
    canvas.createNewScene("zsz_right_scene",res.getResource("zsz_right_bg"));
    var zsz_door_scene_left_arrow=new Button(canvas.scene("zsz_door_scene"),0,0,57,89,0,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("zsz_left_scene"),98,443);
    var zsz_door_scene_right_arrow=new Button(canvas.scene("zsz_door_scene"),0,0,57,89,0,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("zsz_right_scene"),777,443);
    var zsz_left_scene_right_arrow=new Button(canvas.scene("zsz_left_scene"),0,0,57,89,0,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("zsz_door_scene"),777,443);
    var zsz_right_scene_left_arrow=new Button(canvas.scene("zsz_right_scene"),0,0,57,89,0,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("zsz_door_scene"),98,443);
    var zsz_door_scene_up_arrow=new Button(canvas.scene("zsz_door_scene"),0,0,88,46,0,res.getResource("up_arrow"),null,null,()=>{},()=>canvas.changeScene("zsz_top_scene"),416,114);
    var zsz_top_scene_down_arrow=new Button(canvas.scene("zsz_top_scene"),0,0,88,46,0,res.getResource("down_arrow"),null,null,()=>{},()=>canvas.changeScene("zsz_door_scene"),416,833);
    
    var zsz_door_scene_lock=new Button(canvas.scene("zsz_door_scene"),0,0,0,0,1,res.getResource("lock"),null,null,()=>{},()=>{});
    zsz_door_scene_lock.setClickable(false);
    
    var zsz_answer_box=new Input(canvas.scene("zsz_door_scene"),"gameInput",453,468,1);
    zsz_answer_box.setTextAlign("center");
    zsz_answer_box.setFillColor("black");
    zsz_answer_box.setFontHeight(40);
    zsz_answer_box.setFont("黑体");
    zsz_answer_box.clear();
    var zsz_answer_box_fake_button=new Button(canvas.scene("zsz_door_scene"),362,395,180,98,2,null,null,null,()=>{},()=>{
        zsz_answer_box.enable();
        zsz_answer_box_fake_disable_button.setClickable(true);
        zsz_answer_box_fake_disable_button.setIgnoreClickEven(false);
    });
    zsz_answer_box_fake_button.setClickable(false);

    var zsz_answer_box_fake_disable_button=new Button(canvas.scene("zsz_door_scene"),0,0,935,935,2,null,null,null,()=>{},()=>{
        zsz_answer_box.disable();
        zsz_answer_box_fake_disable_button.setClickable(false);
        zsz_answer_box_fake_disable_button.setIgnoreClickEven(true);
    });
    zsz_answer_box_fake_disable_button.setClickable(false);
    zsz_answer_box_fake_disable_button.setIgnoreClickEven(true);

    var zsz_game_scene=new Animation([
        {
            image: res.getResource("notice"),
            interval: Infinity
        },
        {
            image: null,
            interval: Infinity
        },
        {
            image: res.getResource("lose"),
            interval: Infinity
        }
    ]
    );

    //TODO zsz左场景游戏搭建

    var zsz_left_scene_game_bg=new Button(canvas.scene("zsz_left_scene"),0,0,0,0,10,zsz_game_scene,null,null,()=>{},()=>{});

    var zsz_left_scene_start_button=new Button(canvas.scene("zsz_left_scene"),0,0,308,106,12,res.getResource("start"),null,null,()=>{
        zsz_game_scene.to(1);
        zsz_left_scene_start_button.setTransparentAlpha(0);
        zsz_left_scene_start_button.setClickable(false);
        zsz_left_scene_start_button.setIgnoreClickEven(true);
        console.log("Game Start");
        document.dispatchEvent(startEvent);
    },()=>{},305,555);

    var startEvent=new CustomEvent('startGame');
    var loseEvent=new CustomEvent('loseGame');

    var zsz_left_scene_lose_button=new Button(canvas.scene("zsz_left_scene"),0,0,255,67,11,res.getResource("try_again"),null,null,()=>{
        zsz_game_scene.to(0);
        zsz_left_scene_lose_button.setTransparentAlpha(0);
        zsz_left_scene_lose_button.setClickable(false);
        zsz_left_scene_start_button.setTransparentAlpha(1);
        zsz_left_scene_start_button.setClickable(true);
        zsz_left_scene_start_button.setIgnoreClickEven(false);
        
    },()=>{},336,610);
    zsz_left_scene_lose_button.setTransparentAlpha(0);
    zsz_left_scene_lose_button.setClickable(false);

    //TODO 显示倒计时

    var count_down_text=new Text(canvas.scene("zsz_left_scene"),556,60,31);
    count_down_text.setFillColor("Black");
    count_down_text.setFont("黑体");
    count_down_text.setFontHeight(40);
    count_down_text.setTransparentAlpha(0);
 
    document.addEventListener('startGame',()=>{
        //console.log("!start");
        zsz_left_scene_right_arrow.setTransparentAlpha(0);
        zsz_left_scene_right_arrow.setClickable(false);
        zsz_left_scene_phone.setTransparentAlpha(1);
        zsz_left_scene_phone.setPostition(383,464);
        var seconds=30; //设置倒计时时间
        count_down_text.value=`剩余时间：${seconds} s`;
        count_down_text.setTransparentAlpha(1);
        const timer=setInterval(()=>{
            count_down_text.value=`剩余时间：${seconds} s`;
            if(seconds==0){
                clearInterval(timer);
                clearInterval(teacherGenerator_hard);
                clearInterval(handGenerator_hard);
                document.dispatchEvent(loseEvent); //仅调试用
            }
            if(seconds==30){
                easyMode();
            }
            if(seconds==22){
                clearInterval(teacherGenerator_easy);
                clearInterval(handGenerator_easy);
                mediumMode();
            }
            if(seconds==13){
                clearInterval(teacherGenerator_medium);
                clearInterval(handGenerator_medium);
                hardMode();
            }
            seconds-=1;
        },1000);
    });

    document.addEventListener('loseGame',()=>{
        zsz_game_scene.to(2);
        count_down_text.setTransparentAlpha(0);
        zsz_left_scene_lose_button.setTransparentAlpha(1);
        zsz_left_scene_lose_button.setClickable(true);
        zsz_left_scene_phone.setTransparentAlpha(0);
        clearInterval(teacherGenerator_easy);
        clearInterval(teacherGenerator_medium);
        clearInterval(teacherGenerator_hard);
        clearInterval(handGenerator_easy);
        clearInterval(handGenerator_medium);
        clearInterval(handGenerator_hard);
    })

    //TODO 显示竖向周斌和横向手掌

    var teachers=[];
    var hands=[];

    function getRandomNum(min,max) {
        min=Math.ceil(min);
        max=Math.floor(max);
        return Math.floor(Math.random()*(max-min+1))+min;
    }

    var cnt1=0;
    var cnt2=0;

    var teacherGenerator_easy;
    var teacherGenerator_medium;
    var teacherGenerator_hard;
    var handGenerator_easy;
    var handGenerator_medium;
    var handGenerator_hard;

    function easyMode(){
        teacherGenerator_easy=setInterval(()=>{
            let x=getRandomNum(0,835);
            let speed=getRandomNum(4000,5000);
            teachers.push(new Button(canvas.scene("zsz_left_scene"),x,-200,0,0,11,res.getResource("zhoubin"),null,null,()=>{},()=>{}));
            teachers[cnt1].moveTo(x,1000,speed);
            cnt1++;
        },3000);
        handGenerator_easy=setInterval(()=>{
            let y=getRandomNum(0,835);
            let speed=getRandomNum(4000,5000);
            hands.push(new Button(canvas.scene("zsz_left_scene"),-200,y,0,0,11,res.getResource("hand"),null,null,()=>{},()=>{}));
            hands[cnt2].moveTo(1000,y,speed);
            cnt2++;
        },3000);
    }

    function mediumMode(){
        teacherGenerator_medium=setInterval(()=>{
            let x=getRandomNum(0,835);
            let speed=getRandomNum(3000,4000);
            teachers.push(new Button(canvas.scene("zsz_left_scene"),x,-200,0,0,11,res.getResource("zhoubin"),null,null,()=>{},()=>{}));
            teachers[cnt1].moveTo(x,1000,speed);
            cnt1++;
        },2000);
        handGenerator_medium=setInterval(()=>{
            let y=getRandomNum(0,835);
            let speed=getRandomNum(3000,4000);
            hands.push(new Button(canvas.scene("zsz_left_scene"),-200,y,0,0,11,res.getResource("hand"),null,null,()=>{},()=>{}));
            hands[cnt2].moveTo(1000,y,speed);
            cnt2++;
        },2000);
    }

    function hardMode(){
        teacherGenerator_hard=setInterval(()=>{
            let x=getRandomNum(0,835);
            let speed=getRandomNum(2000,3000);
            teachers.push(new Button(canvas.scene("zsz_left_scene"),x,-200,0,0,11,res.getResource("zhoubin"),null,null,()=>{},()=>{}));
            teachers[cnt1].moveTo(x,1000,speed);
            cnt1++;
        },1500);
        handGenerator_hard=setInterval(()=>{
            let y=getRandomNum(0,835);
            let speed=getRandomNum(2000,3000);
            hands.push(new Button(canvas.scene("zsz_left_scene"),-200,y,0,0,11,res.getResource("hand"),null,null,()=>{},()=>{}));
            hands[cnt2].moveTo(1000,y,speed);
            cnt2++;
        },1500);
    }

    //TODO 实现手机，判定失败

    var zsz_left_scene_phone=new Button(canvas.scene("zsz_left_scene"),383,464,142,244,10,res.getResource("phone"),null,null,()=>{},()=>{});
    zsz_left_scene_phone.setDraggable(true);
    zsz_left_scene_phone.setTransparentAlpha(0);

    canvas.changeScene("zsz_door_scene");
}

var res;

function init(canvas){
    res=new Resource(cfg); //加载素材
    res.onload=()=>build(canvas); //仅测试用
}

export default{
    init,build
};