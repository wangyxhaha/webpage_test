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
        name: "nmy_door",
        type: "image",
        value: "./nmy/data/扭背景门.jpg"
    },
    {
        name: "nmy_top",
        type: "image",
        value: "./nmy/data/扭顶.jpg"
    },
    {
        name: "nmy_figure",
        type: "image",
        value: "./nmy/data/扭形象.png"
    },
    {
        name: "nmy_right_bg",
        type: "image",
        value: "./nmy/data/扭右底图.jpg"
    },
    {
        name: "nmy_left_bg",
        type: "image",
        value: "./nmy/data/扭左底图.jpg"
    },
    {
        name: "left_arrow",
        type: "image",
        value: "./nmy/data/左.png"
    },
    {
        name: "right_arrow",
        type: "image",
        value: "./nmy/data/右.png"
    },
    {
        name: "up_arrow",
        type: "image",
        value: "./nmy/data/上.png"
    },
    {
        name: "down_arrow",
        type: "image",
        value: "./nmy/data/下.png"
    },
    {
        name: "lock",
        type: "image",
        value: "./nmy/data/锁.png"
    },
    {
        name: "undo",
        type: "image",
        value: "./nmy/data/撤销.png"
    },
    {
        name: "record1",
        type: "image",
        value: "./nmy/data/唱片1.png"
    },
    {
        name: "record2",
        type: "image",
        value: "./nmy/data/唱片2.png"
    },
    {
        name: "record3",
        type: "image",
        value: "./nmy/data/唱片3.png"
    },
    {
        name: "record4",
        type: "image",
        value: "./nmy/data/唱片4.png"
    },
    {
        name: "record5",
        type: "image",
        value: "./nmy/data/唱片5.png"
    },
    {
        name: "yorushika1",
        type: "image",
        value: "./nmy/data/夜鹿1.png"
    },
    {
        name: "yorushika2",
        type: "image",
        value: "./nmy/data/夜鹿2.png"
    },
    {
        name: "yorushika3",
        type: "image",
        value: "./nmy/data/夜鹿3.png"
    },
    {
        name: "yorushika4",
        type: "image",
        value: "./nmy/data/夜鹿4.png"
    },
    {
        name: "yorushika5",
        type: "image",
        value: "./nmy/data/夜鹿5.png"
    },
    {
        name: "chunnibang",
        type: "audio",
        value: "./nmy/data/春泥棒.mp3"
    },
    {
        name: "youxing",
        type: "audio",
        value: "./nmy/data/游行.mp3"
    },
    {
        name: "youyicheng",
        type: "audio",
        value: "./nmy/data/忧一乘.mp3"
    },
    {
        name: "huarenju",
        type: "audio",
        value: "./nmy/data/花人局.mp3"
    },
    {
        name: "xuededubai",
        type: "audio",
        value: "./nmy/data/雪的独白.mp3"
    },
    {
        name: "chunnibang_niu",
        type: "audio",
        value: "./nmy/data/春泥棒扭版.mp3"
    },
    {
        name: "youxing_niu",
        type: "audio",
        value: "./nmy/data/游行扭版.mp3"
    },
    {
        name: "youyicheng_niu",
        type: "audio",
        value: "./nmy/data/忧一乘扭版.mp3"
    },
    {
        name: "huarenju_niu",
        type: "audio",
        value: "./nmy/data/花人局扭版.mp3"
    },
    {
        name: "451",
        type: "audio",
        value: "./nmy/data/451.mp3"
    }
]

function isIn(p){ //218 701 704 934
    return p.x>=218-100 && p.x<=704 && p.y>=701-100 && p.y<=934;
}

function build(canvas){
    console.log("build");
    canvas.createNewScene("nmy_door_scene",res.getResource("nmy_door"));
    canvas.createNewScene("nmy_top_scene",res.getResource("nmy_top"));
    canvas.createNewScene("nmy_right_scene",res.getResource("nmy_right_bg"));
    canvas.createNewScene("nmy_left_scene",res.getResource("nmy_left_bg"));
    var nmy_door_scene_left_arrow=new Button(canvas.scene("nmy_door_scene"),0,0,57,89,5,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("nmy_left_scene"),98,443);
    var nmy_door_scene_right_arrow=new Button(canvas.scene("nmy_door_scene"),0,0,57,89,5,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("nmy_right_scene"),777,443);
    var nmy_left_scene_right_arrow=new Button(canvas.scene("nmy_left_scene"),0,0,57,89,0,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("nmy_door_scene"),777,443);
    var nmy_right_scene_left_arrow=new Button(canvas.scene("nmy_right_scene"),-100,0,57,89,0,res.getResource("left_arrow"),null,null,()=>{},()=>{stopAllMusic();canvas.changeScene("nmy_door_scene");},98,443);
    var nmy_door_scene_up_arrow=new Button(canvas.scene("nmy_door_scene"),0,0,88,46,5,res.getResource("up_arrow"),null,null,()=>{},()=>canvas.changeScene("nmy_top_scene"),416,114);
    var nmy_top_scene_down_arrow=new Button(canvas.scene("nmy_top_scene"),0,0,88,46,0,res.getResource("down_arrow"),null,null,()=>{},()=>canvas.changeScene("nmy_door_scene"),416,833);
    
    var nmy_door_scene_figure=new Button(canvas.scene("nmy_door_scene"),0,0,0,0,1,res.getResource("nmy_figure"),null,null,()=>{},()=>{});

    var nmy_door_scene_lock=new Button(canvas.scene("nmy_door_scene"),0,0,0,0,1,res.getResource("lock"),null,null,()=>{},()=>{});
    nmy_door_scene_lock.setClickable(false);

    var nmy_answer_box=new Input(canvas.scene("nmy_door_scene"),"gameInput",453,468,1);
    nmy_answer_box.setTextAlign("center");
    nmy_answer_box.setFillColor("black");
    nmy_answer_box.setFontHeight(40);
    nmy_answer_box.setFont("黑体");
    nmy_answer_box.clear();
    nmy_answer_box.setTransparentAlpha(0);
    var nmy_answer_box_fake_button=new Button(canvas.scene("nmy_door_scene"),362,395,180,98,2,null,null,null,()=>{},()=>{
        nmy_answer_box.enable();
        nmy_answer_box_fake_disable_button.setClickable(true);
        nmy_answer_box_fake_disable_button.setIgnoreClickEven(false);
    });
    nmy_answer_box_fake_button.setClickable(false);

    var nmy_answer_box_fake_disable_button=new Button(canvas.scene("nmy_door_scene"),0,0,935,935,10,null,null,null,()=>{},()=>{
        nmy_answer_box.disable();
        nmy_answer_box_fake_disable_button.setClickable(false);
        nmy_answer_box_fake_disable_button.setIgnoreClickEven(true);
    });
    nmy_answer_box_fake_disable_button.setClickable(false);
    nmy_answer_box_fake_disable_button.setIgnoreClickEven(true);

    var nmy_right_scene_record1=new Button(canvas.scene("nmy_right_scene"),0,0,304,304,-1,res.getResource("record1"),null,null,()=>{},()=>{stopAllMusic();res.getResource("xuededubai").play();},315,303);
    // nmy_right_scene_record1.setClickable(false);
    var nmy_right_scene_record2=new Button(canvas.scene("nmy_right_scene"),0,0,254,254,-1,res.getResource("record2"),null,null,()=>{},()=>{stopAllMusic();res.getResource("youxing").play();},625,55);
    // nmy_right_scene_record2.setClickable(false);
    var nmy_right_scene_record3=new Button(canvas.scene("nmy_right_scene"),0,0,253,246,-1,res.getResource("record3"),null,null,()=>{},()=>{stopAllMusic();res.getResource("youyicheng").play();},56,617);
    // nmy_right_scene_record3.setClickable(false);
    var nmy_right_scene_record4=new Button(canvas.scene("nmy_right_scene"),0,0,245,245,-1,res.getResource("record4"),null,null,()=>{},()=>{stopAllMusic();res.getResource("huarenju").play();},629,610);
    // nmy_right_scene_record4.setClickable(false);
    var nmy_right_scene_record5=new Button(canvas.scene("nmy_right_scene"),0,0,246,246,-1,res.getResource("record5"),null,null,()=>{},()=>{stopAllMusic();res.getResource("chunnibang").play();},55,62);
    // nmy_right_scene_record5.setClickable(false);

    var flag=[false,false,false,false,false];

    function check1(){
        let f=flag[0]&&flag[1]&&flag[2]&&flag[3]&&flag[4];
        nmy_door_scene_lock.setTransparentAlpha(f ? 0 : 1);
        nmy_answer_box_fake_button.setClickable(f);
        nmy_answer_box.setTransparentAlpha(f ? 1 : 0);
    }

    var nmy_right_scene_yorushika1=new Button(canvas.scene("nmy_right_scene"),402,217,112,76,11,res.getResource("yorushika1"),null,null,()=>{},()=>{
        stopAllMusic();
        res.getResource("451").play();
        nmy_right_scene_yorushika1.stayIn();
        flag[0]=nmy_right_scene_yorushika1.isCoincide(nmy_right_scene_record1);
        if (!flag[0]) nmy_right_scene_yorushika1.shakeHorizontally();
        check1();
    });
    nmy_right_scene_yorushika1.setDraggable(true);
    var nmy_right_scene_yorushika2=new Button(canvas.scene("nmy_right_scene"),769,448,112,76,12,res.getResource("yorushika2"),null,null,()=>{},()=>{
        stopAllMusic();
        res.getResource("chunnibang_niu").play();
        nmy_right_scene_yorushika2.stayIn();
        flag[1]=nmy_right_scene_yorushika2.isCoincide(nmy_right_scene_record5);
        if (!flag[1]) nmy_right_scene_yorushika2.shakeHorizontally();
        check1();
    });
    nmy_right_scene_yorushika2.setDraggable(true);
    var nmy_right_scene_yorushika3=new Button(canvas.scene("nmy_right_scene"),632,449,112,76,13,res.getResource("yorushika3"),null,null,()=>{},()=>{
        stopAllMusic();
        res.getResource("youyicheng_niu").play();
        nmy_right_scene_yorushika3.stayIn();
        flag[2]=nmy_right_scene_yorushika3.isCoincide(nmy_right_scene_record3);
        if (!flag[2]) nmy_right_scene_yorushika3.shakeHorizontally();
        check1();
    });
    nmy_right_scene_yorushika3.setDraggable(true);
    var nmy_right_scene_yorushika4=new Button(canvas.scene("nmy_right_scene"),186,444,112,76,14,res.getResource("yorushika4"),null,null,()=>{},()=>{
        stopAllMusic();
        res.getResource("huarenju_niu").play();
        nmy_right_scene_yorushika4.stayIn();
        flag[3]=nmy_right_scene_yorushika4.isCoincide(nmy_right_scene_record4);
        if (!flag[3]) nmy_right_scene_yorushika4.shakeHorizontally();
        check1();
    });
    nmy_right_scene_yorushika4.setDraggable(true);
    var nmy_right_scene_yorushika5=new Button(canvas.scene("nmy_right_scene"),41,447,112,76,15,res.getResource("yorushika5"),null,null,()=>{},()=>{
        stopAllMusic();
        res.getResource("youxing_niu").play();
        nmy_right_scene_yorushika5.stayIn();
        flag[4]=nmy_right_scene_yorushika5.isCoincide(nmy_right_scene_record2);
        if (!flag[4]) nmy_right_scene_yorushika5.shakeHorizontally();
        check1();
    });
    nmy_right_scene_yorushika5.setDraggable(true);

    
    canvas.changeScene("nmy_door_scene");
    // nmy_answer_box.enable();
}

var res;

function init(canvas){
    res=new Resource(cfg); //加载素材
    res.onload=()=>build(canvas); //仅测试用
}

function stopAllMusic(){
    res.getResource("chunnibang").stop();
    res.getResource("youxing").stop();
    res.getResource("youyicheng").stop();
    res.getResource("huarenju").stop();
    res.getResource("xuededubai").stop();
    res.getResource("chunnibang_niu").stop();
    res.getResource("youxing_niu").stop();
    res.getResource("youyicheng_niu").stop();
    res.getResource("huarenju_niu").stop();
    res.getResource("451").stop();
}

export default{
    init,build
};

