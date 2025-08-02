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
        value: "./byz/data/病毒顶2.jpg"
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
        value: "./byz/data/病毒耳机下.png"
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

function checkPosition(p){
    return p.x>=613-50 && p.x<=737 && p.y>=419-50 && p.y<=519;
}

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
    ]);
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
    ]);
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
    ]);
    var top_scene=new Animation([
        {
            image: res.getResource("top_bg1"),
            interval: Infinity
        },
        {
            image: res.getResource("top_bg2"),
            interval: Infinity
        }
    ]);

    function switchColour(){
        door_scene.nextFrame();
        left_scene.nextFrame();
        right_scene.nextFrame();
    }

    canvas.createNewScene("byz_door_scene",door_scene);
    canvas.createNewScene("byz_top_scene",top_scene);
    canvas.createNewScene("byz_left_scene",left_scene);
    canvas.createNewScene("byz_right_scene",right_scene);

    var byz_door_scene_light=new Button(canvas.scene("byz_door_scene"),251,0,55,56,31,res.getResource("light1"),null,res.getResource("light2"),()=>{
        switchColour();
    },()=>{},0,477);

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
    byz_answer_box.setFillColor("white");
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

    var figure_original_movearm=new Animation([
        {
            image: res.getResource("figure_original_arm1"),
            interval: 500
        },
        {
            image: res.getResource("figure_original_arm2"),
            interval: 500
        }
    ]);
    var figure_ear_movearm=new Animation([
        {
            image: res.getResource("figure_ear_arm1"),
            interval: 500
        },
        {
            image: res.getResource("figure_ear_arm2"),
            interval: 500
        }
    ]);
    var figure_ear_movehead=new Animation([
        {
            image: res.getResource("figure_ear_head1"),
            interval: 1000
        },
        {
            image: res.getResource("figure_ear_head2"),
            interval: 1000
        }
    ]);

    var byz_door_scene_figure_original_movearm=new Button(canvas.scene("byz_door_scene"),0,0,0,0,21,figure_original_movearm,null,null,()=>{},()=>{});
    byz_door_scene_figure_original_movearm.setTransparentAlpha(0);

    var byz_door_scene_figure_original=new Button(canvas.scene("byz_door_scene"),0,0,214,430,22,res.getResource("figure_original"),null,null,()=>{
        byz_door_scene_figure_original.setTransparentAlpha(0);
        byz_door_scene_figure_original_movearm.setTransparentAlpha(1);
        figure_original_movearm.start();
        setTimeout(()=>{
            byz_door_scene_figure_original.setTransparentAlpha(1);
            byz_door_scene_figure_original_movearm.setTransparentAlpha(0);
            figure_original_movearm.reset();
        },2000);
    },()=>{},575,420);

    var byz_door_scene_ear=new Button(canvas.scene("byz_door_scene"),305,838,64,59,31,res.getResource("ear"),null,null,()=>{},()=>{
        if(checkPosition(byz_door_scene_ear.getPosition())){
            byz_door_scene_figure_original.setTransparentAlpha(0);
            byz_door_scene_figure_original.setClickable(false);
            //byz_door_scene_figure_ear_movehead.setTransparentAlpha(1);
            //byz_door_scene_figure_ear_movehead.setClickable(true);
            figure_ear_movehead.start();
            byz_door_scene_ear.setTransparentAlpha(0);
            byz_door_scene_ear.setDraggable(false);

            var byz_door_scene_figure_ear_movearm=new Button(canvas.scene("byz_door_scene"),0,0,0,0,23,figure_ear_movearm,null,null,()=>{},()=>{});
            byz_door_scene_figure_ear_movearm.setTransparentAlpha(0);

            var byz_door_scene_figure_ear_movehead=new Button(canvas.scene("byz_door_scene"),0,0,214,430,24,figure_ear_movehead,null,null,()=>{
                //console.log("2");
                byz_door_scene_figure_ear_movehead.setTransparentAlpha(0);
                byz_door_scene_figure_ear_movehead.setClickable(false);
                byz_door_scene_figure_ear_movearm.setTransparentAlpha(1);
                figure_ear_movearm.start();
                setTimeout(()=>{
                    byz_door_scene_figure_ear_movehead.setTransparentAlpha(1);
                    byz_door_scene_figure_ear_movehead.setClickable(true);
                    byz_door_scene_figure_ear_movearm.setTransparentAlpha(0);
                    figure_ear_movearm.reset();
                },2000);
            },()=>{},575,420);
            byz_door_scene_figure_ear_movehead.setTransparentAlpha(1);
            byz_door_scene_figure_ear_movehead.setClickable(true);            
        }
    });
    byz_door_scene_ear.setDraggable(true);


    //上场景答题

    //TODO 使用DOM动态注册input标签

    const pw=document.createElement('input');
    pw.id="passwordInput";
    pw.maxLength="9";

    document.body.appendChild(pw);

    var byz_top_scene_anwser_box=new Input(canvas.scene("byz_top_scene"),"passwordInput",173,441,11);
    byz_top_scene_anwser_box.setTextAlign("center");
    byz_top_scene_anwser_box.setFillColor("black");
    byz_top_scene_anwser_box.setFontHeight(40);
    byz_top_scene_anwser_box.setFont("黑体");
    byz_top_scene_anwser_box.clear();

    byz_top_scene_anwser_box.enable();

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
