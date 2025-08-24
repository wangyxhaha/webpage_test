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
        name: "thw_door_bg",
        type: "image",
        value: "./thw/data/田汉文背景门.jpg"
    },
    {
        name: "thw_top_bg",
        type: "image",
        value: "./thw/data/田汉文顶.jpg"
    },
    {
        name: "thw_left_bg",
        type: "image",
        value: "./thw/data/田汉文左.jpg"
    },
    {
        name: "thw_right_bg",
        type: "image",
        value: "./thw/data/田汉文右.jpg"
    },
    {
        name: "left_arrow",
        type: "image",
        value: "./thw/data/左.png"
    },
    {
        name: "right_arrow",
        type: "image",
        value: "./thw/data/右.png"
    },
    {
        name: "up_arrow",
        type: "image",
        value: "./thw/data/上.png"
    },
    {
        name: "down_arrow",
        type: "image",
        value: "./thw/data/下.png"
    },
    {
        name: "lock",
        type: "image",
        value: "./thw/data/锁.png"
    },
    {
        name: "box",
        type: "image",
        value: "./thw/data/输入框.png"
    }
]

function build(canvas){
    console.log("build thw");
    canvas.createNewScene("thw_door_scene",res.getResource("thw_door_bg"));
    canvas.createNewScene("thw_top_scene",res.getResource("thw_top_bg"));
    canvas.createNewScene("thw_left_scene",res.getResource("thw_left_bg"));
    canvas.createNewScene("thw_right_scene",res.getResource("thw_right_bg"));
    var thw_door_scene_left_arrow=new Button(canvas.scene("thw_door_scene"),0,0,57,89,0,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("thw_left_scene"),98,443);
    var thw_door_scene_right_arrow=new Button(canvas.scene("thw_door_scene"),0,0,57,89,0,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("thw_right_scene"),777,443);
    var thw_left_scene_right_arrow=new Button(canvas.scene("thw_left_scene"),0,0,57,89,0,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("thw_door_scene"),777,443);
    var thw_right_scene_left_arrow=new Button(canvas.scene("thw_right_scene"),0,0,57,89,0,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("thw_door_scene"),98,443);
    var thw_door_scene_up_arrow=new Button(canvas.scene("thw_door_scene"),0,0,88,46,0,res.getResource("up_arrow"),null,null,()=>{},()=>canvas.changeScene("thw_top_scene"),416,114);
    var thw_top_scene_down_arrow=new Button(canvas.scene("thw_top_scene"),0,0,88,46,0,res.getResource("down_arrow"),null,null,()=>{},()=>canvas.changeScene("thw_door_scene"),416,833);
    
    var thw_door_scene_lock=new Button(canvas.scene("thw_door_scene"),0,0,0,0,1,res.getResource("lock"),null,null,()=>{},()=>{});
    thw_door_scene_lock.setClickable(false);
    
    var thw_answer_box=new Input(canvas.scene("thw_door_scene"),"gameInput",453,468,1);
    thw_answer_box.setTextAlign("center");
    thw_answer_box.setFillColor("black");
    thw_answer_box.setFontHeight(40);
    thw_answer_box.setFont("黑体");
    thw_answer_box.clear();
    var thw_answer_box_fake_button=new Button(canvas.scene("thw_door_scene"),362,395,191,78,2,null,null,null,()=>{},()=>{
        thw_answer_box.enable();
        thw_answer_box_fake_disable_button.setClickable(true);
        thw_answer_box_fake_disable_button.setIgnoreClickEvent(false);
    });
    thw_answer_box_fake_button.setClickable(false);

    var thw_answer_box_fake_disable_button=new Button(canvas.scene("thw_door_scene"),0,0,935,935,2,null,null,null,()=>{},()=>{
        thw_answer_box.disable();
        thw_answer_box_fake_disable_button.setClickable(false);
        thw_answer_box_fake_disable_button.setIgnoreClickEvent(true);
    });
    thw_answer_box_fake_disable_button.setClickable(false);
    thw_answer_box_fake_disable_button.setIgnoreClickEvent(true);

    //输入框

    const pw=document.createElement('input');
    pw.id="passwordInput";
    pw.maxLength="2";

    const style=document.createElement('style');
    //style.type='text/css';
    style.innerHTML=`
        #passwordInput{
            position: fixed;
            top: -100px;
            opacity: 0;
            height: 0;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(pw);

    function checkAnswer(){
        //console.log(thw_right_scene_answer_box.value);
        if(thw_left_scene_answer_box.inputElement.value=="6"){
            thw_door_scene_lock.setTransparentAlpha(0);
            thw_answer_box_fake_button.setClickable(true);
        }
    }

    var thw_left_scene_answer_box=new Input(canvas.scene("thw_left_scene"),"passwordInput",465,185,23);
    thw_left_scene_answer_box.setTextAlign("center");
    thw_left_scene_answer_box.setFillColor("black");
    thw_left_scene_answer_box.setFontHeight(40);
    thw_left_scene_answer_box.setFont("黑体");
    thw_left_scene_answer_box.clear();
    var thw_left_scene_answer_box_fake_button=new Button(canvas.scene("thw_left_scene"),370,129,191,78,22,res.getResource("box"),null,null,()=>{},()=>{
        thw_left_scene_answer_box.enable();
        thw_left_scene_bg_button.setClickable(true);
        thw_left_scene_bg_button.setIgnoreClickEvent(false);
    });

    var thw_left_scene_bg_button=new Button(canvas.scene("thw_left_scene"),0,0,935,935,21,null,null,null,()=>{
        checkAnswer();
        thw_left_scene_answer_box.disable();
        thw_left_scene_bg_button.setClickable(false);
        thw_left_scene_bg_button.setIgnoreClickEvent(true);
    },()=>{});
    thw_left_scene_bg_button.setClickable(false);
    thw_left_scene_bg_button.setIgnoreClickEvent(true);

    //canvas.changeScene("thw_door_scene");
}

var res;

function init(canvas){
    res=new Resource(cfg); //加载素材
    //res.onload=()=>build(canvas); //仅测试用
}

function destroy(canvas){
    canvas.deleteScene("thw_door_scene");
    canvas.deleteScene("thw_top_scene");
    canvas.deleteScene("thw_right_scene");
    canvas.deleteScene("thw_left_scene");
    console.log("des thw");
}

export default{
    init,build,destroy,
    setOnload: (ol)=>res.onload=ol
};