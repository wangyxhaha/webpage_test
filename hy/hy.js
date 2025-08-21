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
        name: "hy_door",
        type: "image",
        value: "./hy/data/安娜背景门.jpg"
    },
    {
        name: "hy_top",
        type: "image",
        value: "./hy/data/安娜顶.jpg"
    }/*,
    {
        name: "hy_figure",
        type: "image",
        value: "./hy/data/安娜形象.png"
    }*/,
    {
        name: "hy_right_bg",
        type: "image",
        value: "./hy/data/安娜右底图.jpg"
    },
    {
        name: "hy_left_bg",
        type: "image",
        value: "./hy/data/安娜左底图.jpg"
    },
    {
        name: "left_arrow",
        type: "image",
        value: "./hy/data/左.png"
    },
    {
        name: "right_arrow",
        type: "image",
        value: "./hy/data/右.png"
    },
    {
        name: "up_arrow",
        type: "image",
        value: "./hy/data/上.png"
    },
    {
        name: "down_arrow",
        type: "image",
        value: "./hy/data/下.png"
    },
    {
        name: "lock",
        type: "image",
        value: "./hy/data/锁.png"
    },
    {
        name: "box1",
        type: "image",
        value: "./hy/data/安娜盲盒1.png"
    },
    {
        name: "box2",
        type: "image",
        value: "./hy/data/安娜盲盒2.png"
    },
    {
        name: "box3",
        type: "image",
        value: "./hy/data/安娜盲盒3.png"
    },
    {
        name: "box4",
        type: "image",
        value: "./hy/data/安娜盲盒4.png"
    },
    {
        name: "box5",
        type: "image",
        value: "./hy/data/安娜盲盒5.png"
    },
    {
        name: "box1_opened",
        type: "image",
        value: "./hy/data/安娜打开1.png"
    },
    {
        name: "box2_opened",
        type: "image",
        value: "./hy/data/安娜打开2.png"
    },
    {
        name: "box3_opened",
        type: "image",
        value: "./hy/data/安娜打开3.png"
    },
    {
        name: "box4_opened",
        type: "image",
        value: "./hy/data/安娜打开4.png"
    },
    {
        name: "box5_opened",
        type: "image",
        value: "./hy/data/安娜打开5.png"
    },
    {
        name: "item1",
        type: "image",
        value: "./hy/data/1物品.png"
    },
    {
        name: "item2",
        type: "image",
        value: "./hy/data/2物品.png"
    },
    {
        name: "item3",
        type: "image",
        value: "./hy/data/3物品.png"
    },
    {
        name: "item4",
        type: "image",
        value: "./hy/data/4物品.png"
    },
    {
        name: "item5",
        type: "image",
        value: "./hy/data/5物品.png"
    }
]

function isIn(p){ //218 701 704 934
    return p.x>=218-100 && p.x<=704 && p.y>=701-100 && p.y<=934;
}

function build(canvas){
    console.log("build hy");
    canvas.createNewScene("hy_door_scene",res.getResource("hy_door"));
    canvas.createNewScene("hy_top_scene",res.getResource("hy_top"));
    canvas.createNewScene("hy_right_scene",res.getResource("hy_right_bg"));
    canvas.createNewScene("hy_left_scene",res.getResource("hy_left_bg"));
    var hy_door_scene_left_arrow=new Button(canvas.scene("hy_door_scene"),0,0,57,89,5,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("hy_left_scene"),98,443);
    var hy_door_scene_right_arrow=new Button(canvas.scene("hy_door_scene"),0,0,57,89,5,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("hy_right_scene"),777,443);
    var hy_left_scene_right_arrow=new Button(canvas.scene("hy_left_scene"),0,0,57,89,0,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("hy_door_scene"),777,443);
    var hy_right_scene_left_arrow=new Button(canvas.scene("hy_right_scene"),0,0,57,89,0,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("hy_door_scene"),98,443);
    var hy_door_scene_up_arrow=new Button(canvas.scene("hy_door_scene"),0,0,88,46,5,res.getResource("up_arrow"),null,null,()=>{},()=>canvas.changeScene("hy_top_scene"),416,114);
    var hy_top_scene_down_arrow=new Button(canvas.scene("hy_top_scene"),0,0,88,46,0,res.getResource("down_arrow"),null,null,()=>{},()=>canvas.changeScene("hy_door_scene"),416,833);

    var hy_door_scene_lock=new Button(canvas.scene("hy_door_scene"),0,0,0,0,1,res.getResource("lock"),null,null,()=>{},()=>{});
    hy_door_scene_lock.setClickable(false);

    var hy_answer_box=new Input(canvas.scene("hy_door_scene"),"gameInput",453,468,1);
    hy_answer_box.setTextAlign("center");
    hy_answer_box.setFillColor("black");
    hy_answer_box.setFontHeight(40);
    hy_answer_box.setFont("黑体");
    hy_answer_box.clear();
    var hy_answer_box_fake_button=new Button(canvas.scene("hy_door_scene"),362,395,180,98,2,null,null,null,()=>{},()=>{
        hy_answer_box.enable();
        hy_answer_box_fake_disable_button.setClickable(true);
        hy_answer_box_fake_disable_button.setIgnoreClickEvent(false);
    });
    hy_answer_box_fake_button.setClickable(false);

    var hy_answer_box_fake_disable_button=new Button(canvas.scene("hy_door_scene"),0,0,935,935,10,null,null,null,()=>{},()=>{
        hy_answer_box.disable();
        hy_answer_box_fake_disable_button.setClickable(false);
        hy_answer_box_fake_disable_button.setIgnoreClickEvent(true);
    });
    hy_answer_box_fake_disable_button.setClickable(false);
    hy_answer_box_fake_disable_button.setIgnoreClickEvent(true);

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

    var hy_left_scene_item1=new Button(canvas.scene("hy_left_scene"),0,0,0,0,2,res.getResource("item1"),null,null,()=>{},()=>{});
    var hy_left_scene_item2=new Button(canvas.scene("hy_left_scene"),0,0,0,0,2,res.getResource("item2"),null,null,()=>{},()=>{});
    var hy_left_scene_item3=new Button(canvas.scene("hy_left_scene"),0,0,0,0,2,res.getResource("item3"),null,null,()=>{},()=>{});
    var hy_left_scene_item4=new Button(canvas.scene("hy_left_scene"),0,0,0,0,2,res.getResource("item4"),null,null,()=>{},()=>{});
    var hy_left_scene_item5=new Button(canvas.scene("hy_left_scene"),0,0,0,0,2,res.getResource("item5"),null,null,()=>{},()=>{});
    hy_left_scene_item1.setClickable(false);
    hy_left_scene_item1.setTransparentAlpha(0);
    hy_left_scene_item2.setClickable(false);
    hy_left_scene_item2.setTransparentAlpha(0);
    hy_left_scene_item3.setClickable(false);
    hy_left_scene_item3.setTransparentAlpha(0);
    hy_left_scene_item4.setClickable(false);
    hy_left_scene_item4.setTransparentAlpha(0);
    hy_left_scene_item5.setClickable(false);
    hy_left_scene_item5.setTransparentAlpha(0);

    var flag=[false,false,false,false,false];

    var hy_left_scene_box1=new Button(canvas.scene("hy_left_scene"),0,0,200,290,1,boxes[0],null,null,()=>{},()=>{
        boxes[0].to(1);
        if (!flag[0]){
            hy_left_scene_item1.floatUp(0,0,200);
            flag[0]=true;
            check();
        }
    },106,134);
    var hy_left_scene_box2=new Button(canvas.scene("hy_left_scene"),0,0,200,290,1,boxes[1],null,null,()=>{},()=>{
        boxes[1].to(1);
        if (!flag[1]){
            hy_left_scene_item2.floatUp(0,0,200);
            flag[1]=true;
            check();
        }
    },372,134);
    var hy_left_scene_box3=new Button(canvas.scene("hy_left_scene"),0,0,200,290,1,boxes[2],null,null,()=>{},()=>{
        boxes[2].to(1);
        if (!flag[2]){
            hy_left_scene_item3.floatUp(0,0,200);
            flag[2]=true;
            check();
        }
    },630,134);
    var hy_left_scene_box4=new Button(canvas.scene("hy_left_scene"),0,0,200,290,1,boxes[3],null,null,()=>{},()=>{
        boxes[3].to(1);
        if (!flag[3]){
            hy_left_scene_item4.floatUp(0,0,200);
            flag[3]=true;
            check();
        }
    },242,482);
    var hy_left_scene_box5=new Button(canvas.scene("hy_left_scene"),0,0,200,290,1,boxes[4],null,null,()=>{},()=>{
        boxes[4].to(1);
        if (!flag[4]){
            hy_left_scene_item5.floatUp(0,0,200);
            flag[4]=true;
            check();
        }
    },513,482);

    function check(){
        if (flag.every(v=>v)){
            hy_door_scene_lock.setTransparentAlpha(0);
            hy_answer_box_fake_button.setClickable(true);
        }
    }

    // canvas.changeScene("hy_door_scene");
    // hy_answer_box.enable();
}

var res;

function init(canvas){
    res=new Resource(cfg); //加载素材
    // res.onload=()=>build(canvas); //仅测试用
}

function destroy(canvas){
    canvas.deleteScene("hy_door_scene");
    canvas.deleteScene("hy_top_scene");
    canvas.deleteScene("hy_right_scene");
    canvas.deleteScene("hy_left_scene");
    console.log("des hy");
}

export default{
    init,build,destroy,
    setOnload: (ol)=>res.onload=ol
};
