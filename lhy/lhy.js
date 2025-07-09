"use strict"

import Resource from "../resource.js";
import Sprite from "../sprite.js";
import Canvas from "../canvas.js";
import Button from "../button.js";
import Animation from "../animation.js";
import Input from "../input.js";
import "../buttonPlugin.js";

var cfg=[
    {
        name: "lhy_door_bg",
        type: "image",
        value: "./lhy/data/lhy背景门.jpg"
    },
    {
        name: "lhy_top_bg",
        type: "image",
        value: "./lhy/data/浩宇顶底图.jpg"
    },
    {
        name: "lhy_left_bg",
        type: "image",
        value: "./lhy/data/浩宇左底图.jpg"
    },
    {
        name: "lhy_right_bg",
        type: "image",
        value: "./lhy/data/浩宇右底图.jpg"
    },
    {
        name: "left_arrow",
        type: "image",
        value: "./lhy/data/左.png"
    },
    {
        name: "right_arrow",
        type: "image",
        value: "./lhy/data/右.png"
    },
    {
        name: "up_arrow",
        type: "image",
        value: "./lhy/data/上.png"
    },
    {
        name: "down_arrow",
        type: "image",
        value: "./lhy/data/下.png"
    },
    {
        name: "dui1",
        type: "image",
        value: "./lhy/data/对1.png"
    },
    {
        name: "dui2",
        type: "image",
        value: "./lhy/data/对2.png"
    },
    {
        name: "dui3",
        type: "image",
        value: "./lhy/data/对3.png"
    },
    {
        name: "dui4",
        type: "image",
        value: "./lhy/data/对4.png"
    },
    {
        name: "dui5",
        type: "image",
        value: "./lhy/data/对5.png"
    },
    {
        name: "cuo1",
        type: "image",
        value: "./lhy/data/错1.png"
    },
    {
        name: "cuo2",
        type: "image",
        value: "./lhy/data/错2.png"
    },
    {
        name: "cuo3",
        type: "image",
        value: "./lhy/data/错3.png"
    },
    {
        name: "cuo4",
        type: "image",
        value: "./lhy/data/错4.png"
    },
    {
        name: "cuo5",
        type: "image",
        value: "./lhy/data/错5.png"
    },
    {
        name: "daoxian1",
        type: "image",
        value: "./lhy/data/导线1.png"
    },
    {
        name: "daoxian2",
        type: "image",
        value: "./lhy/data/导线2.png"
    },
    {
        name: "dianyuan",
        type: "image",
        value: "./lhy/data/电源.png"
    },
    {
        name: "dianzu",
        type: "image",
        value: "./lhy/data/定值电阻.png"
    },
    {
        name: "heibi",
        type: "image",
        value: "./lhy/data/黑表笔.png"
    },
    {
        name: "hongbi",
        type: "image",
        value: "./lhy/data/红表笔.png"
    },
    {
        name: "qinxian",
        type: "image",
        value: "./lhy/data/浩宇琴弦.png"
    }
]

function build(canvas){
    console.log("build");
    canvas.createNewScene("lhy_door_scene",res.getResource("lhy_door_bg"));
    canvas.createNewScene("lhy_top_scene",res.getResource("lhy_top_bg"));
    canvas.createNewScene("lhy_left_scene",res.getResource("lhy_left_bg"));
    canvas.createNewScene("lhy_right_scene",res.getResource("lhy_right_bg"));
    var lhy_door_scene_left_arrow=new Button(canvas.scene("lhy_door_scene"),0,0,57,89,0,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("lhy_left_scene"),98,443);
    var lhy_door_scene_right_arrow=new Button(canvas.scene("lhy_door_scene"),0,0,57,89,0,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("lhy_right_scene"),777,443);
    var lhy_left_scene_right_arrow=new Button(canvas.scene("lhy_left_scene"),0,0,57,89,0,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("lhy_door_scene"),777,443);
    var lhy_right_scene_left_arrow=new Button(canvas.scene("lhy_right_scene"),0,0,57,89,0,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("lhy_door_scene"),98,443);
    var lhy_door_scene_up_arrow=new Button(canvas.scene("lhy_door_scene"),0,0,88,46,0,res.getResource("up_arrow"),null,null,()=>{},()=>canvas.changeScene("lhy_top_scene"),416,114);
    var lhy_top_scene_down_arrow=new Button(canvas.scene("lhy_top_scene"),0,0,88,46,0,res.getResource("down_arrow"),null,null,()=>{},()=>canvas.changeScene("lhy_door_scene"),416,833);

    var lhy_answer_box=new Input(canvas.scene("lhy_door_scene"),"gameInput",453,468,1);
    lhy_answer_box.setTextAlign("center");
    lhy_answer_box.setFillColor("black");
    lhy_answer_box.setFontHeight(40);
    lhy_answer_box.setFont("黑体");
    lhy_answer_box.clear();
    var lhy_answer_box_fake_button=new Button(canvas.scene("lhy_door_scene"),362,395,180,98,2,null,null,null,()=>{},()=>{
        lhy_answer_box.enable();
        lhy_answer_box_fake_disable_button.setClickable(true);
        lhy_answer_box_fake_disable_button.setIgnoreClickEven(false);
    });
    lhy_answer_box_fake_button.setClickable(false);

    var lhy_answer_box_fake_disable_button=new Button(canvas.scene("lhy_door_scene"),0,0,935,935,2,null,null,null,()=>{},()=>{
        lhy_answer_box.disable();
        lhy_answer_box_fake_disable_button.setClickable(false);
        lhy_answer_box_fake_disable_button.setIgnoreClickEven(true);
    });
    lhy_answer_box_fake_disable_button.setClickable(false);
    lhy_answer_box_fake_disable_button.setIgnoreClickEven(true);    


    canvas.changeScene("lhy_door_scene");
}

var res;

function init(canvas){
    res=new Resource(cfg); //加载素材
    res.onload=()=>build(canvas); //仅测试用
}

export default{
    init,build
};