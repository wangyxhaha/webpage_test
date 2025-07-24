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
        name: "zty_door_bg",
        type: "image",
        value: "./zty/data/天佑背景门.jpg"
    },
    {
        name: "zty_top_bg",
        type: "image",
        value: "./zty/data/天佑顶.jpg"
    },
    {
        name: "zty_left_bg",
        type: "image",
        value: "./zty/data/天佑左底图.jpg"
    },
    {
        name: "zty_right_bg",
        type: "image",
        value: "./zty/data/天佑右底图.jpg"
    },
    {
        name: "left_arrow",
        type: "image",
        value: "./zty/data/左.png"
    },
    {
        name: "right_arrow",
        type: "image",
        value: "./zty/data/右.png"
    },
    {
        name: "up_arrow",
        type: "image",
        value: "./zty/data/上.png"
    },
    {
        name: "down_arrow",
        type: "image",
        value: "./zty/data/下.png"
    },
    {
        name: "lock",
        type: "image",
        value: "./zty/data/锁.png"
    }
]

function build(canvas){
    console.log("build");
    canvas.createNewScene("zty_door_scene",res.getResource("zty_door_bg"));
    canvas.createNewScene("zty_top_scene",res.getResource("zty_top_bg"));
    canvas.createNewScene("zty_left_scene",res.getResource("zty_left_bg"));
    canvas.createNewScene("zty_right_scene",res.getResource("zty_right_bg"));
    var zty_door_scene_left_arrow=new Button(canvas.scene("zty_door_scene"),0,0,57,89,0,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("zty_left_scene"),98,443);
    var zty_door_scene_right_arrow=new Button(canvas.scene("zty_door_scene"),0,0,57,89,0,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("zty_right_scene"),777,443);
    var zty_left_scene_right_arrow=new Button(canvas.scene("zty_left_scene"),0,0,57,89,0,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("zty_door_scene"),777,443);
    var zty_right_scene_left_arrow=new Button(canvas.scene("zty_right_scene"),0,0,57,89,0,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("zty_door_scene"),98,443);
    var zty_door_scene_up_arrow=new Button(canvas.scene("zty_door_scene"),0,0,88,46,0,res.getResource("up_arrow"),null,null,()=>{},()=>canvas.changeScene("zty_top_scene"),416,114);
    var zty_top_scene_down_arrow=new Button(canvas.scene("zty_top_scene"),0,0,88,46,0,res.getResource("down_arrow"),null,null,()=>{},()=>canvas.changeScene("zty_door_scene"),416,833);
    
    var zty_door_scene_lock=new Button(canvas.scene("zty_door_scene"),0,0,0,0,1,res.getResource("lock"),null,null,()=>{},()=>{});
    zty_door_scene_lock.setClickable(false);
    
    var zty_answer_box=new Input(canvas.scene("zty_door_scene"),"gameInput",453,468,1);
    zty_answer_box.setTextAlign("center");
    zty_answer_box.setFillColor("black");
    zty_answer_box.setFontHeight(40);
    zty_answer_box.setFont("黑体");
    zty_answer_box.clear();
    var zty_answer_box_fake_button=new Button(canvas.scene("zty_door_scene"),362,395,180,98,2,null,null,null,()=>{},()=>{
        zty_answer_box.enable();
        zty_answer_box_fake_disable_button.setClickable(true);
        zty_answer_box_fake_disable_button.setIgnoreClickEven(false);
    });
    zty_answer_box_fake_button.setClickable(false);

    var zty_answer_box_fake_disable_button=new Button(canvas.scene("zty_door_scene"),0,0,935,935,2,null,null,null,()=>{},()=>{
        zty_answer_box.disable();
        zty_answer_box_fake_disable_button.setClickable(false);
        zty_answer_box_fake_disable_button.setIgnoreClickEven(true);
    });
    zty_answer_box_fake_disable_button.setClickable(false);
    zty_answer_box_fake_disable_button.setIgnoreClickEven(true);

    canvas.changeScene("zty_door_scene");
}

var res;

function init(canvas){
    res=new Resource(cfg); //加载素材
    res.onload=()=>build(canvas); //仅测试用
}

export default{
    init,build
};
