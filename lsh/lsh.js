"use strict"

import Resource from "../resource.js";
import Sprite from "../sprite.js";
import Canvas from "../canvas.js";
import Button from "../button.js";
//import Animation from "../animation.js";
import Input from "../input.js";
import "../buttonPlugin.js";
//import Music from "../music.js";
//import Text from "../text.js";

var cfg=[
    {
        name: "lsh_door_bg",
        type: "image",
        value: "./lsh/data/lsh背景门.jpg"
    },
    {
        name: "lsh_top_bg",
        type: "image",
        value: "./lsh/data/lsh顶.jpg"
    },
    {
        name: "lsh_left_bg",
        type: "image",
        value: "./lsh/data/lsh左.jpg"
    },
    {
        name: "lsh_right_bg",
        type: "image",
        value: "./lsh/data/lsh右.jpg"
    },
    {
        name: "left_arrow",
        type: "image",
        value: "./lsh/data/左.png"
    },
    {
        name: "right_arrow",
        type: "image",
        value: "./lsh/data/右.png"
    },
    {
        name: "up_arrow",
        type: "image",
        value: "./lsh/data/上.png"
    },
    {
        name: "down_arrow",
        type: "image",
        value: "./lsh/data/下.png"
    },
    {
        name: "lock",
        type: "image",
        value: "./lsh/data/锁.png"
    },
    {
        name: "box",
        type: "image",
        value: "./lsh/data/lsh输入框.png"
    },
    {
        name: "lsh_figure",
        type: "image",
        value: "./lsh/data/lsh形象.png"
    },
    {
        name: "talking",
        type: "image",
        value: "./lsh/data/lsh语录.png"
    }
]

function build(canvas){
    console.log("build");
    canvas.createNewScene("lsh_door_scene",res.getResource("lsh_door_bg"));
    canvas.createNewScene("lsh_top_scene",res.getResource("lsh_top_bg"));
    canvas.createNewScene("lsh_left_scene",res.getResource("lsh_left_bg"));
    canvas.createNewScene("lsh_right_scene",res.getResource("lsh_right_bg"));
    var lsh_door_scene_left_arrow=new Button(canvas.scene("lsh_door_scene"),0,0,57,89,0,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("lsh_left_scene"),98,443);
    var lsh_door_scene_right_arrow=new Button(canvas.scene("lsh_door_scene"),0,0,57,89,31,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("lsh_right_scene"),777,443);
    var lsh_left_scene_right_arrow=new Button(canvas.scene("lsh_left_scene"),0,0,57,89,0,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("lsh_door_scene"),777,443);
    var lsh_right_scene_left_arrow=new Button(canvas.scene("lsh_right_scene"),0,0,57,89,0,res.getResource("left_arrow"),null,null,()=>checkAnswer(),()=>canvas.changeScene("lsh_door_scene"),98,443);
    var lsh_door_scene_up_arrow=new Button(canvas.scene("lsh_door_scene"),0,0,88,46,0,res.getResource("up_arrow"),null,null,()=>{},()=>canvas.changeScene("lsh_top_scene"),416,114);
    var lsh_top_scene_down_arrow=new Button(canvas.scene("lsh_top_scene"),0,0,88,46,0,res.getResource("down_arrow"),null,null,()=>{},()=>canvas.changeScene("lsh_door_scene"),416,833);
    
    var lsh_door_scene_lock=new Button(canvas.scene("lsh_door_scene"),0,0,0,0,1,res.getResource("lock"),null,null,()=>{},()=>{});
    lsh_door_scene_lock.setClickable(false);
    
    var lsh_answer_box=new Input(canvas.scene("lsh_door_scene"),"gameInput",453,468,1);
    lsh_answer_box.setTextAlign("center");
    lsh_answer_box.setFillColor("black");
    lsh_answer_box.setFontHeight(40);
    lsh_answer_box.setFont("黑体");
    lsh_answer_box.clear();
    var lsh_answer_box_fake_button=new Button(canvas.scene("lsh_door_scene"),362,395,180,98,2,null,null,null,()=>{},()=>{
        lsh_answer_box.enable();
        lsh_answer_box_fake_disable_button.setClickable(true);
        lsh_answer_box_fake_disable_button.setIgnoreClickEven(false);
    });
    lsh_answer_box_fake_button.setClickable(false);

    var lsh_answer_box_fake_disable_button=new Button(canvas.scene("lsh_door_scene"),0,0,935,935,2,null,null,null,()=>{},()=>{
        lsh_answer_box.disable();
        lsh_answer_box_fake_disable_button.setClickable(false);
        lsh_answer_box_fake_disable_button.setIgnoreClickEven(true);
    });
    lsh_answer_box_fake_disable_button.setClickable(false);
    lsh_answer_box_fake_disable_button.setIgnoreClickEven(true);

    //输入框

    const pw=document.createElement('input');
    pw.id="passwordInput";
    pw.maxLength="3";

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
        //console.log(lsh_right_scene_answer_box.value);
        if(lsh_right_scene_answer_box.inputElement.value=="坏殊殊"){
            lsh_door_scene_lock.setTransparentAlpha(0);
            lsh_answer_box_fake_button.setClickable(true);
        }
    }
    var flag=false;

    var lsh_right_scene_answer_box=new Input(canvas.scene("lsh_right_scene"),"passwordInput",455,540,23);
    lsh_right_scene_answer_box.setTextAlign("center");
    lsh_right_scene_answer_box.setFillColor("black");
    lsh_right_scene_answer_box.setFontHeight(40);
    lsh_right_scene_answer_box.setFont("黑体");
    lsh_right_scene_answer_box.clear();
    var lsh_right_scene_answer_box_fake_button=new Button(canvas.scene("lsh_right_scene"),0,0,189,73,22,res.getResource("box"),null,null,()=>{},()=>{
        lsh_right_scene_answer_box.enable();
        lsh_right_scene_bg_button.setClickable(true);
        lsh_right_scene_bg_button.setIgnoreClickEven(false);
    },358,483);

    var lsh_right_scene_bg_button=new Button(canvas.scene("lsh_right_scene"),0,0,935,935,21,null,null,null,()=>{
        checkAnswer();
        lsh_right_scene_answer_box.disable();
        lsh_right_scene_bg_button.setClickable(false);
        lsh_right_scene_bg_button.setIgnoreClickEven(true);
    },()=>{});
    lsh_right_scene_bg_button.setClickable(false);
    lsh_right_scene_bg_button.setIgnoreClickEven(true);

    var lsh_door_scene_figure=new Button(canvas.scene("lsh_door_scene"),0,0,245,268,21,res.getResource("lsh_figure"),null,null,()=>{
        lsh_door_scene_talking.setTransparentAlpha(1);
        lsh_door_scene_talking.slideTo(0,0,0.3);
    },()=>{},592,333);

    var lsh_door_scene_talking=new Button(canvas.scene("lsh_door_scene"),0,100,0,0,22,res.getResource("talking"),null,null,()=>{},()=>{});
    lsh_door_scene_talking.setTransparentAlpha(0);
    lsh_door_scene_talking.setClickable(false);

    canvas.changeScene("lsh_door_scene");
}

var res;

function init(canvas){
    res=new Resource(cfg); //加载素材
    res.onload=()=>build(canvas); //仅测试用
}

export default{
    init,build
};