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
    //background
    {
        name: "top_bg1",
        type: "image",
        value: "./byz/data/冰毒顶1.jpg"
    },
    {
        name: "top_bg2",
        type: "image",
        value: "./byz/data/冰毒顶2.jpg"
    },
    {
        name: "door_bg_red",
        type: "image",
        value: "./byz/data/病毒背景门红.jpg"
    },
    {
        name: "door_bg_blue",
        type: "image",
        value: "./byz/data/病毒背景门蓝.jpg"
    },
    {
        name: "door_bg_green",
        type: "image",
        value: "./byz/data/病毒背景门绿.jpg"
    },
    {
        name: "right_bg_red",
        type: "image",
        value: "./byz/data/病毒右红.jpg"
    },
    {
        name: "right_bg_blue",
        type: "image",
        value: "./byz/data/冰毒右蓝.jpg"
    },
    {
        name: "right_bg_green",
        type: "image",
        value: "./byz/data/冰毒右绿.jpg"
    },
    {
        name: "left_bg_red",
        type: "image",
        value: "./byz/data/病毒左红.jpg"
    },
    {
        name: "left_bg_blue",
        type: "image",
        value: "./byz/data/病毒左蓝.jpg"
    },
    {
        name: "left_bg_green",
        type: "image",
        value: "./byz/data/病毒左绿.jpg"
    },
    //figure_original
    {
        name: "figure_original_arm1",
        type: "image",
        value: "./byz/data/病毒手臂1.png"
    },
    {
        name: "figure_original_arm2",
        type: "image",
        value: "./byz/data/病毒手臂2.png"
    },
    {
        name: "figure_original",
        type: "image",
        value: "./byz/data/病毒形象.png"
    },
    //figure_ear
    {
        name: "figure_ear_stop",
        type: "image",
        value: "./byz/data/病毒形象带耳机.png"
    },
    {
        name: "figure_ear_arm1",
        type: "image",
        value: "./byz/data/病毒手臂1带耳机.png"
    },
    {
        name: "figure_ear_arm2",
        type: "image",
        value: "./byz/data/病毒手臂2带耳机.png"
    },
    {
        name: "figure_ear_head1",
        type: "image",
        value: "./byz/data/病毒耳机上.png"
    },
    {
        name: "figure_ear_head2",
        type: "image",
        value: "./byz/data/病毒耳机上.png"
    },
    {
        name: "ear",
        type: "image",
        value: "./byz/data/病毒耳机.png"
    },
    //button
    {
        name: "light1",
        type: "image",
        value: "./byz/data/病毒灯线正常状态.png"
    },
    {
        name: "light2",
        type: "image",
        value: "./byz/data/病毒灯线下拉状态.png"
    },
    {
        name: "reset",
        type: "image",
        value: "./byz/data/复位键.png"
    },
    {
        name: "left_arrow",
        type: "image",
        value: "./byz/data/左.png"
    },
    {
        name: "right_arrow",
        type: "image",
        value: "./byz/data/右.png"
    },
    {
        name: "up_arrow",
        type: "image",
        value: "./byz/data/上.png"
    },
    {
        name: "down_arrow",
        type: "image",
        value: "./byz/data/下.png"
    },
    {
        name: "lock",
        type: "image",
        value: "./byz/data/锁.png"
    }
]

function build(canvas){
    console.log("build");

    var door_scene=new Animation([
        {
            image: res.getResource("door_bg_red"),
            interval: Infinity
        },
        {
            image: res.getResource("door_bg_blue"),
            interval: Infinity
        },
        {
            image: res.getResource("door_bg_green"),
            interval: Infinity
        }
    ])
    var left_scene=new Animation([
        {
            image: res.getResource("left_bg_red"),
            interval: Infinity
        },
        {
            image: res.getResource("left_bg_blue"),
            interval: Infinity
        },
        {
            image: res.getResource("left_bg_green"),
            interval: Infinity
        }
    ])
    var right_scene=new Animation([
        {
            image: res.getResource("right_bg_red"),
            interval: Infinity
        },
        {
            image: res.getResource("right_bg_blue"),
            interval: Infinity
        },
        {
            image: res.getResource("right_bg_green"),
            interval: Infinity
        }
    ])
    var top_scene=new Animation([
        {
            image: res.getResource("top_bg1"),
            interval: Infinity
        },
        {
            image: res.getResource("top_bg2"),
            interval: Infinity
        }
    ])

    function switchColour(){
        
    }

    canvas.createNewScene("byz_door_scene",door_scene);
    canvas.createNewScene("byz_top_scene",top_scene);
    canvas.createNewScene("byz_left_scene",left_scene);
    canvas.createNewScene("byz_right_scene",right_scene);

    var byz_door_scene_left_arrow=new Button(canvas.scene("byz_door_scene"),0,0,57,89,21,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("byz_left_scene"),98,443);
    var byz_door_scene_right_arrow=new Button(canvas.scene("byz_door_scene"),0,0,57,89,21,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("byz_right_scene"),777,443);
    var byz_left_scene_right_arrow=new Button(canvas.scene("byz_left_scene"),0,0,57,89,21,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("byz_door_scene"),777,443);
    var byz_right_scene_left_arrow=new Button(canvas.scene("byz_right_scene"),0,0,57,89,21,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("byz_door_scene"),98,443);
    var byz_door_scene_up_arrow=new Button(canvas.scene("byz_door_scene"),0,0,88,46,21,res.getResource("up_arrow"),null,null,()=>{},()=>canvas.changeScene("byz_top_scene"),416,114);
    var byz_top_scene_down_arrow=new Button(canvas.scene("byz_top_scene"),0,0,88,46,21,res.getResource("down_arrow"),null,null,()=>{},()=>canvas.changeScene("byz_door_scene"),416,833);
    
    var byz_door_scene_lock=new Button(canvas.scene("byz_door_scene"),0,0,0,0,1,res.getResource("lock"),null,null,()=>{},()=>{});
    byz_door_scene_lock.setClickable(false);
    
    var byz_answer_box=new Input(canvas.scene("byz_door_scene"),"gameInput",453,468,1);
    byz_answer_box.setTextAlign("center");
    byz_answer_box.setFillColor("black");
    byz_answer_box.setFontHeight(40);
    byz_answer_box.setFont("黑体");
    byz_answer_box.clear();
    var byz_answer_box_fake_button=new Button(canvas.scene("byz_door_scene"),362,395,180,98,32,null,null,null,()=>{},()=>{
        byz_answer_box.enable();
        byz_answer_box_fake_disable_button.setClickable(true);
        byz_answer_box_fake_disable_button.setIgnoreClickEven(false);
    });
    byz_answer_box_fake_button.setClickable(false);

    var byz_answer_box_fake_disable_button=new Button(canvas.scene("byz_door_scene"),0,0,935,935,2,null,null,null,()=>{},()=>{
        byz_answer_box.disable();
        byz_answer_box_fake_disable_button.setClickable(false);
        byz_answer_box_fake_disable_button.setIgnoreClickEven(true);
    });
    byz_answer_box_fake_disable_button.setClickable(false);
    byz_answer_box_fake_disable_button.setIgnoreClickEven(true);

    //门场景耳机


    //右场景灯光解密



    canvas.changeScene("byz_door_scene");
}

var res;

function init(canvas){
    res=new Resource(cfg); //加载素材
    res.onload=()=>build(canvas); //仅测试用
}

export default{
    init,build
};
