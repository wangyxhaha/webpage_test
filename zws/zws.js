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
        name: "zws_door",
        type: "image",
        value: "./zws/data/zws背景门.jpg"
    },
    {
        name: "zws_top",
        type: "image",
        value: "./zws/data/zws顶.jpg"
    },
    {
        name: "zws_right_bg",
        type: "image",
        value: "./zws/data/zws右底图.jpg"
    },
    {
        name: "zws_left_bg",
        type: "image",
        value: "./zws/data/zws左底图.jpg"
    },
    {
        name: "left_arrow",
        type: "image",
        value: "./zws/data/左.png"
    },
    {
        name: "right_arrow",
        type: "image",
        value: "./zws/data/右.png"
    },
    {
        name: "up_arrow",
        type: "image",
        value: "./zws/data/上.png"
    },
    {
        name: "down_arrow",
        type: "image",
        value: "./zws/data/下.png"
    },
    {
        name: "lock",
        type: "image",
        value: "./zws/data/锁.png"
    },
    {
        name: "hair1",
        type: "image",
        value: "./zws/data/假发1.png"
    },
    {
        name: "hair2",
        type: "image",
        value: "./zws/data/假发2.png"
    },
    {
        name: "hair3",
        type: "image",
        value: "./zws/data/假发3.png"
    },
    {
        name: "costume1",
        type: "image",
        value: "./zws/data/cos服1.png"
    },
    {
        name: "costume2",
        type: "image",
        value: "./zws/data/cos服2.png"
    },
    {
        name: "costume3",
        type: "image",
        value: "./zws/data/cos服3.png"
    },
    {
        name: "zws_figure",
        type: "image",
        value: "./zws/data/zws形象.png"
    },
    {
        name: "saying1",
        type: "image",
        value: "./zws/data/想看看我的衣柜吗.png"
    },
    {
        name: "saying2",
        type: "image",
        value: "./zws/data/你想亲我吗.png"
    },
    {
        name: "saying3",
        type: "image",
        value: "./zws/data/想.png"
    },
    {
        name: "small_zty",
        type: "image",
        value: "./zws/data/zws天佑.png"
    },
    {
        name: "zty_figure",
        type: "image",
        value: "./zws/data/天佑在zws房间.png"
    }
]

function build(canvas){
    console.log("build");
    canvas.createNewScene("zws_door_scene",res.getResource("zws_door"));
    canvas.createNewScene("zws_top_scene",res.getResource("zws_top"));
    canvas.createNewScene("zws_right_scene",res.getResource("zws_right_bg"));
    canvas.createNewScene("zws_left_scene",res.getResource("zws_left_bg"));

    var flag=0;
    
    var zws_door_scene_left_arrow=new Button(canvas.scene("zws_door_scene"),0,0,57,89,5,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("zws_left_scene"),98,443);
    var zws_door_scene_right_arrow=new Button(canvas.scene("zws_door_scene"),0,0,57,89,5,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("zws_right_scene"),777,443);
    var zws_left_scene_right_arrow=new Button(canvas.scene("zws_left_scene"),0,0,57,89,0,res.getResource("right_arrow"),null,null,()=>{},()=>{
        canvas.changeScene("zws_door_scene");
        if (flag==1){
            flag=2;
            zws_door_scene_saying2.floatUp(0,0,200);
            setTimeout(()=>zws_door_scene_saying3.floatUp(0,0,200),1000);
            setTimeout(()=>{
                zws_door_scene_saying2.setTransparentAlpha(0);
                zws_door_scene_saying3.setTransparentAlpha(0);
                flag=3;
            },4000);
        }
    },777,443);
    var zws_right_scene_left_arrow=new Button(canvas.scene("zws_right_scene"),0,0,57,89,50,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("zws_door_scene"),98,443);
    var zws_door_scene_up_arrow=new Button(canvas.scene("zws_door_scene"),0,0,88,46,5,res.getResource("up_arrow"),null,null,()=>{},()=>canvas.changeScene("zws_top_scene"),416,114);
    var zws_top_scene_down_arrow=new Button(canvas.scene("zws_top_scene"),0,0,88,46,0,res.getResource("down_arrow"),null,null,()=>{},()=>canvas.changeScene("zws_door_scene"),416,833);

    var saying1wait=false;

    var zws_door_scene_zws_figure=new Button(canvas.scene("zws_door_scene"),0,0,175,264,1,res.getResource("zws_figure"),null,null,()=>{},()=>{
        if (flag==1 || flag==2) return;
        if (saying1wait) return;
        saying1wait=true;
        zws_door_scene_saying1.floatUp(0,0,300);
        setTimeout(()=>{
            zws_door_scene_saying1.setTransparentAlpha(0);
            saying1wait=false;
        },2000);
    },608,288);
    // zws_door_scene_zws_figure.setClickable(false);

    var zws_door_scene_zty_figure=new Button(canvas.scene("zws_door_scene"),0,0,0,0,1,res.getResource("zty_figure"),null,null,()=>{},()=>{});
    zws_door_scene_zty_figure.setTransparentAlpha(0);
    zws_door_scene_zty_figure.setClickable(false);

    var zws_door_scene_small_zty=new Button(canvas.scene("zws_left_scene"),0,0,137,94,1,res.getResource("small_zty"),null,null,()=>{},()=>{
        zws_door_scene_small_zty.moveTo(500,0,500);
        zws_door_scene_zty_figure.setTransparentAlpha(1);
        zws_door_scene_saying1.setTransparentAlpha(0);
        flag=1;
    },618,699);

    //618 699 137 94

    var zws_door_scene_saying1=new Button(canvas.scene("zws_door_scene"),0,0,0,0,3,res.getResource("saying1"),null,null,()=>{},()=>{});
    zws_door_scene_saying1.setClickable(false);
    zws_door_scene_saying1.setTransparentAlpha(0);

    var zws_door_scene_saying2=new Button(canvas.scene("zws_door_scene"),0,0,0,0,3,res.getResource("saying2"),null,null,()=>{},()=>{});
    zws_door_scene_saying2.setClickable(false);
    zws_door_scene_saying2.setTransparentAlpha(0);

    var zws_door_scene_saying3=new Button(canvas.scene("zws_door_scene"),0,0,0,0,3,res.getResource("saying3"),null,null,()=>{},()=>{});
    zws_door_scene_saying3.setClickable(false);
    zws_door_scene_saying3.setTransparentAlpha(0);

    var zws_door_scene_lock=new Button(canvas.scene("zws_door_scene"),0,0,0,0,1,res.getResource("lock"),null,null,()=>{},()=>{});
    zws_door_scene_lock.setClickable(false);

    var zws_answer_box=new Input(canvas.scene("zws_door_scene"),"gameInput",453,468,1);
    zws_answer_box.setTextAlign("center");
    zws_answer_box.setFillColor("black");
    zws_answer_box.setFontHeight(40);
    zws_answer_box.setFont("黑体");
    zws_answer_box.clear();
    var zws_answer_box_fake_button=new Button(canvas.scene("zws_door_scene"),362,395,180,98,2,null,null,null,()=>{},()=>{
        zws_answer_box.enable();
        zws_answer_box_fake_disable_button.setClickable(true);
        zws_answer_box_fake_disable_button.setIgnoreClickEven(false);
    });
    zws_answer_box_fake_button.setClickable(false);

    var zws_answer_box_fake_disable_button=new Button(canvas.scene("zws_door_scene"),0,0,935,935,10,null,null,null,()=>{},()=>{
        zws_answer_box.disable();
        zws_answer_box_fake_disable_button.setClickable(false);
        zws_answer_box_fake_disable_button.setIgnoreClickEven(true);
    });
    zws_answer_box_fake_disable_button.setClickable(false);
    zws_answer_box_fake_disable_button.setIgnoreClickEven(true);

    var line=[198,468,738];

    var hairdx=[103,93,77];
    var hairy=[150,154,160];

    var cosdx=[156,198,149];
    var cosy=[314,301,322];
    
    var hairP=[1,0,2]; //某个位置是哪个元素
    var cosP=[2,1,0];
    var hairP2=[1,0,2]; //某个元素在哪个位置
    var cosP2=[2,1,0];

    var zws_right_scene_hair=[
        new Button(canvas.scene("zws_right_scene"),365,150,230,430,11,res.getResource("hair1"),null,null,()=>{},()=>hairSwap(0,zws_right_scene_hair[0].getPosition().x+hairdx[0])),
        new Button(canvas.scene("zws_right_scene"),105,154,188,269,12,res.getResource("hair2"),null,null,()=>{},()=>hairSwap(1,zws_right_scene_hair[1].getPosition().x+hairdx[1])),
        new Button(canvas.scene("zws_right_scene"),661,160,160,180,13,res.getResource("hair3"),null,null,()=>{},()=>hairSwap(2,zws_right_scene_hair[2].getPosition().x+hairdx[2]))
    ];
    zws_right_scene_hair[0].setDraggable(true);
    zws_right_scene_hair[1].setDraggable(true);
    zws_right_scene_hair[2].setDraggable(true);

    var zws_right_scene_costume=[
        new Button(canvas.scene("zws_right_scene"),582,314,314,477,21,res.getResource("costume1"),null,null,()=>{},()=>costumeSwap(0,zws_right_scene_costume[0].getPosition().x+cosdx[0])),
        new Button(canvas.scene("zws_right_scene"),270,301,345,587,22,res.getResource("costume2"),null,null,()=>{},()=>costumeSwap(1,zws_right_scene_costume[1].getPosition().x+cosdx[1])),
        new Button(canvas.scene("zws_right_scene"), 49,322,321,505,23,res.getResource("costume3"),null,null,()=>{},()=>costumeSwap(2,zws_right_scene_costume[2].getPosition().x+cosdx[2]))
    ];
    zws_right_scene_costume[0].setDraggable(true);
    zws_right_scene_costume[1].setDraggable(true);
    zws_right_scene_costume[2].setDraggable(true);

    function check(){
        // console.log(hairP,cosP);
        let t=[0,2,1];
        if (hairP.every((v,i)=>v==t[i]) && cosP.every((v,i)=>v==t[i])){
            zws_door_scene_lock.setTransparentAlpha(0);
            zws_answer_box_fake_button.setClickable(true);
        }
        else{
            zws_door_scene_lock.setTransparentAlpha(1);
            zws_answer_box_fake_button.setClickable(false);
        }
    }

    function hairSwap(hair,targetX){ //交换的逻辑
        // console.log("hair swap");
        let now=hairP2[hair];
        let tar;
        if (targetX<333) tar=0; //先判断在哪一块
        else if (targetX>=333 && targetX<603) tar=1;
        else tar=2;
        zws_right_scene_hair[hairP[now]].setPostition(line[tar]-hairdx[hairP[now]],hairy[hairP[now]]); //先将被拖动的移过去
        if (now==tar) return; //如果被拖动的和目标是一个位置，无需后续
        zws_right_scene_hair[hairP[tar]].setDraggable(false);
        let temp=hairP[tar];
        zws_right_scene_hair[hairP[tar]].moveTo(line[now]-hairdx[hairP[tar]],hairy[hairP[tar]],200);
        setTimeout(()=>zws_right_scene_hair[temp].setDraggable(true),100);
        [hairP2[hairP[tar]],hairP2[hair]]=[now,tar];
        [hairP[tar],hairP[now]]=[hairP[now],hairP[tar]];
        check();
        // console.log(hairP);
        // console.log(hairP2);
    }

    function costumeSwap(costume,targetX){ //交换的逻辑
        // console.log("costume swap",costume);
        let now=cosP2[costume];
        let tar;
        if (targetX<333) tar=0; //先判断在哪一块
        else if (targetX>=333 && targetX<603) tar=1;
        else tar=2;
        zws_right_scene_costume[cosP[now]].setPostition(line[tar]-cosdx[cosP[now]],cosy[cosP[now]]); //先将被拖动的移过去
        if (now==tar) return; //如果被拖动的和目标是一个位置，无需后续
        zws_right_scene_costume[cosP[tar]].setDraggable(false);
        let temp=cosP[tar];
        zws_right_scene_costume[cosP[tar]].moveTo(line[now]-cosdx[cosP[tar]],cosy[cosP[tar]],200);
        setTimeout(()=>zws_right_scene_costume[temp].setDraggable(true),100);
        [cosP2[cosP[tar]],cosP2[costume]]=[now,tar];
        [cosP[tar],cosP[now]]=[cosP[now],cosP[tar]];
        check();
        // console.log(cosP);
        // console.log(cosP2);
    }

    canvas.changeScene("zws_door_scene");
    // zws_answer_box.enable();
}

var res;

function init(canvas){
    res=new Resource(cfg); //加载素材
    res.onload=()=>build(canvas); //仅测试用
}

export default{
    init,build
};
