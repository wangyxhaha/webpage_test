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
        name: "lzan_door",
        type: "image",
        value: "./lzan/data/安娜背景门.jpg"
    },
    {
        name: "lzan_top",
        type: "image",
        value: "./lzan/data/安娜顶.jpg"
    }/*,
    {
        name: "lzan_figure",
        type: "image",
        value: "./lzan/data/安娜形象.png"
    }*/,
    {
        name: "lzan_right_bg",
        type: "image",
        value: "./lzan/data/安娜右.jpg"
    },
    {
        name: "lzan_left_bg",
        type: "image",
        value: "./lzan/data/安娜左底图.jpg"
    },
    {
        name: "left_arrow",
        type: "image",
        value: "./lzan/data/左.png"
    },
    {
        name: "right_arrow",
        type: "image",
        value: "./lzan/data/右.png"
    },
    {
        name: "up_arrow",
        type: "image",
        value: "./lzan/data/上.png"
    },
    {
        name: "down_arrow",
        type: "image",
        value: "./lzan/data/下.png"
    },
    {
        name: "lock",
        type: "image",
        value: "./lzan/data/锁.png"
    },
    {
        name: "box1",
        type: "image",
        value: "./lzan/data/安娜盲盒1.png"
    },
    {
        name: "box2",
        type: "image",
        value: "./lzan/data/安娜盲盒2.png"
    },
    {
        name: "box3",
        type: "image",
        value: "./lzan/data/安娜盲盒3.png"
    },
    {
        name: "box4",
        type: "image",
        value: "./lzan/data/安娜盲盒4.png"
    },
    {
        name: "box5",
        type: "image",
        value: "./lzan/data/安娜盲盒5.png"
    },
    {
        name: "box1_opened",
        type: "image",
        value: "./lzan/data/安娜打开1.png"
    },
    {
        name: "box2_opened",
        type: "image",
        value: "./lzan/data/安娜打开2.png"
    },
    {
        name: "box3_opened",
        type: "image",
        value: "./lzan/data/安娜打开3.png"
    },
    {
        name: "box4_opened",
        type: "image",
        value: "./lzan/data/安娜打开4.png"
    },
    {
        name: "box5_opened",
        type: "image",
        value: "./lzan/data/安娜打开5.png"
    },
    {
        name: "item1",
        type: "image",
        value: "./lzan/data/1物品.png"
    },
    {
        name: "item2",
        type: "image",
        value: "./lzan/data/2物品.png"
    },
    {
        name: "item3",
        type: "image",
        value: "./lzan/data/3物品.png"
    },
    {
        name: "item4",
        type: "image",
        value: "./lzan/data/4物品.png"
    },
    {
        name: "item5",
        type: "image",
        value: "./lzan/data/5物品.png"
    }
]

function isIn(p){ //218 701 704 934
    return p.x>=218-100 && p.x<=704 && p.y>=701-100 && p.y<=934;
}

function build(canvas){
    console.log("build lzan");
    canvas.createNewScene("lzan_door_scene",res.getResource("lzan_door"));
    canvas.createNewScene("lzan_top_scene",res.getResource("lzan_top"));
    canvas.createNewScene("lzan_right_scene",res.getResource("lzan_right_bg"));
    canvas.createNewScene("lzan_left_scene",res.getResource("lzan_left_bg"));
    var lzan_door_scene_left_arrow=new Button(canvas.scene("lzan_door_scene"),0,0,57,89,5,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("lzan_left_scene"),98,443);
    var lzan_door_scene_right_arrow=new Button(canvas.scene("lzan_door_scene"),0,0,57,89,5,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("lzan_right_scene"),777,443);
    var lzan_left_scene_right_arrow=new Button(canvas.scene("lzan_left_scene"),0,0,57,89,0,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("lzan_door_scene"),777,443);
    var lzan_right_scene_left_arrow=new Button(canvas.scene("lzan_right_scene"),0,0,57,89,0,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("lzan_door_scene"),98,443);
    var lzan_door_scene_up_arrow=new Button(canvas.scene("lzan_door_scene"),0,0,88,46,5,res.getResource("up_arrow"),null,null,()=>{},()=>canvas.changeScene("lzan_top_scene"),416,114);
    var lzan_top_scene_down_arrow=new Button(canvas.scene("lzan_top_scene"),0,0,88,46,0,res.getResource("down_arrow"),null,null,()=>{},()=>canvas.changeScene("lzan_door_scene"),416,833);

    var lzan_door_scene_lock=new Button(canvas.scene("lzan_door_scene"),0,0,0,0,1,res.getResource("lock"),null,null,()=>{},()=>{});
    lzan_door_scene_lock.setClickable(false);

    var lzan_answer_box=new Input(canvas.scene("lzan_door_scene"),"gameInput",453,468,1);
    lzan_answer_box.setTextAlign("center");
    lzan_answer_box.setFillColor("black");
    lzan_answer_box.setFontHeight(40);
    lzan_answer_box.setFont("黑体");
    lzan_answer_box.clear();
    var lzan_answer_box_fake_button=new Button(canvas.scene("lzan_door_scene"),362,395,180,98,2,null,null,null,()=>{},()=>{
        lzan_answer_box.enable();
        lzan_answer_box_fake_disable_button.setClickable(true);
        lzan_answer_box_fake_disable_button.setIgnoreClickEvent(false);
    });
    lzan_answer_box_fake_button.setClickable(false);

    var lzan_answer_box_fake_disable_button=new Button(canvas.scene("lzan_door_scene"),0,0,935,935,10,null,null,null,()=>{},()=>{
        lzan_answer_box.disable();
        lzan_answer_box_fake_disable_button.setClickable(false);
        lzan_answer_box_fake_disable_button.setIgnoreClickEvent(true);
    });
    lzan_answer_box_fake_disable_button.setClickable(false);
    lzan_answer_box_fake_disable_button.setIgnoreClickEvent(true);

    var boxes=[];
    for (let i=1;i<=5;i++) boxes.push(new Animation([
        {
            image: res.getResource(`box${i}`),
            interval: Infinity
        },
        {
            image: res.getResource(`box${i}_opened`),
            interval: Infinity
        }
    ]));

    var lzan_left_scene_item1=new Button(canvas.scene("lzan_left_scene"),0,0,0,0,2,res.getResource("item1"),null,null,()=>{},()=>{});
    var lzan_left_scene_item2=new Button(canvas.scene("lzan_left_scene"),0,0,0,0,2,res.getResource("item2"),null,null,()=>{},()=>{});
    var lzan_left_scene_item3=new Button(canvas.scene("lzan_left_scene"),0,0,0,0,2,res.getResource("item3"),null,null,()=>{},()=>{});
    var lzan_left_scene_item4=new Button(canvas.scene("lzan_left_scene"),0,0,0,0,2,res.getResource("item4"),null,null,()=>{},()=>{});
    var lzan_left_scene_item5=new Button(canvas.scene("lzan_left_scene"),0,0,0,0,2,res.getResource("item5"),null,null,()=>{},()=>{});
    lzan_left_scene_item1.setClickable(false);
    lzan_left_scene_item1.setTransparentAlpha(0);
    lzan_left_scene_item2.setClickable(false);
    lzan_left_scene_item2.setTransparentAlpha(0);
    lzan_left_scene_item3.setClickable(false);
    lzan_left_scene_item3.setTransparentAlpha(0);
    lzan_left_scene_item4.setClickable(false);
    lzan_left_scene_item4.setTransparentAlpha(0);
    lzan_left_scene_item5.setClickable(false);
    lzan_left_scene_item5.setTransparentAlpha(0);

    var flag=[false,false,false,false,false];

    var lzan_left_scene_box1=new Button(canvas.scene("lzan_left_scene"),0,0,200,290,1,boxes[0],null,null,()=>{},()=>{
        boxes[0].to(1);
        if (!flag[0]){
            lzan_left_scene_item1.floatUp(0,0,200);
            flag[0]=true;
            check();
        }
    },106,134);
    var lzan_left_scene_box2=new Button(canvas.scene("lzan_left_scene"),0,0,200,290,1,boxes[1],null,null,()=>{},()=>{
        boxes[1].to(1);
        if (!flag[1]){
            lzan_left_scene_item2.floatUp(0,0,200);
            flag[1]=true;
            check();
        }
    },372,134);
    var lzan_left_scene_box3=new Button(canvas.scene("lzan_left_scene"),0,0,200,290,1,boxes[2],null,null,()=>{},()=>{
        boxes[2].to(1);
        if (!flag[2]){
            lzan_left_scene_item3.floatUp(0,0,200);
            flag[2]=true;
            check();
        }
    },630,134);
    var lzan_left_scene_box4=new Button(canvas.scene("lzan_left_scene"),0,0,200,290,1,boxes[3],null,null,()=>{},()=>{
        boxes[3].to(1);
        if (!flag[3]){
            lzan_left_scene_item4.floatUp(0,0,200);
            flag[3]=true;
            check();
        }
    },242,482);
    var lzan_left_scene_box5=new Button(canvas.scene("lzan_left_scene"),0,0,200,290,1,boxes[4],null,null,()=>{},()=>{
        boxes[4].to(1);
        if (!flag[4]){
            lzan_left_scene_item5.floatUp(0,0,200);
            flag[4]=true;
            check();
        }
    },513,482);

    function check(){
        if (flag.every(v=>v)){
            lzan_door_scene_lock.setTransparentAlpha(0);
            lzan_answer_box_fake_button.setClickable(true);
        }
    }

    // canvas.changeScene("lzan_door_scene");
    // lzan_answer_box.enable();
}

var res;

function init(canvas){
    res=new Resource(cfg); //加载素材
    // res.onload=()=>build(canvas); //仅测试用
}

function destroy(canvas){
    canvas.deleteScene("lzan_door_scene");
    canvas.deleteScene("lzan_top_scene");
    canvas.deleteScene("lzan_right_scene");
    canvas.deleteScene("lzan_left_scene");
    console.log("des lzan");
}

export default{
    init,build,destroy,
    setOnload: (ol)=>res.onload=ol
};
