"use strict"

import Resource from "../resource.js";
import Sprite from "../sprite.js";
import Canvas from "../canvas.js";
import Button from "../button.js";
import Animation from "../animation.js";
import Input from "../input.js";
import "../buttonPlugin.js";
import Music from "../music.js";

var cfg=[
    {
        name: "fmh_door_bg",
        type: "image",
        value: "./fmh/data/van背景门.jpg"
    },
    {
        name: "fmh_left_bg",
        type: "image",
        value: "./fmh/data/van左.jpg"
    },
    {
        name: "fmh_right_bg",
        type: "image",
        value: "./fmh/data/van右.jpg"
    },
    {
        name: "fmh_top_bg",
        type: "image",
        value: "./fmh/data/van顶.jpg"
    },
    {
        name: "fmh_light",
        type: "image",
        value: "./fmh/data/van灯.png"
    },
    {
        name: "left_arrow",
        type: "image",
        value: "./fmh/data/左.png"
    },
    {
        name: "right_arrow",
        type: "image",
        value: "./fmh/data/右.png"
    },
    {
        name: "up_arrow",
        type: "image",
        value: "./fmh/data/上.png"
    },
    {
        name: "down_arrow",
        type: "image",
        value: "./fmh/data/下.png"
    },
    {
        name: "lock",
        type: "image",
        value: "./fmh/data/锁.png"
    },
    {
        name: "top_bgm",
        type: "audio",
        value: "./fmh/data/上课铃.mp3"
    }
]

function build(canvas){
    console.log("build");
    canvas.createNewScene("fmh_door_scene",res.getResource("fmh_door_bg"));
    canvas.createNewScene("fmh_top_scene",res.getResource("fmh_top_bg"));
    canvas.createNewScene("fmh_left_scene",res.getResource("fmh_left_bg"));
    canvas.createNewScene("fmh_right_scene",res.getResource("fmh_right_bg"));
    var fmh_door_scene_left_arrow=new Button(canvas.scene("fmh_door_scene"),0,0,57,89,0,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("fmh_left_scene"),98,443);
    var fmh_door_scene_right_arrow=new Button(canvas.scene("fmh_door_scene"),0,0,57,89,0,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("fmh_right_scene"),777,443);
    var fmh_left_scene_right_arrow=new Button(canvas.scene("fmh_left_scene"),0,0,57,89,0,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("fmh_door_scene"),777,443);
    var fmh_right_scene_left_arrow=new Button(canvas.scene("fmh_right_scene"),0,0,57,89,0,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("fmh_door_scene"),98,443);
    var fmh_door_scene_up_arrow=new Button(canvas.scene("fmh_door_scene"),0,0,88,46,0,res.getResource("up_arrow"),null,null,()=>{},()=>canvas.changeScene("fmh_top_scene"),416,114);
    var fmh_top_scene_down_arrow=new Button(canvas.scene("fmh_top_scene"),0,0,88,46,0,res.getResource("down_arrow"),null,null,()=>{},()=>canvas.changeScene("fmh_door_scene"),416,833);
    
    var fmh_door_scene_lock=new Button(canvas.scene("fmh_door_scene"),0,0,0,0,1,res.getResource("lock"),null,null,()=>{},()=>{});
    fmh_door_scene_lock.setClickable(false);
    
    var fmh_answer_box=new Input(canvas.scene("fmh_door_scene"),"gameInput",453,468,1);
    fmh_answer_box.setTextAlign("center");
    fmh_answer_box.setFillColor("black");
    fmh_answer_box.setFontHeight(40);
    fmh_answer_box.setFont("黑体");
    fmh_answer_box.clear();
    var fmh_answer_box_fake_button=new Button(canvas.scene("fmh_door_scene"),362,395,180,98,2,null,null,null,()=>{},()=>{
        fmh_answer_box.enable();
        fmh_answer_box_fake_disable_button.setClickable(true);
        fmh_answer_box_fake_disable_button.setIgnoreClickEven(false);
    });
    fmh_answer_box_fake_button.setClickable(false);

    var fmh_answer_box_fake_disable_button=new Button(canvas.scene("fmh_door_scene"),0,0,935,935,2,null,null,null,()=>{},()=>{
        fmh_answer_box.disable();
        fmh_answer_box_fake_disable_button.setClickable(false);
        fmh_answer_box_fake_disable_button.setIgnoreClickEven(true);
    });
    fmh_answer_box_fake_disable_button.setClickable(false);
    fmh_answer_box_fake_disable_button.setIgnoreClickEven(true);

    var fmh_door_scene_clock=new Button(canvas.scene("fmh_door_scene"),370,162,155,155,11,null,null,null,()=>{
        //钟表指针
    },()=>{});

    canvas.changeScene("fmh_door_scene");
}

var res;

function init(canvas){
    res=new Resource(cfg); //加载素材
    res.onload=()=>build(canvas); //仅测试用
}

export default{
    init,build
};