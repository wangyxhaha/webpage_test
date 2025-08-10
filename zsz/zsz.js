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

    //TODO zsz左场景游戏搭建

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
    var winEvent=new CustomEvent('winGame');

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

    var seconds;
    var timer;
 
    document.addEventListener('startGame',()=>{
        //console.log("!start");
        for(let i=0;i<20;i++) teachers[i].setTransparentAlpha(1),hands[i].setTransparentAlpha(1);
        zsz_left_scene_right_arrow.setTransparentAlpha(0);
        zsz_left_scene_right_arrow.setClickable(false);
        zsz_left_scene_phone.setTransparentAlpha(1);
        zsz_left_scene_phone.setPostition(383,464);

        seconds=30; //设置倒计时时间
        let startTime=Date.now();
        let totalMs=seconds*1000;
        count_down_text.value=`剩余时间：${seconds} s`;
        count_down_text.setTransparentAlpha(1);
        let flag1=false,flag2=false,flag3=false;
        timer=setInterval(()=>{
            const elapsed=Date.now()-startTime;
            const remaining=Math.max(0,totalMs-elapsed);
            seconds=Math.ceil(remaining/1000);
            count_down_text.value=`剩余时间：${seconds} s`;

            if(seconds==0){
                clearInterval(timer);
                clearInterval(teacherGenerator_hard);
                clearInterval(handGenerator_hard);
                //document.dispatchEvent(loseEvent); //仅调试用
                document.dispatchEvent(winEvent);
            }
            if(seconds==29&&!flag1){
                easyMode();
                flag1=true;
            }
            if(seconds==22&&!flag2){
                clearInterval(teacherGenerator_easy);
                clearInterval(handGenerator_easy);
                mediumMode();
                flag2=true;
            }
            if(seconds==13&&!flag3){
                clearInterval(teacherGenerator_medium);
                clearInterval(handGenerator_medium);
                hardMode();
                flag3=true;
            }
            //seconds-=1;
        },100);
    });

    document.addEventListener('loseGame',()=>{
        zsz_game_scene.to(2);
        clearInterval(trackInterval);
        clearInterval(timer);
        count_down_text.setTransparentAlpha(0);
        zsz_left_scene_lose_button.setTransparentAlpha(1);
        zsz_left_scene_lose_button.setClickable(true);
        zsz_left_scene_phone.setTransparentAlpha(0);
        zsz_left_scene_right_arrow.setTransparentAlpha(1);
        zsz_left_scene_right_arrow.setClickable(true);
        clearInterval(teacherGenerator_easy);clearInterval(handGenerator_easy);
        clearInterval(teacherGenerator_medium);clearInterval(handGenerator_medium);
        clearInterval(teacherGenerator_hard);clearInterval(handGenerator_hard);
        for(let i=0;i<20;i++) teachers[i].setTransparentAlpha(0),hands[i].setTransparentAlpha(0);
        console.log("all clear");
    })

    document.addEventListener('winGame',()=>{
        count_down_text.value=`剩余时间：You Win!`;
        zsz_game_scene.to(1);
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

    for(let i=1;i<=20;i++){
        teachers.push(new Button(canvas.scene("zsz_left_scene"),-200,-200,0,0,11,res.getResource("zhoubin"),null,null,()=>{},()=>{}));
        hands.push(new Button(canvas.scene("zsz_left_scene"),-250,-250,0,0,11,res.getResource("hand"),null,null,()=>{},()=>{}));
    }

    function easyMode(){
        cnt1=cnt2=0;
        teacherGenerator_easy=setInterval(()=>{
            let y=getRandomNum(0,835);
            let speed=getRandomNum(4000,5000);
            teachers[cnt1].setPostition(-200,y);
            teachers[cnt1].moveTo(1000,y,speed);
            cnt1++;
        },2500);
        handGenerator_easy=setInterval(()=>{
            let x=getRandomNum(0,835);
            let speed=getRandomNum(4000,5000);
            hands[cnt2].setPostition(x,-250);
            hands[cnt2].moveTo(x,1000,speed);
            cnt2++;
        },2500);
    }

    function mediumMode(){
        cnt1=cnt2=0;
        teacherGenerator_medium=setInterval(()=>{
            let y=getRandomNum(0,835);
            let speed=getRandomNum(3000,4000);
            teachers[cnt1].setPostition(-200,y);
            teachers[cnt1].moveTo(1000,y,speed);
            cnt1++;
        },2000);
        handGenerator_medium=setInterval(()=>{
            let x=getRandomNum(0,835);
            let speed=getRandomNum(3000,4000);
            hands[cnt2].setPostition(x,-250);
            hands[cnt2].moveTo(x,1000,speed);
            cnt2++;
        },2000);
    }

    function hardMode(){ //FIXME 前后生成的两个物体距离过近导致卡关
        cnt1=cnt2=0;
        let x=0,y=0;
        teacherGenerator_hard=setInterval(()=>{
            //y=getRandomNum(0,835);
            y=checkPossible(y,getRandomNum(0,835),400);
            let speed=getRandomNum(2500,3500);
            teachers[cnt1].setPostition(-200,y);
            teachers[cnt1].moveTo(1000,y,speed);
            cnt1++;
        },1000);
        handGenerator_hard=setInterval(()=>{
            //x=getRandomNum(0,835);
            x=checkPossible(x,getRandomNum(0,835),300);
            let speed=getRandomNum(2500,3500);
            hands[cnt2].setPostition(x,-250);
            hands[cnt2].moveTo(x,1000,speed);
            cnt2++;
        },1000);
    }

    function checkPossible(lst,num,space){
        if(Math.abs(lst-num)>=space) return num;
        if(num>lst){
            if(lst+space>=835) return lst-space;
            else return lst+space; 
        }else{
            if(lst-space<=0) return lst+space;
            else return lst-space;
        }
    }

    //TODO 实现手机，判定失败

    var zsz_left_scene_phone=new Button(canvas.scene("zsz_left_scene"),383,464,142,244,10,res.getResource("phone"),null,null,()=>{},()=>{});
    zsz_left_scene_phone.setDraggable(true);
    zsz_left_scene_phone.setTransparentAlpha(0);

    var trackInterval;

    document.addEventListener('startGame',()=>{
        trackInterval=setInterval(()=>{
            for(let i=0;i<=19;i++){
                if(isHit(zsz_left_scene_phone.getPosition(),teachers[i].getPosition(),180-20,151-20)) document.dispatchEvent(loseEvent);
            }
            for(let i=0;i<=19;i++){
                if(isHit(zsz_left_scene_phone.getPosition(),hands[i].getPosition(),129-20,203-20)) document.dispatchEvent(loseEvent);
            }
        },100);
    });

    function isHit(p,object,l,h){
        return Math.max(p.x,object.x+10)<Math.min(p.x+142,object.x+10+l) && Math.max(p.y,object.y+10)<Math.min(p.y+244,object.y+10+h);
    }

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