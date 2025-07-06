"use strict"

import Resource from "../resource.js"
import Canvas from "../canvas.js";
import Button from "../button.js";
// import Input from "./input.js";

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
    }
]


function build(canvas){
    console.log("build");
    canvas.createNewScene("dat_door_scene",res.getResource("dat_door"));
    canvas.createNewScene("dat_top_scene",res.getResource("dat_top"));
    canvas.createNewScene("dat_right_scene",res.getResource("dat_right_bg"));
    canvas.createNewScene("dat_left_scene",res.getResource("dat_left_bg"));
    var dat_door_scene_left_arrow=new Button.Button(canvas.scene("dat_door_scene"),0,0,57,89,1,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("dat_left_scene"),98,443);
    var dat_door_scene_right_arrow=new Button.Button(canvas.scene("dat_door_scene"),0,0,57,89,1,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("dat_right_scene"),777,443);
    var dat_left_scene_right_arrow=new Button.Button(canvas.scene("dat_left_scene"),0,0,57,89,1,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("dat_door_scene"),777,443);
    var dat_right_scene_left_arrow=new Button.Button(canvas.scene("dat_right_scene"),0,0,57,89,1,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("dat_door_scene"),98,443);
    canvas.changeScene("dat_door_scene");
}

var res;

function init(canvas){
    res=new Resource.Resource(cfg); //加载素材
    res.onload=()=>build(canvas); //仅测试用
}

export default{
    init,build
};
