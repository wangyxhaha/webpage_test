"use strict"

import Resource from "../resource.js"
import Canvas from "../canvas.js";
import Button from "../button.js";
import Animation from "../animation.js";
import Input from "../input.js";
import "../buttonPlugin.js";
import "../spritePlugin.js"

var cfg=[ //所需素材的信息
    {
        name: "gy_door",
        type: "image",
        value: "./gy/data/高原背景门.jpg"
    },
    {
        name: "gy_top",
        type: "image",
        value: "./gy/data/高原顶.jpg"
    },
    {
        name: "gy_hit_rocket1",
        type: "image",
        value: "./gy/data/高原动图1.png"
    },
    {
        name: "gy_hit_rocket2",
        type: "image",
        value: "./gy/data/高原动图2.png"
    },
    {
        name: "gy_hit_rocket3",
        type: "image",
        value: "./gy/data/高原动图3.png"
    },
    {
        name: "gy_right_bg",
        type: "image",
        value: "./gy/data/高原右底图.jpg"
    },
    {
        name: "gy_left_bg",
        type: "image",
        value: "./gy/data/高原左底图.jpg"
    },
    {
        name: "left_arrow",
        type: "image",
        value: "./gy/data/左.png"
    },
    {
        name: "right_arrow",
        type: "image",
        value: "./gy/data/右.png"
    },
    {
        name: "up_arrow",
        type: "image",
        value: "./gy/data/上.png"
    },
    {
        name: "down_arrow",
        type: "image",
        value: "./gy/data/下.png"
    },
    {
        name: "lock",
        type: "image",
        value: "./gy/data/锁.png"
    },
    {
        name: "liekai",
        type: "image",
        value: "./gy/data/高原裂开.png"
    },
    {
        name: "genshin",
        type: "image",
        value: "./gy/data/高原原神启动.png"
    }
]

function isIn(p){ //218 701 704 934
    return p.x>=218-100 && p.x<=704 && p.y>=701-100 && p.y<=934;
}

function build(canvas){
    console.log("build");
    canvas.createNewScene("gy_door_scene",res.getResource("gy_door"));
    canvas.createNewScene("gy_top_scene",res.getResource("gy_top"));
    canvas.createNewScene("gy_right_scene",res.getResource("gy_right_bg"));
    canvas.createNewScene("gy_left_scene",res.getResource("gy_left_bg"));
    var gy_door_scene_left_arrow=new Button(canvas.scene("gy_door_scene"),0,0,57,89,5,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("gy_left_scene"),98,443);
    var gy_door_scene_right_arrow=new Button(canvas.scene("gy_door_scene"),0,0,57,89,5,res.getResource("right_arrow"),null,null,()=>{},()=>{
        gy_hit_rocket_animation.reset();
        gy_hit_rocket_animation.start();
        gy_right_scene_genshin.setTransparentAlpha(0);
        setTimeout(()=>gy_hit_rocket_animation.pause(),350);
        setTimeout(()=>gy_right_scene_genshin.floatUp(0,0,500),1000);
        setTimeout(()=>gy_right_scene_genshin.setTransparentAlpha(0),2500);
        canvas.changeScene("gy_right_scene");
    },777,443);
    var gy_left_scene_right_arrow=new Button(canvas.scene("gy_left_scene"),0,0,57,89,0,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("gy_door_scene"),777,443);
    var gy_right_scene_left_arrow=new Button(canvas.scene("gy_right_scene"),0,0,57,89,0,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("gy_door_scene"),98,443);
    var gy_door_scene_up_arrow=new Button(canvas.scene("gy_door_scene"),0,0,88,46,5,res.getResource("up_arrow"),null,null,()=>{},()=>canvas.changeScene("gy_top_scene"),416,114);
    var gy_top_scene_down_arrow=new Button(canvas.scene("gy_top_scene"),0,0,88,46,0,res.getResource("down_arrow"),null,null,()=>{},()=>canvas.changeScene("gy_door_scene"),416,833);
    
    var gy_door_scene_saying1=new Button(canvas.scene("gy_door_scene"),0,0,0,0,4,res.getResource("gy_saying1"),null,null,()=>{},()=>{});
    gy_door_scene_saying1.setIgnoreClickEven(true);
    gy_door_scene_saying1.setTransparentAlpha(0);

    var gy_door_scene_saying2=new Button(canvas.scene("gy_door_scene"),0,0,0,0,4,res.getResource("gy_saying2"),null,null,()=>{},()=>{});
    gy_door_scene_saying2.setIgnoreClickEven(true);
    gy_door_scene_saying2.setTransparentAlpha(0);

    var gy_door_scene_lock=new Button(canvas.scene("gy_door_scene"),0,0,0,0,1,res.getResource("lock"),null,null,()=>{},()=>{});
    gy_door_scene_lock.setClickable(false);

    var gy_answer_box=new Input(canvas.scene("gy_door_scene"),"gameInput",453,468,1);
    gy_answer_box.setTextAlign("center");
    gy_answer_box.setFillColor("black");
    gy_answer_box.setFontHeight(40);
    gy_answer_box.setFont("黑体");
    gy_answer_box.clear();
    var gy_answer_box_fake_button=new Button(canvas.scene("gy_door_scene"),362,395,180,98,2,null,null,null,()=>{},()=>{
        gy_answer_box.enable();
        gy_answer_box_fake_disable_button.setClickable(true);
        gy_answer_box_fake_disable_button.setIgnoreClickEven(false);
    });
    gy_answer_box_fake_button.setClickable(false);

    var gy_answer_box_fake_disable_button=new Button(canvas.scene("gy_door_scene"),0,0,935,935,10,null,null,null,()=>{},()=>{
        gy_answer_box.disable();
        gy_answer_box_fake_disable_button.setClickable(false);
        gy_answer_box_fake_disable_button.setIgnoreClickEven(true);
    });
    gy_answer_box_fake_disable_button.setClickable(false);
    gy_answer_box_fake_disable_button.setIgnoreClickEven(true);

    var gy_hit_rocket_animation=new Animation([
        {
            image: res.getResource("gy_hit_rocket1"),
            interval: 200
        },
        {
            image: res.getResource("gy_hit_rocket2"),
            interval: 100
        },
        {
            image: res.getResource("gy_hit_rocket3"),
            interval: 100
        }
    ]);
    var gy_right_scene_hit_rocket=new Button(canvas.scene("gy_right_scene"),0,0,0,0,1,gy_hit_rocket_animation,null,null,()=>{},()=>{});
    gy_right_scene_hit_rocket.setClickable(false);

    var gy_right_scene_genshin=new Button(canvas.scene("gy_right_scene"),0,0,0,0,2,res.getResource("genshin"),null,null,()=>{},()=>{});
    gy_right_scene_genshin.setClickable(false);
    gy_right_scene_genshin.setTransparentAlpha(0);

    var gy_door_scene_liekai=new Button(canvas.scene("gy_door_scene"),323,342,65,66,6,res.getResource("liekai"),null,null,()=>{},()=>{
        let p=gy_door_scene_liekai.getPosition();
        if (p.x<=30 && p.x>=-30 && p.y<=30 && p.y>=-30){
            gy_door_scene_lock.setTransparentAlpha(0);
            gy_answer_box_fake_button.setClickable(true);
        }
        else{
            gy_door_scene_lock.setTransparentAlpha(1);
            gy_answer_box_fake_button.setClickable(false);
        }
    },380,373);
    gy_door_scene_liekai.setDraggable(true);
    
    canvas.changeScene("gy_door_scene");
    // gy_answer_box.enable();
}

var res;

function init(canvas){
    res=new Resource(cfg); //加载素材
    res.onload=()=>build(canvas); //仅测试用
}

export default{
    init,build
};
