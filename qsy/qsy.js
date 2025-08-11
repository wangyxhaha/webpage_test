"use strict"
import Resource from "../resource.js"
import Canvas from "../canvas.js";
import Button from "../button.js";
import Animation from "../animation.js";
import Input from "../input.js";
import "../buttonPlugin.js";
import "../spritePlugin.js";

var cfg=[ //所需素材的信息
    {
        name: "qsy_door",
        type: "image",
        value: "./qsy/data/乔思源背景门.jpg"
    },
    {
        name: "qsy_top",
        type: "image",
        value: "./qsy/data/乔思源顶.jpg"
    },
    {
        name: "qsy_right_bg",
        type: "image",
        value: "./qsy/data/乔思源右底图.jpg"
    },
    {
        name: "qsy_left_bg",
        type: "image",
        value: "./qsy/data/乔思源左底图.jpg"
    },
    {
        name: "left_arrow",
        type: "image",
        value: "./qsy/data/左.png"
    },
    {
        name: "right_arrow",
        type: "image",
        value: "./qsy/data/右.png"
    },
    {
        name: "up_arrow",
        type: "image",
        value: "./qsy/data/上.png"
    },
    {
        name: "down_arrow",
        type: "image",
        value: "./qsy/data/下.png"
    },
    {
        name: "lock",
        type: "image",
        value: "./qsy/data/锁.png"
    },
    {
        name: "stick",
        type: "image",
        value: "./qsy/data/木棍.png"
    },
    {
        name: "aitung",
        type: "image",
        value: "./qsy/data/aitung哥.png"
    },
    {
        name: "aicap",
        type: "image",
        value: "./qsy/data/ai卡布尼诺.png"
    },
    {
        name: "ninja",
        type: "image",
        value: "./qsy/data/火影.png"
    },
    {
        name: "foot",
        type: "image",
        value: "./qsy/data/脚.png"
    },
    {
        name: "foot&cow",
        type: "image",
        value: "./qsy/data/脚＋牛.png"
    },
    {
        name: "foot&planet",
        type: "image",
        value: "./qsy/data/脚＋土星.png"
    },
    {
        name: "cow&planet",
        type: "image",
        value: "./qsy/data/牛＋土星.png"
    },
    {
        name: "cow&foot&planet",
        type: "image",
        value: "./qsy/data/牛＋脚＋土星.png"
    },
    {
        name: "cap",
        type: "image",
        value: "./qsy/data/卡布奇诺.png"
    },
    {
        name: "cow",
        type: "image",
        value: "./qsy/data/奶牛.png"
    },
    {
        name: "shark",
        type: "image",
        value: "./qsy/data/鲨鱼.png"
    },
    {
        name: "planet",
        type: "image",
        value: "./qsy/data/土星.png"
    },
    {
        name: "tomas",
        type: "image",
        value: "./qsy/data/托马斯.png"
    },
    {
        name: "shoes",
        type: "image",
        value: "./qsy/data/鞋.png"
    },
    {
        name: "aishark",
        type: "image",
        value: "./qsy/data/耐克鲨鱼.png"
    }
]

function build(canvas){
    console.log("build");
    canvas.createNewScene("qsy_door_scene",res.getResource("qsy_door"));
    canvas.createNewScene("qsy_top_scene",res.getResource("qsy_top"));
    canvas.createNewScene("qsy_right_scene",res.getResource("qsy_right_bg"));
    canvas.createNewScene("qsy_left_scene",res.getResource("qsy_left_bg"));
    var qsy_door_scene_left_arrow=new Button(canvas.scene("qsy_door_scene"),0,0,57,89,5,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("qsy_left_scene"),98,443);
    var qsy_door_scene_right_arrow=new Button(canvas.scene("qsy_door_scene"),0,0,57,89,5,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("qsy_right_scene"),777,443);
    var qsy_left_scene_right_arrow=new Button(canvas.scene("qsy_left_scene"),0,0,57,89,5,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("qsy_door_scene"),777,443);
    var qsy_right_scene_left_arrow=new Button(canvas.scene("qsy_right_scene"),0,0,57,89,0,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("qsy_door_scene"),98,443);
    var qsy_door_scene_up_arrow=new Button(canvas.scene("qsy_door_scene"),0,0,88,46,5,res.getResource("up_arrow"),null,null,()=>{},()=>canvas.changeScene("qsy_top_scene"),416,114);
    var qsy_top_scene_down_arrow=new Button(canvas.scene("qsy_top_scene"),0,0,88,46,0,res.getResource("down_arrow"),null,null,()=>{},()=>canvas.changeScene("qsy_door_scene"),416,833);
    
    var qsy_door_scene_lock=new Button(canvas.scene("qsy_door_scene"),0,0,0,0,1,res.getResource("lock"),null,null,()=>{},()=>{});
    qsy_door_scene_lock.setClickable(false);

    var qsy_answer_box=new Input(canvas.scene("qsy_door_scene"),"gameInput",453,468,1);
    qsy_answer_box.setTextAlign("center");
    qsy_answer_box.setFillColor("black");
    qsy_answer_box.setFontHeight(40);
    qsy_answer_box.setFont("黑体");
    qsy_answer_box.clear();
    qsy_answer_box.setTransparentAlpha(0);
    var qsy_answer_box_fake_button=new Button(canvas.scene("qsy_door_scene"),362,395,180,98,2,null,null,null,()=>{},()=>{
        qsy_answer_box.enable();
        qsy_answer_box_fake_disable_button.setClickable(true);
        qsy_answer_box_fake_disable_button.setIgnoreClickEven(false);
    });
    qsy_answer_box_fake_button.setClickable(false);

    var qsy_answer_box_fake_disable_button=new Button(canvas.scene("qsy_door_scene"),0,0,935,935,10,null,null,null,()=>{},()=>{
        qsy_answer_box.disable();
        qsy_answer_box_fake_disable_button.setClickable(false);
        qsy_answer_box_fake_disable_button.setIgnoreClickEven(true);
    });
    qsy_answer_box_fake_disable_button.setClickable(false);
    qsy_answer_box_fake_disable_button.setIgnoreClickEven(true);

    var qsy_left_scene_stick=new Button(canvas.scene("qsy_left_scene"),779,46,76,231,11,res.getResource("stick"),null,null,()=>{},()=>check());
    var qsy_left_scene_tomas=new Button(canvas.scene("qsy_left_scene"),268,130,197,202,12,res.getResource("tomas"),null,null,()=>{},()=>check());
    var qsy_left_scene_cap=new Button(canvas.scene("qsy_left_scene"),784,484,121,141,13,res.getResource("cap"),null,null,()=>{},()=>check());
    var qsy_left_scene_ninja=new Button(canvas.scene("qsy_left_scene"),31,303,296,255,14,res.getResource("ninja"),null,null,()=>{},()=>check());
    var qsy_left_scene_shark=new Button(canvas.scene("qsy_left_scene"),238,504,335,118,15,res.getResource("shark"),null,null,()=>{},()=>check());
    var qsy_left_scene_shoes=new Button(canvas.scene("qsy_left_scene"),534,137,210,150,16,res.getResource("shoes"),null,null,()=>{},()=>check());
    var qsy_left_scene_cow=new Button(canvas.scene("qsy_left_scene"),432,320,276,207,17,res.getResource("cow"),null,null,()=>{},()=>check());
    var qsy_left_scene_planet=new Button(canvas.scene("qsy_left_scene"),9,20,390,204,18,res.getResource("planet"),null,null,()=>{},()=>check());
    var qsy_left_scene_foot=new Button(canvas.scene("qsy_left_scene"),753,356,94,88,19,res.getResource("foot"),null,null,()=>{},()=>check());

    qsy_left_scene_stick.setDraggable(true);
    qsy_left_scene_tomas.setDraggable(true);
    qsy_left_scene_cap.setDraggable(true);
    qsy_left_scene_ninja.setDraggable(true);
    qsy_left_scene_shark.setDraggable(true);
    qsy_left_scene_shoes.setDraggable(true);
    qsy_left_scene_cow.setDraggable(true);
    qsy_left_scene_planet.setDraggable(true);
    qsy_left_scene_foot.setDraggable(true);

    var qsy_left_scene_aitung=new Button(canvas.scene("qsy_left_scene"),0,0,131,295,21,res.getResource("aitung"),null,null,()=>{},()=>{});
    var qsy_left_scene_aicap=new Button(canvas.scene("qsy_left_scene"),0,0,395,226,22,res.getResource("aicap"),null,null,()=>{},()=>{});
    var qsy_left_scene_aishark=new Button(canvas.scene("qsy_left_scene"),0,0,335,203,23,res.getResource("aishark"),null,null,()=>{},()=>{});
    var qsy_left_scene_ai_cow_and_foot=new Button(canvas.scene("qsy_left_scene"),0,0,324,381,24,res.getResource("foot&cow"),null,null,()=>{},()=>check());
    var qsy_left_scene_ai_foot_and_planet=new Button(canvas.scene("qsy_left_scene"),0,0,485,378,25,res.getResource("foot&planet"),null,null,()=>{},()=>check());
    var qsy_left_scene_ai_cow_and_planet=new Button(canvas.scene("qsy_left_scene"),0,0,485,225,26,res.getResource("cow&planet"),null,null,()=>{},()=>check());
    var qsy_left_scene_ai_cow_and_foot_and_planet=new Button(canvas.scene("qsy_left_scene"),0,0,485,381,27,res.getResource("cow&foot&planet"),null,null,()=>{},()=>{});

    qsy_left_scene_aitung.setDraggable(true);
    qsy_left_scene_aitung.setIgnoreClickEven(true);
    qsy_left_scene_aitung.setTransparentAlpha(0);
    qsy_left_scene_aicap.setDraggable(true);
    qsy_left_scene_aicap.setIgnoreClickEven(true);
    qsy_left_scene_aicap.setTransparentAlpha(0);
    qsy_left_scene_aishark.setDraggable(true);
    qsy_left_scene_aishark.setIgnoreClickEven(true)
    qsy_left_scene_aishark.setTransparentAlpha(0);
    qsy_left_scene_ai_cow_and_foot.setDraggable(true);
    qsy_left_scene_ai_cow_and_foot.setIgnoreClickEven(true)
    qsy_left_scene_ai_cow_and_foot.setTransparentAlpha(0);
    qsy_left_scene_ai_foot_and_planet.setDraggable(true);
    qsy_left_scene_ai_foot_and_planet.setIgnoreClickEven(true)
    qsy_left_scene_ai_foot_and_planet.setTransparentAlpha(0);
    qsy_left_scene_ai_cow_and_planet.setDraggable(true);
    qsy_left_scene_ai_cow_and_planet.setIgnoreClickEven(true)
    qsy_left_scene_ai_cow_and_planet.setTransparentAlpha(0);
    qsy_left_scene_ai_cow_and_foot_and_planet.setDraggable(true);
    qsy_left_scene_ai_cow_and_foot_and_planet.setIgnoreClickEven(true)
    qsy_left_scene_ai_cow_and_foot_and_planet.setTransparentAlpha(0);

    var tungFlag=false;
    var capFlag=false;
    var sharkFlag=false;
    var cfFlag=false;
    var fpFlag=false;
    var cpFlag=false;
    var cfpFlag=false;

    function check(){
        if (!tungFlag && qsy_left_scene_stick.isCoincide(qsy_left_scene_tomas)){
            tungFlag=true;
            qsy_left_scene_stick.setIgnoreClickEven(true);
            qsy_left_scene_tomas.setIgnoreClickEven(true);
            
            qsy_left_scene_stick.shakeHorizontally(2000);
            qsy_left_scene_tomas.shakeHorizontally(2000);
        }
    }

    canvas.changeScene("qsy_door_scene");
    // qsy_answer_box.enable();
}

var res;

function init(canvas){
    res=new Resource(cfg); //加载素材
    res.onload=()=>build(canvas); //仅测试用
}

export default{
    init,build
};

