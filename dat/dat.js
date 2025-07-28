"use strict"

import Resource from "../resource.js"
import Canvas from "../canvas.js";
import Button from "../button.js";
import Animation from "../animation.js";
import Input from "../input.js";
import "../buttonPlugin.js";
import "../spritePlugin.js"

var cfg=[ //所需素材的信息
    {
        name: "dat_door",
        type: "image",
        value: "./dat/data/dat背景门.jpg"
    },
    {
        name: "dat_top",
        type: "image",
        value: "./dat/data/dat顶.jpg"
    },
    {
        name: "dat_figure",
        type: "image",
        value: "./dat/data/dat形象.png"
    },
    {
        name: "dat_right_bg",
        type: "image",
        value: "./dat/data/dat右.jpg"
    },
    {
        name: "dat_left_bg",
        type: "image",
        value: "./dat/data/dat左底图.jpg"
    },
    {
        name: "left_arrow",
        type: "image",
        value: "./dat/data/左.png"
    },
    {
        name: "right_arrow",
        type: "image",
        value: "./dat/data/右.png"
    },
    {
        name: "up_arrow",
        type: "image",
        value: "./dat/data/上.png"
    },
    {
        name: "down_arrow",
        type: "image",
        value: "./dat/data/下.png"
    },
    {
        name: "lock",
        type: "image",
        value: "./dat/data/锁.png"
    },
    {
        name: "fire1",
        type: "image",
        value: "./dat/data/大火1.png"
    },
    {
        name: "fire2",
        type: "image",
        value: "./dat/data/大火2.png"
    },
    {
        name: "wonu1",
        type: "image",
        value: "./dat/data/倭奴1.png"
    },
    {
        name: "wonu2",
        type: "image",
        value: "./dat/data/倭奴2.png"
    },
    {
        name: "suanla1",
        type: "image",
        value: "./dat/data/酸辣1.png"
    },
    {
        name: "suanla2",
        type: "image",
        value: "./dat/data/酸辣2.png"
    },
    {
        name: "jiangshi1",
        type: "image",
        value: "./dat/data/僵尸尖叫1.png"
    },
    {
        name: "jiangshi2",
        type: "image",
        value: "./dat/data/僵尸尖叫2.png"
    },
    {
        name: "xian1",
        type: "image",
        value: "./dat/data/仙1.png"
    },
    {
        name: "xian2",
        type: "image",
        value: "./dat/data/仙2.png"
    },
    {
        name: "gong1",
        type: "image",
        value: "./dat/data/拱出去1.png"
    },
    {
        name: "gong2",
        type: "image",
        value: "./dat/data/拱出去2.png"
    },
    {
        name: "candle",
        type: "image",
        value: "./dat/data/蜡烛.png"
    },
    {
        name: "undo",
        type: "image",
        value: "./dat/data/撤销.png"
    },
    {
        name: "dat_saying1",
        type: "image",
        value: "./dat/data/dat语录1.png"
    },
    {
        name: "dat_saying2",
        type: "image",
        value: "./dat/data/dat语录2.png"
    }
]

function isIn(p){ //218 701 704 934
    return p.x>=218-100 && p.x<=704 && p.y>=701-100 && p.y<=934;
}

function build(canvas){
    console.log("build");
    canvas.createNewScene("dat_door_scene",res.getResource("dat_door"));
    canvas.createNewScene("dat_top_scene",res.getResource("dat_top"));
    canvas.createNewScene("dat_right_scene",res.getResource("dat_right_bg"));
    canvas.createNewScene("dat_left_scene",res.getResource("dat_left_bg"));
    var dat_door_scene_left_arrow=new Button(canvas.scene("dat_door_scene"),0,0,57,89,5,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("dat_left_scene"),98,443);
    var dat_door_scene_right_arrow=new Button(canvas.scene("dat_door_scene"),0,0,57,89,5,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("dat_right_scene"),777,443);
    var dat_left_scene_right_arrow=new Button(canvas.scene("dat_left_scene"),0,0,57,89,0,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("dat_door_scene"),777,443);
    var dat_right_scene_left_arrow=new Button(canvas.scene("dat_right_scene"),0,0,57,89,0,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("dat_door_scene"),98,443);
    var dat_door_scene_up_arrow=new Button(canvas.scene("dat_door_scene"),0,0,88,46,5,res.getResource("up_arrow"),null,null,()=>{},()=>canvas.changeScene("dat_top_scene"),416,114);
    var dat_top_scene_down_arrow=new Button(canvas.scene("dat_top_scene"),0,0,88,46,0,res.getResource("down_arrow"),null,null,()=>{},()=>canvas.changeScene("dat_door_scene"),416,833);
    
    var dat_door_scene_saying1=new Button(canvas.scene("dat_door_scene"),0,0,0,0,4,res.getResource("dat_saying1"),null,null,()=>{},()=>{});
    dat_door_scene_saying1.setIgnoreClickEven(true);
    dat_door_scene_saying1.setTransparentAlpha(0);

    var dat_door_scene_saying2=new Button(canvas.scene("dat_door_scene"),0,0,0,0,4,res.getResource("dat_saying2"),null,null,()=>{},()=>{});
    dat_door_scene_saying2.setIgnoreClickEven(true);
    dat_door_scene_saying2.setTransparentAlpha(0);

    var sayingCnt=0;
    var sayingWait=false;
    var dat_door_scene_figure=new Button(canvas.scene("dat_door_scene"),0,0,322,432,1,res.getResource("dat_figure"),null,null,()=>{},()=>{
        if (sayingWait) return;
        if (sayingCnt%2==0){
            dat_door_scene_saying1.floatUp(0,0,300);
            setTimeout(()=>dat_door_scene_saying1.setTransparentAlpha(0),2000);
        }
        else{
            dat_door_scene_saying2.floatUp(0,0,300);
            setTimeout(()=>dat_door_scene_saying2.setTransparentAlpha(0),2000);
        }
        sayingCnt++;
        sayingWait=true;
        setTimeout(()=>sayingWait=false,2500);
    },537,441);
    // dat_door_scene_figure.setClickable(false);

    var dat_door_scene_lock=new Button(canvas.scene("dat_door_scene"),0,0,0,0,1,res.getResource("lock"),null,null,()=>{},()=>{});
    dat_door_scene_lock.setClickable(false);

    var dat_answer_box=new Input(canvas.scene("dat_door_scene"),"gameInput",453,468,1);
    dat_answer_box.setTextAlign("center");
    dat_answer_box.setFillColor("black");
    dat_answer_box.setFontHeight(40);
    dat_answer_box.setFont("黑体");
    dat_answer_box.clear();
    var dat_answer_box_fake_button=new Button(canvas.scene("dat_door_scene"),362,395,180,98,2,null,null,null,()=>{},()=>{
        dat_answer_box.enable();
        dat_answer_box_fake_disable_button.setClickable(true);
        dat_answer_box_fake_disable_button.setIgnoreClickEven(false);
    });
    dat_answer_box_fake_button.setClickable(false);

    var dat_answer_box_fake_disable_button=new Button(canvas.scene("dat_door_scene"),0,0,935,935,10,null,null,null,()=>{},()=>{
        dat_answer_box.disable();
        dat_answer_box_fake_disable_button.setClickable(false);
        dat_answer_box_fake_disable_button.setIgnoreClickEven(true);
    });
    dat_answer_box_fake_disable_button.setClickable(false);
    dat_answer_box_fake_disable_button.setIgnoreClickEven(true);

    var fire_animation=new Animation(
        [
            {
                image: res.getResource("fire1"),
                interval: 333
            },
            {
                image: res.getResource("fire2"),
                interval: 333
            }
        ]);
    var dat_left_scene_fire=new Button(canvas.scene("dat_left_scene"),0,0,0,0,1,fire_animation,null,null,()=>{},()=>{});
    fire_animation.start();
    dat_left_scene_fire.setClickable(false);
    dat_left_scene_fire.setTransparentAlpha(0);


    var cnt=0;
    var flag1=false;

    function check1(){
        if (cnt==5) flag1=true;
    }

    var dat_left_scene_wonu2=new Button(canvas.scene("dat_left_scene"),0,0,0,0,11,res.getResource("wonu2"),null,null,()=>{},()=>{});
    dat_left_scene_wonu2.setClickable(false);
    dat_left_scene_wonu2.setTransparentAlpha(0);

    var dat_left_scene_suanla2=new Button(canvas.scene("dat_left_scene"),0,0,0,0,11,res.getResource("suanla2"),null,null,()=>{},()=>{});
    dat_left_scene_suanla2.setClickable(false);
    dat_left_scene_suanla2.setTransparentAlpha(0);

    var dat_left_scene_jiangshi2=new Button(canvas.scene("dat_left_scene"),0,0,0,0,11,res.getResource("jiangshi2"),null,null,()=>{},()=>{});
    dat_left_scene_jiangshi2.setClickable(false);
    dat_left_scene_jiangshi2.setTransparentAlpha(0);

    var dat_left_scene_xian2=new Button(canvas.scene("dat_left_scene"),0,0,0,0,11,res.getResource("xian2"),null,null,()=>{},()=>{});
    dat_left_scene_xian2.setClickable(false);
    dat_left_scene_xian2.setTransparentAlpha(0);

    var dat_left_scene_gong2=new Button(canvas.scene("dat_left_scene"),0,0,0,0,11,res.getResource("gong2"),null,null,()=>{},()=>{});
    dat_left_scene_gong2.setClickable(false);
    dat_left_scene_gong2.setTransparentAlpha(0);


    
    var dat_left_scene_wonu1=new Button(canvas.scene("dat_left_scene"),123,153,150,93,21,res.getResource("wonu1"),null,null,()=>{},()=>{
        if (isIn(dat_left_scene_wonu1.getPosition())){
            cnt++;
            dat_left_scene_wonu2.setTransparentAlpha(1);
            dat_left_scene_wonu1.setTransparentAlpha(0);
            dat_left_scene_wonu1.setDraggable(false);
            dat_left_scene_wonu1.setClickable(false);
            check1();
        }
        dat_left_scene_wonu1.stayIn();
    });
    dat_left_scene_wonu1.setDraggable(true);

    var dat_left_scene_suanla1=new Button(canvas.scene("dat_left_scene"),228,213,120,177,22,res.getResource("suanla1"),null,null,()=>{},()=>{
        if (isIn(dat_left_scene_suanla1.getPosition())){
            cnt++;
            dat_left_scene_suanla2.setTransparentAlpha(1);
            dat_left_scene_suanla1.setTransparentAlpha(0);
            dat_left_scene_suanla1.setDraggable(false);
            dat_left_scene_suanla1.setClickable(false);
            check1();
        }
        dat_left_scene_suanla1.stayIn();
    });
    dat_left_scene_suanla1.setDraggable(true);

    var dat_left_scene_jiangshi1=new Button(canvas.scene("dat_left_scene"),685,39,168,102,23,res.getResource("jiangshi1"),null,null,()=>{},()=>{
        if (isIn(dat_left_scene_jiangshi1.getPosition())){
            cnt++;
            dat_left_scene_jiangshi2.setTransparentAlpha(1);
            dat_left_scene_jiangshi1.setTransparentAlpha(0);
            dat_left_scene_jiangshi1.setDraggable(false);
            dat_left_scene_jiangshi1.setClickable(false);
            check1();
        }
        dat_left_scene_jiangshi1.stayIn();
    });
    dat_left_scene_jiangshi1.setDraggable(true);

    var dat_left_scene_xian1=new Button(canvas.scene("dat_left_scene"),487,117,112,105,24,res.getResource("xian1"),null,null,()=>{},()=>{
        if (isIn(dat_left_scene_xian1.getPosition())){
            cnt++;
            dat_left_scene_xian2.setTransparentAlpha(1);
            dat_left_scene_xian1.setTransparentAlpha(0);
            dat_left_scene_xian1.setDraggable(false);
            dat_left_scene_xian1.setClickable(false);
            check1();
        }
        dat_left_scene_xian1.stayIn();
    });
    dat_left_scene_xian1.setDraggable(true);

    var dat_left_scene_gong1=new Button(canvas.scene("dat_left_scene"),524,233,203,107,25,res.getResource("gong1"),null,null,()=>{},()=>{
        if (isIn(dat_left_scene_gong1.getPosition())){
            cnt++;
            dat_left_scene_gong2.setTransparentAlpha(1);
            dat_left_scene_gong1.setTransparentAlpha(0);
            dat_left_scene_gong1.setDraggable(false);
            dat_left_scene_gong1.setClickable(false);
            check1();
        }
        dat_left_scene_gong1.stayIn();
    });
    dat_left_scene_gong1.setDraggable(true);

    var dat_left_scene_candle=new Button(canvas.scene("dat_left_scene"),405,365,99,191,30,res.getResource("candle"),null,null,()=>{},()=>{
        if (isIn(dat_left_scene_candle.getPosition())){
            if (flag1){
                dat_left_scene_candle.setTransparentAlpha(0);
                dat_left_scene_candle.setDraggable(false);
                dat_left_scene_candle.setClickable(false);
                dat_left_scene_fire.setTransparentAlpha(1);
                dat_door_scene_lock.setTransparentAlpha(0);
                dat_answer_box_fake_button.setClickable(true);
            }
            else dat_left_scene_candle.setPostition(405,365);
        }
    });
    dat_left_scene_candle.setDraggable(true);

    var dat_left_scene_undo=new Button(canvas.scene("dat_left_scene"),30,30,113,113,40,res.getResource("undo"),null,null,()=>{},()=>{
        dat_left_scene_wonu1.setPostition(123,153);
        dat_left_scene_suanla1.setPostition(228,213);
        dat_left_scene_jiangshi1.setPostition(685,39);
        dat_left_scene_xian1.setPostition(487,117);
        dat_left_scene_gong1.setPostition(524,233);
        dat_left_scene_candle.setPostition(405,365);
    });

    canvas.changeScene("dat_door_scene");
    // dat_answer_box.enable();
}

var res;

function init(canvas){
    res=new Resource(cfg); //加载素材
    res.onload=()=>build(canvas); //仅测试用
}

export default{
    init,build
};
