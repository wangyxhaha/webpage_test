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
    {
        name: "zty_door_bg",
        type: "image",
        value: "./zty/data/天佑背景门.jpg"
    },
    {
        name: "zty_top_bg",
        type: "image",
        value: "./zty/data/天佑顶.jpg"
    },
    {
        name: "zty_left_bg",
        type: "image",
        value: "./zty/data/天佑左底图.jpg"
    },
    {
        name: "zty_right_bg",
        type: "image",
        value: "./zty/data/天佑右底图.jpg"
    },
    {
        name: "left_arrow",
        type: "image",
        value: "./zty/data/左.png"
    },
    {
        name: "right_arrow",
        type: "image",
        value: "./zty/data/右.png"
    },
    {
        name: "up_arrow",
        type: "image",
        value: "./zty/data/上.png"
    },
    {
        name: "down_arrow",
        type: "image",
        value: "./zty/data/下.png"
    },
    {
        name: "lock",
        type: "image",
        value: "./zty/data/锁.png"
    },
    {
        name: "figure",
        type: "image",
        value: "./zty/data/天佑形象.png"
    },
    {
        name: "pants",
        type: "image",
        value: "./zty/data/天佑裤子.png"
    },
    {
        name: "pants_talking",
        type: "image",
        value: "./zty/data/天佑脱裤以后说的.png"
    },
    {
        name: "searching",
        type: "image",
        value: "./zty/data/天佑搜索.png"
    },
    {
        name: "yaling",
        type: "image",
        value: "./zty/data/天佑哑铃.png"
    },
    {
        name: "tuoku",
        type: "image",
        value: "./zty/data/脱裤男.png"
    },
    {
        name: "zty_talking",
        type: "image",
        value: "./zty/data/天佑语录1.png"
    },
    {
        name: "poster1",
        type: "image",
        value: "./zty/data/海报1.png"
    },
    {
        name: "poster2",
        type: "image",
        value: "./zty/data/海报2.png"
    },
    {
        name: "poster3",
        type: "image",
        value: "./zty/data/海报3.png"
    },
    {
        name: "poster4",
        type: "image",
        value: "./zty/data/海报4.png"
    },
    {
        name: "poster5",
        type: "image",
        value: "./zty/data/海报5.png"
    },
    {
        name: "poster6",
        type: "image",
        value: "./zty/data/海报6.png"
    }
]

function build(canvas){
    console.log("build");
    canvas.createNewScene("zty_door_scene",res.getResource("zty_door_bg"));
    canvas.createNewScene("zty_top_scene",res.getResource("zty_top_bg"));
    canvas.createNewScene("zty_left_scene",res.getResource("zty_left_bg"));
    canvas.createNewScene("zty_right_scene",res.getResource("zty_right_bg"));
    var zty_door_scene_left_arrow=new Button(canvas.scene("zty_door_scene"),0,0,57,89,21,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("zty_left_scene"),98,443);
    var zty_door_scene_right_arrow=new Button(canvas.scene("zty_door_scene"),0,0,57,89,21,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("zty_right_scene"),777,443);
    var zty_left_scene_right_arrow=new Button(canvas.scene("zty_left_scene"),0,0,57,89,21,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("zty_door_scene"),777,443);
    var zty_right_scene_left_arrow=new Button(canvas.scene("zty_right_scene"),0,0,57,89,21,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("zty_door_scene"),98,443);
    var zty_door_scene_up_arrow=new Button(canvas.scene("zty_door_scene"),0,0,88,46,21,res.getResource("up_arrow"),null,null,()=>{},()=>canvas.changeScene("zty_top_scene"),416,114);
    var zty_top_scene_down_arrow=new Button(canvas.scene("zty_top_scene"),0,0,88,46,21,res.getResource("down_arrow"),null,null,()=>{},()=>canvas.changeScene("zty_door_scene"),416,833);
    
    var zty_door_scene_lock=new Button(canvas.scene("zty_door_scene"),0,0,0,0,1,res.getResource("lock"),null,null,()=>{},()=>{});
    zty_door_scene_lock.setClickable(false);
    
    var zty_answer_box=new Input(canvas.scene("zty_door_scene"),"gameInput",453,468,1);
    zty_answer_box.setTextAlign("center");
    zty_answer_box.setFillColor("black");
    zty_answer_box.setFontHeight(40);
    zty_answer_box.setFont("黑体");
    zty_answer_box.clear();
    var zty_answer_box_fake_button=new Button(canvas.scene("zty_door_scene"),362,395,180,98,2,null,null,null,()=>{},()=>{
        zty_answer_box.enable();
        zty_answer_box_fake_disable_button.setClickable(true);
        zty_answer_box_fake_disable_button.setIgnoreClickEven(false);
    });
    zty_answer_box_fake_button.setClickable(false);

    var zty_answer_box_fake_disable_button=new Button(canvas.scene("zty_door_scene"),0,0,935,935,2,null,null,null,()=>{},()=>{
        zty_answer_box.disable();
        zty_answer_box_fake_disable_button.setClickable(false);
        zty_answer_box_fake_disable_button.setIgnoreClickEven(true);
    });
    zty_answer_box_fake_disable_button.setClickable(false);
    zty_answer_box_fake_disable_button.setIgnoreClickEven(true);

    var flag=false;

    var zty_door_scene_figure_talking=new Button(canvas.scene("zty_door_scene"),0,100,0,0,21,res.getResource("zty_talking"),null,null,()=>{},()=>{});
    zty_door_scene_figure_talking.setTransparentAlpha(0);
    zty_door_scene_figure_talking.setClickable(false);

    var zty_door_secene_figure=new Button(canvas.scene("zty_door_scene"),436,397,394,465,11,res.getResource("figure"),null,null,()=>{
        zty_door_scene_figure_talking.setTransparentAlpha(1);
        zty_door_scene_pants_talking.setTransparentAlpha(0);
    },()=>{});

    var zty_door_scene_pants_talking=new Button(canvas.scene("zty_door_scene"),0,100,0,0,21,res.getResource("pants_talking"),null,null,()=>{},()=>{});
    zty_door_scene_pants_talking.setClickable(false);
    zty_door_scene_pants_talking.setTransparentAlpha(0);

    var zty_door_scene_tuoku=new Button(canvas.scene("zty_door_scene"),0,0,0,0,21,res.getResource("tuoku"),null,null,()=>{},()=>{});
    zty_door_scene_tuoku.setTransparentAlpha(0);

    var zty_door_scene_pants=new Button(canvas.scene("zty_door_scene"),570,717,219,117,21,res.getResource("pants"),null,null,()=>{
        zty_door_scene_figure_talking.setTransparentAlpha(0);
        zty_door_scene_pants_talking.setTransparentAlpha(1);
        zty_door_scene_pants.setClickable(false);
        zty_door_scene_pants.setTransparentAlpha(0);
        zty_door_secene_figure.setClickable(false);
        setTimeout(()=>{zty_door_scene_tuoku.setTransparentAlpha(0.8);},200);
        setTimeout(()=>{
            zty_door_scene_tuoku.setTransparentAlpha(0);
            zty_door_secene_figure.setClickable(true);
        },1200);
    },()=>{});
    var zty_door_scene_yaling=new Button(canvas.scene("zty_door_scene"),0,0,0,0,11,res.getResource("yaling"),null,null,()=>{},()=>{});

    //右场景电影

    var cnt=1;
    var zty_right_scene_poster1=new Button(canvas.scene("zty_right_scene"),0,-700,0,0,11,res.getResource("poster1"),null,null,()=>{},()=>{});
    var zty_right_scene_poster2=new Button(canvas.scene("zty_right_scene"),0,-700,0,0,12,res.getResource("poster2"),null,null,()=>{},()=>{});
    var zty_right_scene_poster3=new Button(canvas.scene("zty_right_scene"),0,-700,0,0,13,res.getResource("poster3"),null,null,()=>{},()=>{});
    var zty_right_scene_poster4=new Button(canvas.scene("zty_right_scene"),0,-700,0,0,14,res.getResource("poster4"),null,null,()=>{},()=>{});
    var zty_right_scene_poster5=new Button(canvas.scene("zty_right_scene"),0,-700,0,0,15,res.getResource("poster5"),null,null,()=>{},()=>{});
    var zty_right_scene_poster6=new Button(canvas.scene("zty_right_scene"),0,-700,0,0,16,res.getResource("poster6"),null,null,()=>{},()=>{});

    zty_right_scene_poster1.setClickable(false);
    zty_right_scene_poster2.setClickable(false);
    zty_right_scene_poster3.setClickable(false);
    zty_right_scene_poster4.setClickable(false);
    zty_right_scene_poster5.setClickable(false);
    zty_right_scene_poster6.setClickable(false);


    var zty_right_scene_searching=new Button(canvas.scene("zty_right_scene"),532,337,33,31,11,res.getResource("searching"),null,null,()=>{
        if(cnt<=6) searching(cnt);
    },()=>{});

    function searching(id){
        if(cnt==6){
            zty_right_scene_searching.setClickable(false);
            zty_door_scene_lock.setTransparentAlpha(0);
            zty_answer_box_fake_button.setClickable(true);            
        }
        switch(id){
            case 1:zty_right_scene_poster1.slideTo(0,0,0.5);break;
            case 2:zty_right_scene_poster2.slideTo(0,0,0.5);break;
            case 3:zty_right_scene_poster3.slideTo(0,0,0.5);break;
            case 4:zty_right_scene_poster4.slideTo(0,0,0.5);break;
            case 5:zty_right_scene_poster5.slideTo(0,0,0.5);break;
            case 6:zty_right_scene_poster6.slideTo(0,0,0.5);break;
        }
        cnt++;
    }
    
    canvas.changeScene("zty_door_scene");
}

var res;

function init(canvas){
    res=new Resource(cfg); //加载素材
    res.onload=()=>build(canvas); //仅测试用
}

export default{
    init,build
};
