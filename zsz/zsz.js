"use strict"

import Resource from "../resource.js";
import Sprite from "../sprite.js";
import Canvas from "../canvas.js";
import Button from "../button.js";
import Animation from "../animation.js";
import Input from "../input.js";
import "../buttonPlugin.js";
//import Music from "../music.js";
//import Text from "../text.js";

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