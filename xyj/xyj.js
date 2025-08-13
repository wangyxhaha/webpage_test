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
        name: "xyj_door_bg",
        type: "image",
        value: "./xyj/data/xyj背景门.jpg"
    },
    {
        name: "xyj_top_bg",
        type: "image",
        value: "./xyj/data/xyj顶.jpg"
    },
    {
        name: "xyj_left_bg",
        type: "image",
        value: "./xyj/data/xyj左.jpg"
    },
    {
        name: "xyj_right_bg",
        type: "image",
        value: "./xyj/data/xyj右.jpg"
    },
    {
        name: "left_arrow",
        type: "image",
        value: "./xyj/data/左.png"
    },
    {
        name: "right_arrow",
        type: "image",
        value: "./xyj/data/右.png"
    },
    {
        name: "up_arrow",
        type: "image",
        value: "./xyj/data/上.png"
    },
    {
        name: "down_arrow",
        type: "image",
        value: "./xyj/data/下.png"
    },
    {
        name: "lock",
        type: "image",
        value: "./xyj/data/锁.png"
    },
    {
        name: "rook_black",
        type: "image",
        value: "./xyj/data/黑車.png"
    },
    {
        name: "knight_red",
        type: "image",
        value: "./xyj/data/红馬.png"
    },
    {
        name: "elephant_black",
        type: "image",
        value: "./xyj/data/黑象.png"
    },
    {
        name: "mandarin_red",
        type: "image",
        value: "./xyj/data/红仕.png"
    },
    {
        name: "king_black",
        type: "image",
        value: "./xyj/data/黑将.png"
    },
    {
        name: "king_red",
        type: "image",
        value: "./xyj/data/红帥.png"
    },
    {
        name: "cannon_red",
        type: "image",
        value: "./xyj/data/红炮.png"
    },
    {
        name: "pawn_black",
        type: "image",
        value: "./xyj/data/黑卒.png"
    },
    {
        name: "pawn_red1",
        type: "image",
        value: "./xyj/data/红兵1.png"
    },
    {
        name: "pawn_red2",
        type: "image",
        value: "./xyj/data/红兵2.png"
    },
    {
        name: "win",
        type: "image",
        value: "./xyj/data/红兵2.png"
    },
    {
        name: "lose",
        type: "image",
        value: "./xyj/data/红兵2.png"
    },
    {
        name: "try_again",
        type: "image",
        value: "./xyj/data/红兵2.png"
    },
]

function build(canvas){
    console.log("build");
    canvas.createNewScene("xyj_door_scene",res.getResource("xyj_door_bg"));
    canvas.createNewScene("xyj_top_scene",res.getResource("xyj_top_bg"));
    canvas.createNewScene("xyj_left_scene",res.getResource("xyj_left_bg"));
    canvas.createNewScene("xyj_right_scene",res.getResource("xyj_right_bg"));
    var xyj_door_scene_left_arrow=new Button(canvas.scene("xyj_door_scene"),0,0,57,89,0,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("xyj_left_scene"),98,443);
    var xyj_door_scene_right_arrow=new Button(canvas.scene("xyj_door_scene"),0,0,57,89,0,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("xyj_right_scene"),777,443);
    var xyj_left_scene_right_arrow=new Button(canvas.scene("xyj_left_scene"),0,0,57,89,0,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("xyj_door_scene"),777,443);
    var xyj_right_scene_left_arrow=new Button(canvas.scene("xyj_right_scene"),0,0,57,89,0,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("xyj_door_scene"),98,443);
    var xyj_door_scene_up_arrow=new Button(canvas.scene("xyj_door_scene"),0,0,88,46,0,res.getResource("up_arrow"),null,null,()=>{},()=>canvas.changeScene("xyj_top_scene"),416,114);
    var xyj_top_scene_down_arrow=new Button(canvas.scene("xyj_top_scene"),0,0,88,46,0,res.getResource("down_arrow"),null,null,()=>{},()=>canvas.changeScene("xyj_door_scene"),416,833);
    
    var xyj_door_scene_lock=new Button(canvas.scene("xyj_door_scene"),0,0,0,0,1,res.getResource("lock"),null,null,()=>{},()=>{});
    xyj_door_scene_lock.setClickable(false);
    
    var xyj_answer_box=new Input(canvas.scene("xyj_door_scene"),"gameInput",453,468,1);
    xyj_answer_box.setTextAlign("center");
    xyj_answer_box.setFillColor("black");
    xyj_answer_box.setFontHeight(40);
    xyj_answer_box.setFont("黑体");
    xyj_answer_box.clear();
    var xyj_answer_box_fake_button=new Button(canvas.scene("xyj_door_scene"),362,395,180,98,2,null,null,null,()=>{},()=>{
        xyj_answer_box.enable();
        xyj_answer_box_fake_disable_button.setClickable(true);
        xyj_answer_box_fake_disable_button.setIgnoreClickEvent(false);
    });
    xyj_answer_box_fake_button.setClickable(false);

    var xyj_answer_box_fake_disable_button=new Button(canvas.scene("xyj_door_scene"),0,0,935,935,2,null,null,null,()=>{},()=>{
        xyj_answer_box.disable();
        xyj_answer_box_fake_disable_button.setClickable(false);
        xyj_answer_box_fake_disable_button.setIgnoreClickEvent(true);
    });
    xyj_answer_box_fake_disable_button.setClickable(false);
    xyj_answer_box_fake_disable_button.setIgnoreClickEvent(true);

    var xyj_game_scene=new Animation([
        {
            image: null,
            interval: Infinity
        },
        {
            image: res.getResource("win"),
            interval: Infinity
        },
        {
            image: res.getResource("lose"),
            interval: Infinity
        }
    ])

    var setEvent=new CustomEvent('setGame');
    var startEvent=new CustomEvent('startGame');
    var loseEvent=new CustomEvent('loseGame');
    var winEvent=new CustomEvent('winGame');

    var x=[221,272,327,382,432,481,536,591,643];
    var y=[135,184,237,293,349,433,489,545,601,655];

    function checkRook(p,){

    }
 
    var flag=[
        [false,false,true,false,false,false,false,false,true],
        [false,false,false,false,true,false,false,false,false],
        [false,false,true,false,false,false,true,true,false],
        [false,false,true,false,true,false,false,false,false],
        [false,false,false,false,true,false,false,true,false],
        [false,false,true,false,false,false,false,false,false],
        [false,true,false,false,false,false,false,true,false],
        [false,false,false,false,true,false,false,false,false],
        [false,true,false,false,false,true,false,false,false],
    ]

    var xyj_left_scene_rook_black=new Button(canvas.scene("xyj_left_scene"),x[8],y[0],70,70,11,res.getResource("rook_black"),null,null,()=>{},()=>{
        //xyj_left_scene_rook_black.setPosition(x[8],y[0]);
        //checkRook(xyj_left_scene_rook_black.getPosition());
    });
    var xyj_left_scene_knight_red=new Button(canvas.scene("xyj_left_scene"),x[1],y[9],70,70,11,res.getResource("knight_red"),null,null,()=>{},()=>{});
    var xyj_left_scene_elephant_black=new Button(canvas.scene("xyj_left_scene"),x[2],y[0],70,70,11,res.getResource("elephant_black"),null,null,()=>{},()=>{});
    var xyj_left_scene_mandarin_red=new Button(canvas.scene("xyj_left_scene"),x[5],y[9],70,70,11,res.getResource("mandarin_red"),null,null,()=>{},()=>{});
    var xyj_left_scene_king_black=new Button(canvas.scene("xyj_left_scene"),x[4],y[1],70,70,11,res.getResource("king_black"),null,null,()=>{},()=>{});
    var xyj_left_scene_king_red=new Button(canvas.scene("xyj_left_scene"),x[4],y[8],70,70,11,res.getResource("king_red"),null,null,()=>{},()=>{});
    var xyj_left_scene_cannon_red=new Button(canvas.scene("xyj_left_scene"),x[1],y[7],70,70,11,res.getResource("cannon_red"),null,null,()=>{},()=>{});
    var xyj_left_scene_pawn_black=new Button(canvas.scene("xyj_left_scene"),x[2],y[6],70,70,11,res.getResource("pawn_black"),null,null,()=>{},()=>{});
    var xyj_left_scene_pawn_red1=new Button(canvas.scene("xyj_left_scene"),x[2],y[3],70,70,11,res.getResource("pawn_red1"),null,null,()=>{},()=>{});
    var xyj_left_scene_pawn_red2=new Button(canvas.scene("xyj_left_scene"),x[4],y[3],70,70,11,res.getResource("pawn_red2"),null,null,()=>{},()=>{});

    var pieces=[];
    pieces.push(
        xyj_left_scene_rook_black,
        xyj_left_scene_knight_red,
        xyj_left_scene_elephant_black,
        xyj_left_scene_mandarin_red,
        xyj_left_scene_king_black,
        xyj_left_scene_king_red,
        xyj_left_scene_cannon_red,
        xyj_left_scene_pawn_black,
        xyj_left_scene_pawn_red1,
        xyj_left_scene_pawn_red2
    )

    document.addEventListener('setGame',()=>{
        pieces.forEach(function(element){
            element.setDraggable(true);
        })
    });


    document.dispatchEvent(setEvent);
    console.log("setGame");

    canvas.changeScene("xyj_left_scene");
}

var res;

function init(canvas){
    res=new Resource(cfg); //加载素材
    res.onload=()=>build(canvas); //仅测试用
}

export default{
    init,build
};