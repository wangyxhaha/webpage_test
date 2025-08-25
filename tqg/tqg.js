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
        name: "tqg_door_bg",
        type: "image",
        value: "./tqg/data/唐钦格背景门.jpg"
    },
    {
        name: "tqg_top_bg",
        type: "image",
        value: "./tqg/data/唐钦格顶.jpg"
    },
    {
        name: "tqg_left_bg",
        type: "image",
        value: "./tqg/data/唐钦格左.jpg"
    },
    {
        name: "tqg_right_bg",
        type: "image",
        value: "./tqg/data/唐钦格右.jpg"
    },
    {
        name: "left_arrow",
        type: "image",
        value: "./tqg/data/左.png"
    },
    {
        name: "right_arrow",
        type: "image",
        value: "./tqg/data/右.png"
    },
    {
        name: "up_arrow",
        type: "image",
        value: "./tqg/data/上.png"
    },
    {
        name: "down_arrow",
        type: "image",
        value: "./tqg/data/下.png"
    },
    {
        name: "lock",
        type: "image",
        value: "./tqg/data/锁.png"
    },
    {
        name: "box",
        type: "image",
        value: "./tqg/data/输入框.png"
    }
]

function build(canvas){
    console.log("build tqg");
    canvas.createNewScene("tqg_door_scene",res.getResource("tqg_door_bg"));
    canvas.createNewScene("tqg_top_scene",res.getResource("tqg_top_bg"));
    canvas.createNewScene("tqg_left_scene",res.getResource("tqg_left_bg"));
    canvas.createNewScene("tqg_right_scene",res.getResource("tqg_right_bg"));
    var tqg_door_scene_left_arrow=new Button(canvas.scene("tqg_door_scene"),0,0,57,89,0,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("tqg_left_scene"),98,443);
    var tqg_door_scene_right_arrow=new Button(canvas.scene("tqg_door_scene"),0,0,57,89,0,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("tqg_right_scene"),777,443);
    var tqg_left_scene_right_arrow=new Button(canvas.scene("tqg_left_scene"),0,0,57,89,0,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("tqg_door_scene"),777,443);
    var tqg_right_scene_left_arrow=new Button(canvas.scene("tqg_right_scene"),0,0,57,89,0,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("tqg_door_scene"),98,443);
    var tqg_door_scene_up_arrow=new Button(canvas.scene("tqg_door_scene"),0,0,88,46,0,res.getResource("up_arrow"),null,null,()=>{},()=>canvas.changeScene("tqg_top_scene"),416,114);
    var tqg_top_scene_down_arrow=new Button(canvas.scene("tqg_top_scene"),0,0,88,46,0,res.getResource("down_arrow"),null,null,()=>{},()=>canvas.changeScene("tqg_door_scene"),416,833);
    
    var tqg_door_scene_lock=new Button(canvas.scene("tqg_door_scene"),0,0,0,0,1,res.getResource("lock"),null,null,()=>{},()=>{});
    tqg_door_scene_lock.setClickable(false);
    
    var tqg_answer_box=new Input(canvas.scene("tqg_door_scene"),"gameInput",453,468,1);
    tqg_answer_box.setTextAlign("center");
    tqg_answer_box.setFillColor("black");
    tqg_answer_box.setFontHeight(40);
    tqg_answer_box.setFont("黑体");
    tqg_answer_box.clear();
    var tqg_answer_box_fake_button=new Button(canvas.scene("tqg_door_scene"),362,395,191,78,2,null,null,null,()=>{},()=>{
        tqg_answer_box.enable();
        tqg_answer_box_fake_disable_button.setClickable(true);
        tqg_answer_box_fake_disable_button.setIgnoreClickEvent(false);
    });
    tqg_answer_box_fake_button.setClickable(false);

    var tqg_answer_box_fake_disable_button=new Button(canvas.scene("tqg_door_scene"),0,0,935,935,2,null,null,null,()=>{},()=>{
        tqg_answer_box.disable();
        tqg_answer_box_fake_disable_button.setClickable(false);
        tqg_answer_box_fake_disable_button.setIgnoreClickEvent(true);
    });
    tqg_answer_box_fake_disable_button.setClickable(false);
    tqg_answer_box_fake_disable_button.setIgnoreClickEvent(true);

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
        //console.log(tqg_right_scene_answer_box.value);
        if(tqg_left_scene_answer_box.inputElement.value=="6"){
            tqg_door_scene_lock.setTransparentAlpha(0);
            tqg_answer_box_fake_button.setClickable(true);
        }
    }

    var tqg_left_scene_answer_box=new Input(canvas.scene("tqg_left_scene"),"passwordInput",465,185,23);
    tqg_left_scene_answer_box.setTextAlign("center");
    tqg_left_scene_answer_box.setFillColor("black");
    tqg_left_scene_answer_box.setFontHeight(40);
    tqg_left_scene_answer_box.setFont("黑体");
    tqg_left_scene_answer_box.clear();
    var tqg_left_scene_answer_box_fake_button=new Button(canvas.scene("tqg_left_scene"),370,129,191,78,22,res.getResource("box"),null,null,()=>{},()=>{
        tqg_left_scene_answer_box.enable();
        tqg_left_scene_bg_button.setClickable(true);
        tqg_left_scene_bg_button.setIgnoreClickEvent(false);
    });

    var tqg_left_scene_bg_button=new Button(canvas.scene("tqg_left_scene"),0,0,935,935,21,null,null,null,()=>{
        checkAnswer();
        tqg_left_scene_answer_box.disable();
        tqg_left_scene_bg_button.setClickable(false);
        tqg_left_scene_bg_button.setIgnoreClickEvent(true);
    },()=>{});
    tqg_left_scene_bg_button.setClickable(false);
    tqg_left_scene_bg_button.setIgnoreClickEvent(true);

    canvas.changeScene("tqg_door_scene");
}

var res;

function init(canvas){
    res=new Resource(cfg); //加载素材
    res.onload=()=>build(canvas); //仅测试用
}

function destroy(canvas){
    canvas.deleteScene("tqg_door_scene");
    canvas.deleteScene("tqg_top_scene");
    canvas.deleteScene("tqg_right_scene");
    canvas.deleteScene("tqg_left_scene");
    console.log("des tqg");
}

export default{
    init,build,destroy,
    setOnload: (ol)=>res.onload=ol
};