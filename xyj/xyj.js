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
        name: "xyj_door_bg",
        type: "image",
        value: "./xyj/data/xyj背景门.jpg"
    },
    {
        name: "xyj_top_bg",
        type: "image",
        value: "./xyj/data/xyj顶.jpg"
    },
    {
        name: "xyj_left_bg",
        type: "image",
        value: "./xyj/data/xyj左.jpg"
    },
    {
        name: "xyj_right_bg",
        type: "image",
        value: "./xyj/data/xyj右.jpg"
    },
    {
        name: "left_arrow",
        type: "image",
        value: "./xyj/data/左.png"
    },
    {
        name: "right_arrow",
        type: "image",
        value: "./xyj/data/右.png"
    },
    {
        name: "up_arrow",
        type: "image",
        value: "./xyj/data/上.png"
    },
    {
        name: "down_arrow",
        type: "image",
        value: "./xyj/data/下.png"
    },
    {
        name: "lock",
        type: "image",
        value: "./xyj/data/锁.png"
    }
]

function build(canvas){
    console.log("build");
    canvas.createNewScene("xyj_door_scene",res.getResource("xyj_door_bg"));
    canvas.createNewScene("xyj_top_scene",res.getResource("xyj_top_bg"));
    canvas.createNewScene("xyj_left_scene",res.getResource("xyj_left_bg"));
    canvas.createNewScene("xyj_right_scene",res.getResource("xyj_right_bg"));
    var xyj_door_scene_left_arrow=new Button(canvas.scene("xyj_door_scene"),0,0,57,89,0,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("xyj_left_scene"),98,443);
    var xyj_door_scene_right_arrow=new Button(canvas.scene("xyj_door_scene"),0,0,57,89,0,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("xyj_right_scene"),777,443);
    var xyj_left_scene_right_arrow=new Button(canvas.scene("xyj_left_scene"),0,0,57,89,0,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("xyj_door_scene"),777,443);
    var xyj_right_scene_left_arrow=new Button(canvas.scene("xyj_right_scene"),0,0,57,89,0,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("xyj_door_scene"),98,443);
    var xyj_door_scene_up_arrow=new Button(canvas.scene("xyj_door_scene"),0,0,88,46,0,res.getResource("up_arrow"),null,null,()=>{},()=>canvas.changeScene("xyj_top_scene"),416,114);
    var xyj_top_scene_down_arrow=new Button(canvas.scene("xyj_top_scene"),0,0,88,46,0,res.getResource("down_arrow"),null,null,()=>{},()=>canvas.changeScene("xyj_door_scene"),416,833);
    
    var xyj_door_scene_lock=new Button(canvas.scene("xyj_door_scene"),0,0,0,0,1,res.getResource("lock"),null,null,()=>{},()=>{});
    xyj_door_scene_lock.setClickable(false);
    
    var xyj_answer_box=new Input(canvas.scene("xyj_door_scene"),"gameInput",453,468,1);
    xyj_answer_box.setTextAlign("center");
    xyj_answer_box.setFillColor("black");
    xyj_answer_box.setFontHeight(40);
    xyj_answer_box.setFont("黑体");
    xyj_answer_box.clear();
    var xyj_answer_box_fake_button=new Button(canvas.scene("xyj_door_scene"),362,395,180,98,2,null,null,null,()=>{},()=>{
        xyj_answer_box.enable();
        xyj_answer_box_fake_disable_button.setClickable(true);
        xyj_answer_box_fake_disable_button.setIgnoreClickEventt(false);
    });
    xyj_answer_box_fake_button.setClickable(false);

    var xyj_answer_box_fake_disable_button=new Button(canvas.scene("xyj_door_scene"),0,0,935,935,2,null,null,null,()=>{},()=>{
        xyj_answer_box.disable();
        xyj_answer_box_fake_disable_button.setClickable(false);
        xyj_answer_box_fake_disable_button.setIgnoreClickEventt(true);
    });
    xyj_answer_box_fake_disable_button.setClickable(false);
    xyj_answer_box_fake_disable_button.setIgnoreClickEventt(true);
    
    canvas.changeScene("xyj_door_scene");
}

var res;

function init(canvas){
    res=new Resource(cfg); //加载素材
    res.onload=()=>build(canvas); //仅测试用
}

export default{
    init,build
};