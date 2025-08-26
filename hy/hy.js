"use strict"

import Resource from "../resource.js"
import Canvas from "../canvas.js";
import Button from "../button.js";
import Animation from "../animation.js";
import Input from "../input.js";
import Text from "../text.js"
import "../buttonPlugin.js";
import "../spritePlugin.js"

var cfg=[ //所需素材的信息
    {
        name: "hy_door",
        type: "image",
        value: "./hy/data/韩奕背景门.png"
    },
    {
        name: "hy_top",
        type: "image",
        value: "./hy/data/韩奕顶.jpg"
    },
    {
        name: "hy_top_blank",
        type: "image",
        value: "./hy/data/韩奕顶空白.jpg"
    },
    {
        name: "hy_top",
        type: "image",
        value: "./hy/data/韩奕顶.jpg"
    },
    {
        name: "hy_right_bg",
        type: "image",
        value: "./hy/data/韩奕右底图.jpg"
    },
    {
        name: "hy_left_bg",
        type: "image",
        value: "./hy/data/韩奕左底图.jpg"
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
        name: "white_block",
        type: "image",
        value: "./hy/data/white_block.png"
    },
    {
        name: "green_block",
        type: "image",
        value: "./hy/data/green_block.png"
    },
    {
        name: "L1",
        type: "image",
        value: "./hy/data/右L1.png"
    },
    {
        name: "L2",
        type: "image",
        value: "./hy/data/右L2.png"
    },
    {
        name: "L2_reverse",
        type: "image",
        value: "./hy/data/右L2翻转.png"
    },
    {
        name: "reverse_button",
        type: "image",
        value: "./hy/data/左右翻转.png"
    },
    {
        name: "small_cup",
        type: "image",
        value: "./hy/data/杯子缩小.png"
    },
    {
        name: "big_cup",
        type: "image",
        value: "./hy/data/杯子放大.png"
    },
    {
        name: "BOOKOS",
        type: "font",
        value: "./hy/data/BOOKOS.TTF"
    },
    {
        name: "hy_figure",
        type: "image",
        value: "./hy/data/hy_figure.png"
    }
]

function build(canvas){
    console.log("build hy");

    var top_imgs=new Animation([
        {
            image: res.getResource("hy_top_blank"),
            interval: Infinity
        },
        {
            image: res.getResource("hy_top"),
            interval: Infinity
        }
    ]);

    canvas.createNewScene("hy_door_scene",res.getResource("hy_door"));
    canvas.createNewScene("hy_top_scene",top_imgs);
    canvas.createNewScene("hy_right_scene",res.getResource("hy_right_bg"));
    canvas.createNewScene("hy_left_scene",res.getResource("hy_left_bg"));
    var hy_door_scene_left_arrow=new Button(canvas.scene("hy_door_scene"),0,0,57,89,5,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("hy_left_scene"),98,443);
    var hy_door_scene_right_arrow=new Button(canvas.scene("hy_door_scene"),0,0,57,89,5,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("hy_right_scene"),777,443);
    var hy_left_scene_right_arrow=new Button(canvas.scene("hy_left_scene"),0,0,57,89,300,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("hy_door_scene"),777,443);
    var hy_right_scene_left_arrow=new Button(canvas.scene("hy_right_scene"),0,0,57,89,0,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("hy_door_scene"),98,443);
    var hy_door_scene_up_arrow=new Button(canvas.scene("hy_door_scene"),0,0,88,46,5,res.getResource("up_arrow"),null,null,()=>{},()=>canvas.changeScene("hy_top_scene"),416,114);
    var hy_top_scene_down_arrow=new Button(canvas.scene("hy_top_scene"),0,0,88,46,0,res.getResource("down_arrow"),null,null,()=>{},()=>canvas.changeScene("hy_door_scene"),416,833);

    var hy_door_scene_lock=new Button(canvas.scene("hy_door_scene"),0,0,0,0,1,res.getResource("lock"),null,null,()=>{},()=>{});
    hy_door_scene_lock.setClickable(false);

    var hy_answer_box=new Input(canvas.scene("hy_door_scene"),"gameInput",453,468,1);
    // var hy_answer_box=new Input(canvas.scene("hy_door_scene"),"cup_input",453,468,1);
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

    var sayingRunning=false;
    var sayingList=[];
    var nowSaying=-1;
    for (let i=0;i<sayingList.length;i++){
        sayingList[i].setClickable(false);
        sayingList[i].setTransparentAlpha(0);
    }
    var hy_door_scene_figure=new Button(canvas.scene("hy_door_scene"),0,0,245,424,2,res.getResource("hy_figure"),null,null,()=>{},()=>{
        // if (sayingRunning) return;
        // console.log("!");
        // sayingRunning=true;
        // nowSaying=(nowSaying+1)%sayingList.length;
        // sayingList[nowSaying].floatUp(0,0,300);
        // setTimeout(()=>sayingList[nowSaying].setTransparentAlpha(0),2000);
        // setTimeout(()=>sayingRunning=false,2100);
    },591,463);

    var hy_left_scene_blocks=[];
    for (let i=0;i<5;i++){
        let row=[];
        for (let j=0;j<5;j++){
            if (j===2 && i!=2){
                row.push(null);
                continue;
            }
            let temp={appearance: new Animation(
                [
                    {
                        image: res.getResource("white_block"),
                        interval: Infinity
                    },
                    {
                        image: res.getResource("green_block"),
                        interval: Infinity
                    }
                ]),
                state: "asleep"
            };
            temp.button=new Button(canvas.scene("hy_left_scene"),208+j*105,208+i*105,100,100,100+i*10+j,temp.appearance,null,null,()=>{},()=>{});
            temp.button.setClickable(false);
            temp.button.setTransparentAlpha(0);
            row.push(temp);
        }
        hy_left_scene_blocks.push(row);
    }
    console.log(hy_left_scene_blocks);


    let activated_list=[];
    let loop_running=false;
    let finish_left=false;
    let di=[-1,0,1,0];
    let dj=[0,1,0,-1];
    var hy_left_scene_mover=new Button(canvas.scene("hy_left_scene"),0,0,935,935,200,null,null,null,pos=>{
        if (finish_left) return;
        let get_pointer_pos=()=>{
            let p=hy_left_scene_mover.getPosition();
            return {x:pos.x+p.x,y:pos.y+p.y};
        };
        let which=null;
        if (!hy_left_scene_blocks.some((v1,i)=>v1.some((v2,j)=>v2?.button?.isPositionIn(pos) && (which={i,j},true)))){
            // console.log("!!!");
            return;
        }
        // console.log(which);
        hy_left_scene_blocks[which.i][which.j].state="activated";
        hy_left_scene_blocks[which.i][which.j].appearance.to(1);
        activated_list.push(which);
        loop_running=true;
        let loop=()=>{
            if (!loop_running) return;
            let pointer_pos=get_pointer_pos();
            if (hy_left_scene_blocks.some((v1,i)=>v1.some((v2,j)=>v2?.button?.isPositionIn(pointer_pos) && (which={i,j},true)))){
                if (hy_left_scene_blocks[which.i][which.j].state==="activated"){
                    if (activated_list.length>=2 && which.i===activated_list[activated_list.length-2].i && which.j===activated_list[activated_list.length-2].j){
                        hy_left_scene_blocks[activated_list[activated_list.length-1].i][activated_list[activated_list.length-1].j].state="asleep";
                        hy_left_scene_blocks[activated_list[activated_list.length-1].i][activated_list[activated_list.length-1].j].appearance.to(0);
                        activated_list.pop();
                    }
                }
                else{
                    for (let i=0;i<4;i++){
                        if (which.i+di[i]>=0 && which.i+di[i]<5 && which.j+dj[i]>=0 && which.j+dj[i]<5
                        && which.i+di[i]===activated_list[activated_list.length-1].i && which.j+dj[i]===activated_list[activated_list.length-1].j){
                            hy_left_scene_blocks[which.i][which.j].state="activated";
                            hy_left_scene_blocks[which.i][which.j].appearance.to(1);
                            activated_list.push({i:which.i,j:which.j});
                            break;
                        }
                    }
                }
            }
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    },()=>{
        if (finish_left) return;
        loop_running=false;
        hy_left_scene_mover.setPosition(0,0);
        // console.log(activated_list.length);
        if (activated_list.length===21){
            finish_left=true;
            hy_left_scene_mover.setDraggable(false);
            check();
            return;
        }
        for (let i=0;i<5;i++){
            for (let j=0;j<5;j++){
                if (hy_left_scene_blocks[i][j]?.state){
                    hy_left_scene_blocks[i][j].appearance.to(0);
                    hy_left_scene_blocks[i][j].state="asleep";
                }
            }
        }
        activated_list=[];
    });
    hy_left_scene_mover.setDraggable(true);
    hy_left_scene_mover.setIgnoreClickEvent(true);


    let finish_right=false;

    var hy_right_scene_L1=new Button(canvas.scene("hy_right_scene"),233,235,220,379,1,res.getResource("L1"),null,null,()=>{},()=>{
        if (L2_box_relative_now===1 && Math.abs((hy_right_scene_L1.getPosition().x-hy_right_scene_L2.getPosition().x)-300)<=30 &&
        Math.abs((hy_right_scene_L1.getPosition().y-hy_right_scene_L2.getPosition().y)-124)<=30){
            hy_right_scene_L1.setPosition(hy_right_scene_L2.getPosition().x+300,hy_right_scene_L2.getPosition().y+124);
            hy_right_scene_L2.setDraggable(false);
            hy_right_scene_L2.setClickable(false);
            hy_right_scene_L1.setDraggable(false);
            hy_right_scene_L1.setClickable(false);
            finish_right=true;
        }
        check();
    });
    hy_right_scene_L1.setDraggable(true);

    var L2_imgs=new Animation([
        {
            image: res.getResource("L2"),
            interval: Infinity
        },
        {
            image: res.getResource("L2_reverse"),
            interval: Infinity
        }
    ]);
    var L2_box_relative=[
        {x:507,y:122},
        {x:337,y:122}
    ];
    var L2_box_relative_now=0;

    let L2_moving=false;
    var hy_right_scene_L2=new Button(canvas.scene("hy_right_scene"),0,0,220,591,2,L2_imgs,null,null,()=>{
        L2_moving=true;
        let loop=()=>{
            hy_right_scene_reverse_button.setPosition(hy_right_scene_L2.getPosition().x,hy_right_scene_L2.getPosition().y);
            if (L2_moving) requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    },()=>{
        L2_moving=false;
        // console.log(hy_right_scene_L2.getPosition());
        if (L2_box_relative_now===1 && Math.abs((hy_right_scene_L1.getPosition().x-hy_right_scene_L2.getPosition().x)-300)<=30 &&
        Math.abs((hy_right_scene_L1.getPosition().y-hy_right_scene_L2.getPosition().y)-124)<=30){
            hy_right_scene_L2.setPosition(hy_right_scene_L1.getPosition().x-300,hy_right_scene_L1.getPosition().y-124);
            hy_right_scene_L2.setDraggable(false);
            hy_right_scene_L2.setClickable(false);
            hy_right_scene_L1.setDraggable(false);
            hy_right_scene_L1.setClickable(false);
            finish_right=true;
        }
        check();
    },507,122); // 337,122
    hy_right_scene_L2.setDraggable(true);

    // dx=300 dy=124

    var hy_right_scene_reverse_button=new Button(canvas.scene("hy_right_scene"),0,0,65,65,3,res.getResource("reverse_button"),null,null,()=>{},()=>{
        L2_imgs.nextFrame();
        L2_box_relative_now^=1;
        hy_right_scene_L2.boxX=L2_box_relative[L2_box_relative_now].x;
        hy_right_scene_L2.boxY=L2_box_relative[L2_box_relative_now].y;
    },494,16);

    hy_right_scene_L1.setTransparentAlpha(0);
    hy_right_scene_L1.setIgnoreClickEvent(true);
    hy_right_scene_L2.setTransparentAlpha(0);
    hy_right_scene_L2.setIgnoreClickEvent(true);
    hy_right_scene_reverse_button.setTransparentAlpha(0);
    hy_right_scene_reverse_button.setIgnoreClickEvent(true);

    let unlock=[false,false,false];

    var cup_input=document.createElement("input");
    cup_input.id="cup_input";
    cup_input.type="text";
    cup_input.className="input_element";
    cup_input.maxLength=2;
    cup_input.oninput=()=>{
        cup_input.value=cup_input.value.replace(/[^a-zA-Z]/g,'');
        if (cup_input.value.length>2) cup_input.value=cup_input.value.substring(0,2);
        hy_door_scene_bug_cup_word1.value=cup_input.value.substring(0,1);
        hy_door_scene_bug_cup_word2.value=cup_input.value.substring(1,2);
        if (cup_input.value==="ss"){
            if (unlock[0]) return;
            unlock[0]=true;
            hy_door_scene_left_arrow.shakeHorizontally();
            for (let i=0;i<5;i++){
                for (let j=0;j<5;j++){
                    if (hy_left_scene_blocks[i][j]?.button){
                        hy_left_scene_blocks[i][j].button.setTransparentAlpha(1);
                    }
                }
            }
            hy_left_scene_mover.setIgnoreClickEvent(false);
        }
        else if (cup_input.value==="ll"){
            if (unlock[1]) return;
            unlock[1]=true;
            hy_door_scene_right_arrow.shakeHorizontally();
            hy_right_scene_L1.setTransparentAlpha(1);
            hy_right_scene_L1.setIgnoreClickEvent(false);
            hy_right_scene_L2.setTransparentAlpha(1);
            hy_right_scene_L2.setIgnoreClickEvent(false);
            hy_right_scene_reverse_button.setTransparentAlpha(1);
            hy_right_scene_reverse_button.setIgnoreClickEvent(false);
        }
        else if (cup_input.value==="ck"){
            if (unlock[2]) return;
            unlock[2]=true;
            hy_door_scene_up_arrow.shakeHorizontally();
            top_imgs.to(1);
        }
    };
    document.getElementById("input_container").appendChild(cup_input);

    var hy_door_scene_cup_input=new Input(canvas.scene("hy_door_scene"),"cup_input",0,0,0);
    // hy_door_scene_cup_input.setTransparentAlpha(1);

    var hy_door_scene_small_cup=new Button(canvas.scene("hy_door_scene"),0,0,168,151,1,res.getResource("small_cup"),null,null,()=>{},()=>{
        hy_door_scene_small_cup.setTransparentAlpha(0);
        hy_door_scene_big_cup.setTransparentAlpha(1);
        hy_door_scene_big_cup.setIgnoreClickEvent(false);
        hy_door_scene_bug_cup_word1.value="";
        hy_door_scene_bug_cup_word2.value="";
        hy_door_scene_bug_cup_word1.setTransparentAlpha(1);
        hy_door_scene_bug_cup_word2.setTransparentAlpha(1);
        hy_door_scene_cup_input.clear();
        hy_door_scene_cup_input.enable();
    },370,738);

    var hy_door_scene_big_cup=new Button(canvas.scene("hy_door_scene"),0,0,935,935,100,res.getResource("big_cup"),null,null,()=>{},()=>{
        hy_door_scene_small_cup.setTransparentAlpha(1);
        hy_door_scene_big_cup.setTransparentAlpha(0);
        hy_door_scene_big_cup.setIgnoreClickEvent(true);
        hy_door_scene_bug_cup_word1.setTransparentAlpha(0);
        hy_door_scene_bug_cup_word2.setTransparentAlpha(0);
        hy_door_scene_cup_input.disable();
    });
    hy_door_scene_big_cup.setTransparentAlpha(0);
    hy_door_scene_big_cup.setIgnoreClickEvent(true);

    var hy_door_scene_bug_cup_word1=new Text(canvas.scene("hy_door_scene"),460,575,101);
    var hy_door_scene_bug_cup_word2=new Text(canvas.scene("hy_door_scene"),525,575,101);
    hy_door_scene_bug_cup_word1.setFontHeight(70);
    hy_door_scene_bug_cup_word2.setFontHeight(70);
    hy_door_scene_bug_cup_word1.setFont("BOOKOS");
    hy_door_scene_bug_cup_word2.setFont("BOOKOS");
    hy_door_scene_bug_cup_word1.setTextAlign("center");
    hy_door_scene_bug_cup_word2.setTextAlign("center");
    hy_door_scene_bug_cup_word1.setFillColor("black");
    hy_door_scene_bug_cup_word2.setFillColor("black");
    hy_door_scene_bug_cup_word1.setTransparentAlpha(0);
    hy_door_scene_bug_cup_word2.setTransparentAlpha(0);

    function check(){
        if (finish_left && finish_right){
            hy_door_scene_lock.setTransparentAlpha(0);
            hy_answer_box_fake_button.setClickable(true);
        }
    }
}

var res;

function init(canvas){
    res=new Resource(cfg); //加载素材
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
