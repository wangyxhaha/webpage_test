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
        name: "guide_door",
        type: "image",
        value: "./guide/data/新手指引背景.jpg"
    },
    {
        name: "lock",
        type: "image",
        value: "./guide/data/锁.png"
    },
    {
        name: "tip1",
        type: "image",
        value: "./guide/data/新手指引文字提示1.png"
    },
    {
        name: "tip2",
        type: "image",
        value: "./guide/data/新手指引文字提示2.png"
    },
    {
        name: "tip3",
        type: "image",
        value: "./guide/data/关于人的提示.png"
    },
    {
        name: "tip4",
        type: "image",
        value: "./guide/data/关于锁的提示.png"
    }
]

function build(canvas){
    console.log("build guide");
    canvas.createNewScene("guide_door_scene",res.getResource("guide_door"));

    var guide_door_scene_lock=new Button(canvas.scene("guide_door_scene"),0,0,0,0,1,res.getResource("lock"),null,null,()=>{},()=>{});
    guide_door_scene_lock.setClickable(false);

    let cnt=0;
    let wait=false;

    var guide_door_scene_tips=[
        new Button(canvas.scene("guide_door_scene"),0,0,0,0,1,res.getResource("tip1"),null,null,()=>{},()=>{}),
        new Button(canvas.scene("guide_door_scene"),0,0,0,0,1,res.getResource("tip2"),null,null,()=>{},()=>{}),
        new Button(canvas.scene("guide_door_scene"),0,0,0,0,1,res.getResource("tip3"),null,null,()=>{},()=>{}),
        new Button(canvas.scene("guide_door_scene"),0,0,0,0,1,res.getResource("tip4"),null,null,()=>{},()=>{})
    ];

    for (let i=0;i<4;i++){
        guide_door_scene_tips[i].setClickable(false);
        guide_door_scene_tips[i].setTransparentAlpha(0);
    }

    var guide_door_scene_fake_button=new Button(canvas.scene("guide_door_scene"),0,0,935,935,2,null,null,null,()=>{},()=>{
        if (wait) return;
        wait=true;
        if (cnt==4){
            guide_door_scene_tips[3].setTransparentAlpha(0);
            let inputElement=document.getElementById("gameInput");
            inputElement.value="mygo";
        }
        console.log("!");
        if (cnt!=0) guide_door_scene_tips[cnt-1].setTransparentAlpha(0);
        if (cnt!=4){
            guide_door_scene_tips[cnt++].floatUp(0,0,1000);
        }
        setTimeout(()=>wait=false,2000);
    });

}

var res;

function init(canvas){
    res=new Resource(cfg); //加载素材
}

function destroy(canvas){
    canvas.deleteScene("guide_door_scene");
    console.log("des guide");
}

export default{
    init,build,destroy,
    setOnload: (ol)=>res.onload=ol
};
