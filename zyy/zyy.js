"use strict"

import Resource from "../resource.js"
import Canvas from "../canvas.js";
import Button from "../button.js";
import Animation from "../animation.js";
import MyAudio from "../audio.js";
import Input from "../input.js";
import "../buttonPlugin.js";
import "../spritePlugin.js"

var cfg=[ //所需素材的信息
    {
        name: "zyy_door",
        type: "image",
        value: "./zyy/data/zyy背景门.jpg"
    },
    {
        name: "zyy_top",
        type: "image",
        value: "./zyy/data/zyy顶.jpg"
    },
    {
        name: "zyy_right_bg",
        type: "image",
        value: "./zyy/data/zyy右底图.jpg"
    },
    {
        name: "zyy_left_bg",
        type: "image",
        value: "./zyy/data/zyy左底图.jpg"
    },
    {
        name: "left_arrow",
        type: "image",
        value: "./zyy/data/左.png"
    },
    {
        name: "right_arrow",
        type: "image",
        value: "./zyy/data/右.png"
    },
    {
        name: "up_arrow",
        type: "image",
        value: "./zyy/data/上.png"
    },
    {
        name: "down_arrow",
        type: "image",
        value: "./zyy/data/下.png"
    },
    {
        name: "lock",
        type: "image",
        value: "./zyy/data/锁.png"
    },
    {
        name: "zyy_figure",
        type: "image",
        value: "./zyy/data/zyy形象.png"
    },
    {
        name: "computer",
        type: "image",
        value: "./zyy/data/电脑.png"
    },
    {
        name: "white_screen",
        type: "image",
        value: "./zyy/data/白屏.png"
    },
    {
        name: "baoquan_screen",
        type: "image",
        value: "./zyy/data/抱拳.png"
    },
    {
        name: "car_screen",
        type: "image",
        value: "./zyy/data/车.png"
    },
    {
        name: "wood_screen",
        type: "image",
        value: "./zyy/data/木棍.png"
    },
    {
        name: "ai_screen",
        type: "image",
        value: "./zyy/data/ai绘图.png"
    },
    {
        name: "fushishan_screen",
        type: "image",
        value: "./zyy/data/富士山下.png"
    },
    {
        name: "fushishanxia_audio",
        type: "audio",
        value: "./zyy/data/富士山下，5star版.mp3"
    },
    {
        name: "mochouxiang_audio",
        type: "audio",
        value: "./zyy/data/莫愁乡.mp3"
    },
    {
        name: "cry_gif",
        type: "gif",
        value: "./zyy/data/哭.gif"
    },
    {
        name: "laugh_gif",
        type: "gif",
        value: "./zyy/data/笑.gif"
    }
]

function build(canvas){
    console.log("build");
    canvas.createNewScene("zyy_door_scene",res.getResource("zyy_door"));
    canvas.createNewScene("zyy_top_scene",res.getResource("zyy_top"));
    canvas.createNewScene("zyy_right_scene",res.getResource("zyy_right_bg"));
    canvas.createNewScene("zyy_left_scene",res.getResource("zyy_left_bg"));

    var flag=0;
    
    var zyy_door_scene_left_arrow=new Button(canvas.scene("zyy_door_scene"),0,0,57,89,5,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("zyy_left_scene"),98,443);
    var zyy_door_scene_right_arrow=new Button(canvas.scene("zyy_door_scene"),0,0,57,89,5,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("zyy_right_scene"),777,443);
    var zyy_left_scene_right_arrow=new Button(canvas.scene("zyy_left_scene"),0,0,57,89,5,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("zyy_door_scene"),777,443);
    var zyy_right_scene_left_arrow=new Button(canvas.scene("zyy_right_scene"),0,0,57,89,50,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("zyy_door_scene"),98,443);
    var zyy_door_scene_up_arrow=new Button(canvas.scene("zyy_door_scene"),0,0,88,46,5,res.getResource("up_arrow"),null,null,()=>{},()=>canvas.changeScene("zyy_top_scene"),416,114);
    var zyy_top_scene_down_arrow=new Button(canvas.scene("zyy_top_scene"),0,0,88,46,0,res.getResource("down_arrow"),null,null,()=>{},()=>canvas.changeScene("zyy_door_scene"),416,833);

    var zyy_door_scene_zyy_figure=new Button(canvas.scene("zyy_door_scene"),0,0,175,264,1,res.getResource("zyy_figure"),null,null,()=>{},()=>{},608,288);
    zyy_door_scene_zyy_figure.setClickable(false);

    var zyy_door_scene_lock=new Button(canvas.scene("zyy_door_scene"),0,0,0,0,1,res.getResource("lock"),null,null,()=>{},()=>{});
    zyy_door_scene_lock.setClickable(false);

    var zyy_answer_box=new Input(canvas.scene("zyy_door_scene"),"gameInput",453,468,1);
    zyy_answer_box.setTextAlign("center");
    zyy_answer_box.setFillColor("black");
    zyy_answer_box.setFontHeight(40);
    zyy_answer_box.setFont("黑体");
    zyy_answer_box.clear();
    var zyy_answer_box_fake_button=new Button(canvas.scene("zyy_door_scene"),362,395,180,98,2,null,null,null,()=>{},()=>{
        zyy_answer_box.enable();
        zyy_answer_box_fake_disable_button.setClickable(true);
        zyy_answer_box_fake_disable_button.setIgnoreClickEvent(false);
    });
    zyy_answer_box_fake_button.setClickable(false);

    var zyy_answer_box_fake_disable_button=new Button(canvas.scene("zyy_door_scene"),0,0,935,935,10,null,null,null,()=>{},()=>{
        zyy_answer_box.disable();
        zyy_answer_box_fake_disable_button.setClickable(false);
        zyy_answer_box_fake_disable_button.setIgnoreClickEvent(true);
    });
    zyy_answer_box_fake_disable_button.setClickable(false);
    zyy_answer_box_fake_disable_button.setIgnoreClickEvent(true);

    var zyy_left_scene_screen=[
        new Button(canvas.scene("zyy_left_scene"),0,0,0,0,1,res.getResource("white_screen"),null,null,()=>{},()=>{}),
        new Button(canvas.scene("zyy_left_scene"),0,0,0,0,1,res.getResource("baoquan_screen"),null,null,()=>{},()=>{}),
        new Button(canvas.scene("zyy_left_scene"),0,0,0,0,1,res.getResource("car_screen"),null,null,()=>{},()=>{}),
        new Button(canvas.scene("zyy_left_scene"),0,0,0,0,1,res.getResource("wood_screen"),null,null,()=>{},()=>{}),
        new Button(canvas.scene("zyy_left_scene"),0,0,0,0,1,res.getResource("ai_screen"),null,null,()=>{},()=>{}),
        new Button(canvas.scene("zyy_left_scene"),0,0,0,0,1,res.getResource("fushishan_screen"),null,null,()=>{},()=>{})
    ]

    for (let i=1;i<=5;i++) zyy_left_scene_screen[i].setTransparentAlpha(0);

    var nowScreen=0;

    var zyy_left_scene_computer=new Button(canvas.scene("zyy_left_scene"),0,0,590,391,2,res.getResource("computer"),null,null,()=>{},()=>{
        zyy_left_scene_screen[nowScreen].setTransparentAlpha(0);
        nowScreen=(nowScreen+1)%6;
        zyy_left_scene_screen[nowScreen].setTransparentAlpha(1);
        res.getResource("mochouxiang_audio").stop();
        res.getResource("fushishanxia_audio").stop();
        if (nowScreen==2) res.getResource("mochouxiang_audio").play();
        if (nowScreen==5){
            res.getResource("fushishanxia_audio").play();
            zyy_door_scene_lock.setTransparentAlpha(0);
            zyy_answer_box_fake_button.setClickable(true);
        }
    },250,258);

    var zyy_top_scene_cry=new Button(canvas.scene("zyy_top_scene"),311-75,468-75,150,150,1,res.getResource("cry_gif"),null,null,()=>{},()=>{});
    res.getResource("cry_gif").start();
    zyy_top_scene_cry.setDraggable(true);

    var zyy_top_scene_laugh=new Button(canvas.scene("zyy_top_scene"),622-96,468-96,192,192,2,res.getResource("laugh_gif"),null,null,()=>{},()=>{});
    res.getResource("laugh_gif").start();
    zyy_top_scene_laugh.setDraggable(true);

    canvas.changeScene("zyy_door_scene");
    // zyy_answer_box.enable();
}

var res;

function init(canvas){
    res=new Resource(cfg); //加载素材
    // res.onload=()=>build(canvas); //仅测试用
}

function destroy(canvas){
    res.getResource("mochouxiang_audio").stop();
    res.getResource("fushishanxia_audio").stop();
    canvas.deleteScene("zyy_door_scene");
    canvas.deleteScene("zyy_top_scene");
    canvas.deleteScene("zyy_right_scene");
    canvas.deleteScene("zyy_left_scene");
    console.log("des zyy");
}

export default{
    init,build,destroy,
    setOnload: (ol)=>res.onload=ol
};
