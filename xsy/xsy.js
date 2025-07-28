"use strict"

import Resource from "../resource.js"
import Canvas from "../canvas.js";
import Button from "../button.js";
import Animation from "../animation.js";
import Input from "../input.js";
import Line from "../line.js";
import "../buttonPlugin.js";
import "../spritePlugin.js"

var cfg=[ //所需素材的信息
    {
        name: "xsy_door",
        type: "image",
        value: "./xsy/data/xsy背景门.jpg"
    },
    {
        name: "xsy_door_black",
        type: "image",
        value: "./xsy/data/xsy背景门黑.jpg"
    },
    {
        name: "xsy_top",
        type: "image",
        value: "./xsy/data/xsy顶.jpg"
    },
    {
        name: "xsy_top_black",
        type: "image",
        value: "./xsy/data/xsy顶黑.png"
    },
    {
        name: "xsy_figure",
        type: "image",
        value: "./xsy/data/xsy形象.png"
    },
    {
        name: "xsy_right_bg",
        type: "image",
        value: "./xsy/data/xsy右底图.jpg"
    },
    {
        name: "xsy_right_bg_black",
        type: "image",
        value: "./xsy/data/xsy右底图黑.jpg"
    },
    {
        name: "xsy_left_bg",
        type: "image",
        value: "./xsy/data/xsy左底图.jpg"
    },
    {
        name: "left_arrow_black",
        type: "image",
        value: "./xsy/data/黑左.png"
    },
    {
        name: "right_arrow_black",
        type: "image",
        value: "./xsy/data/黑右.png"
    },
    {
        name: "up_arrow_black",
        type: "image",
        value: "./xsy/data/黑上.png"
    },
    {
        name: "down_arrow_black",
        type: "image",
        value: "./xsy/data/黑下.png"
    },
    {
        name: "left_arrow_white",
        type: "image",
        value: "./xsy/data/白左.png"
    },
    {
        name: "right_arrow_white",
        type: "image",
        value: "./xsy/data/白右.png"
    },
    {
        name: "up_arrow_white",
        type: "image",
        value: "./xsy/data/白上.png"
    },
    {
        name: "down_arrow_white",
        type: "image",
        value: "./xsy/data/白下.png"
    },
    {
        name: "lock",
        type: "image",
        value: "./xsy/data/锁.png"
    },
    {
        name: "switch_on",
        type: "image",
        value: "./xsy/data/开关开.png"
    },
    {
        name: "switch_off",
        type: "image",
        value: "./xsy/data/开关关.png"
    },
    {
        name: "nmy_figure",
        type: "image",
        value: "./xsy/data/nmy.png"
    },
    {
        name: "nmy_figure_black",
        type: "image",
        value: "./xsy/data/nmy黑.jpg"
    },
    {
        name: "luminous_dye",
        type: "image",
        value: "./xsy/data/夜光蘸料.png"
    },
    {
        name: "luminous_dye_black",
        type: "image",
        value: "./xsy/data/夜光蘸料黑.jpg"
    },
    {
        name: "a1",
        type: "image",
        value: "./xsy/data/a1.png"
    },
    {
        name: "a2",
        type: "image",
        value: "./xsy/data/a2.png"
    },
    {
        name: "a3",
        type: "image",
        value: "./xsy/data/a3.png"
    },
    {
        name: "b1",
        type: "image",
        value: "./xsy/data/b1.png"
    },
    {
        name: "b2",
        type: "image",
        value: "./xsy/data/b2.png"
    },
    {
        name: "b3",
        type: "image",
        value: "./xsy/data/b3.png"
    }
]

function isIn(p){ //218 701 704 934
    return p.x>=218-100 && p.x<=704 && p.y>=701-100 && p.y<=934;
}

function build(canvas){
    console.log("build");

    var left_arrow=new Animation([
        {
            image: res.getResource("left_arrow_black"),
            interval: Infinity
        },
        {
            image: res.getResource("left_arrow_white"),
            interval: Infinity
        }
    ]);
    var right_arrow=new Animation([
        {
            image: res.getResource("right_arrow_black"),
            interval: Infinity
        },
        {
            image: res.getResource("right_arrow_white"),
            interval: Infinity
        }
    ]);
    var up_arrow=new Animation([
        {
            image: res.getResource("up_arrow_black"),
            interval: Infinity
        },
        {
            image: res.getResource("up_arrow_white"),
            interval: Infinity
        }
    ]);
    var down_arrow=new Animation([
        {
            image: res.getResource("down_arrow_black"),
            interval: Infinity
        },
        {
            image: res.getResource("down_arrow_white"),
            interval: Infinity
        }
    ]);
    var light_switch=new Animation([
        {
            image: res.getResource("switch_on"),
            interval: Infinity
        },
        {
            image: res.getResource("switch_off"),
            interval: Infinity
        }
    ]);
    var door_scene=new Animation([
        {
            image: res.getResource("xsy_door"),
            interval: Infinity
        },
        {
            image: res.getResource("xsy_door_black"),
            interval: Infinity
        }
    ]);
    var top_scene=new Animation([
        {
            image: res.getResource("xsy_top"),
            interval: Infinity
        },
        {
            image: res.getResource("xsy_top_black"),
            interval: Infinity
        }
    ]);
    var left_scene=new Animation([
        {
            image: res.getResource("xsy_left_bg"),
            interval: Infinity
        },
        {
            image: res.getResource("nmy_figure_black"),
            interval: Infinity
        },
        {
            image: res.getResource("luminous_dye_black"),
            interval: Infinity
        }
    ]);
    var right_scene=new Animation([
        {
            image: res.getResource("xsy_right_bg"),
            interval: Infinity
        },
        {
            image: res.getResource("xsy_right_bg_black"),
            interval: Infinity
        }
    ]);

    var status=true;
    var luminous_flag=false;
    var flag233=false;
    function switchLight(){
        status=!status;
        left_arrow.nextFrame();
        right_arrow.nextFrame();
        up_arrow.nextFrame();
        down_arrow.nextFrame();
        light_switch.nextFrame();
        door_scene.nextFrame();
        top_scene.nextFrame();
        left_scene.to(status ? 0 : (luminous_flag ? 1 : 2));
        right_scene.nextFrame();
        xsy_door_scene_figure.setTransparentAlpha(status ? 1 : 0);
        xsy_left_scene_luminous_dye.setTransparentAlpha(status ? 1 : 0);
        xsy_left_scene_luminous_dye.setDraggable(status ? 1 : 0);
        xsy_left_scene_luminous_dye.setClickable(status ? 1 : 0);
        xsy_left_scene_nmy_figure.setTransparentAlpha(status ? 1 : 0);
        for (let i=0;i<3;i++) xsy_right_scene_a[i].setTransparentAlpha(status ? 1 : 0);
        for (let i=0;i<3;i++) xsy_right_scene_b[i].setTransparentAlpha(status ? 1 : 0);
        for (let i=0;i<6;i++) xsy_right_scene_fake_button[i].setClickable(status ? 1 : 0);
        xsy_right_scene_fake_button[0].setDraggable(status&&(!linesAccomplished[0]) ? 1 : 0);
        xsy_right_scene_fake_button[1].setDraggable(status&&(!linesAccomplished[1]) ? 1 : 0);
        xsy_right_scene_fake_button[2].setDraggable(status&&(!linesAccomplished[2]) ? 1 : 0);
        xsy_right_scene_fake_button[3].setDraggable(status&&(!linesAccomplished[2]) ? 1 : 0);
        xsy_right_scene_fake_button[4].setDraggable(status&&(!linesAccomplished[0]) ? 1 : 0);
        xsy_right_scene_fake_button[5].setDraggable(status&&(!linesAccomplished[1]) ? 1 : 0);
        for (let i=0;i<3;i++) lines[i].setTransparentAlpha(status&&linesAccomplished[i] ? 1 : 0);
        xsy_answer_box.setFillColor(status ? "black" : "white");
    }

    canvas.createNewScene("xsy_door_scene",door_scene);
    canvas.createNewScene("xsy_top_scene",top_scene);
    canvas.createNewScene("xsy_right_scene",right_scene);
    canvas.createNewScene("xsy_left_scene",left_scene);

    var xsy_door_scene_left_arrow=new Button(canvas.scene("xsy_door_scene"),0,0,57,89,5,left_arrow,null,null,()=>{},()=>{
        if (!status && luminous_flag){
            flag233=true;
            check();
        }
        canvas.changeScene("xsy_left_scene")
    },98,443);
    var xsy_door_scene_right_arrow=new Button(canvas.scene("xsy_door_scene"),0,0,57,89,5,right_arrow,null,null,()=>{},()=>canvas.changeScene("xsy_right_scene"),777,443);
    var xsy_left_scene_right_arrow=new Button(canvas.scene("xsy_left_scene"),0,0,57,89,0,right_arrow,null,null,()=>{},()=>canvas.changeScene("xsy_door_scene"),777,443);
    var xsy_right_scene_left_arrow=new Button(canvas.scene("xsy_right_scene"),0,0,57,89,0,left_arrow,null,null,()=>{},()=>canvas.changeScene("xsy_door_scene"),98,443);
    var xsy_door_scene_up_arrow=new Button(canvas.scene("xsy_door_scene"),0,0,88,46,5,up_arrow,null,null,()=>{},()=>canvas.changeScene("xsy_top_scene"),416,114);
    var xsy_top_scene_down_arrow=new Button(canvas.scene("xsy_top_scene"),0,0,88,46,0,down_arrow,null,null,()=>{},()=>canvas.changeScene("xsy_door_scene"),416,833);

    var xsy_door_scene_figure=new Button(canvas.scene("xsy_door_scene"),0,0,0,0,1,res.getResource("xsy_figure"),null,null,()=>{},()=>{});

    var xsy_door_scene_lock=new Button(canvas.scene("xsy_door_scene"),0,0,0,0,1,res.getResource("lock"),null,null,()=>{},()=>{});
    xsy_door_scene_lock.setClickable(false);

    var xsy_answer_box=new Input(canvas.scene("xsy_door_scene"),"gameInput",453,468,1);
    xsy_answer_box.setTextAlign("center");
    xsy_answer_box.setFillColor("black");
    xsy_answer_box.setFontHeight(40);
    xsy_answer_box.setFont("黑体");
    xsy_answer_box.clear();
    var xsy_answer_box_fake_button=new Button(canvas.scene("xsy_door_scene"),362,395,180,98,2,null,null,null,()=>{},()=>{
        xsy_answer_box.enable();
        xsy_answer_box_fake_disable_button.setClickable(true);
        xsy_answer_box_fake_disable_button.setIgnoreClickEven(false);
    });
    xsy_answer_box_fake_button.setClickable(false);

    var xsy_answer_box_fake_disable_button=new Button(canvas.scene("xsy_door_scene"),0,0,935,935,10,null,null,null,()=>{},()=>{
        xsy_answer_box.disable();
        xsy_answer_box_fake_disable_button.setClickable(false);
        xsy_answer_box_fake_disable_button.setIgnoreClickEven(true);
    });
    xsy_answer_box_fake_disable_button.setClickable(false);
    xsy_answer_box_fake_disable_button.setIgnoreClickEven(true);

    var xsy_door_scene_light_switch=new Button(canvas.scene("xsy_door_scene"),0,0,53,49,1,light_switch,null,null,()=>{},()=>switchLight(),186,423)

    var xsy_left_scene_nmy_figure=new Button(canvas.scene("xsy_left_scene"),0,0,323,544,1,res.getResource("nmy_figure"),null,null,()=>{},()=>{},80,362);

    var xsy_left_scene_luminous_dye=new Button(canvas.scene("xsy_left_scene"),626,649,98,124,1,res.getResource("luminous_dye"),null,null,()=>{},()=>{
        if (xsy_left_scene_luminous_dye.isCoincide(xsy_left_scene_nmy_figure)){
            luminous_flag=true;
            // check();
        }
        xsy_left_scene_luminous_dye.setPostition(626,649);
    });
    xsy_left_scene_luminous_dye.setDraggable(true);

    var xsy_right_scene_a=[
        new Button(canvas.scene("xsy_right_scene"),0,0,0,0,0,res.getResource("a1"),null,null,()=>{},()=>{}),
        new Button(canvas.scene("xsy_right_scene"),0,0,0,0,0,res.getResource("a2"),null,null,()=>{},()=>{}),
        new Button(canvas.scene("xsy_right_scene"),0,0,0,0,0,res.getResource("a3"),null,null,()=>{},()=>{})
    ];

    var xsy_right_scene_b=[
        new Button(canvas.scene("xsy_right_scene"),0,0,0,0,0,res.getResource("b1"),null,null,()=>{},()=>{}),
        new Button(canvas.scene("xsy_right_scene"),0,0,0,0,0,res.getResource("b2"),null,null,()=>{},()=>{}),
        new Button(canvas.scene("xsy_right_scene"),0,0,0,0,0,res.getResource("b3"),null,null,()=>{},()=>{})
    ];

    var lines=[
        new Line(canvas.scene("xsy_right_scene"),1),
        new Line(canvas.scene("xsy_right_scene"),1),
        new Line(canvas.scene("xsy_right_scene"),1)
    ]

    var linesFlag=[false,false,false];
    var linesAccomplished=[false,false,false];

    function foo(b,m,pos){ //哪个按钮触发的，控制哪条线，鼠标坐标
        if (linesAccomplished[m]) return;
        let buttonPos=xsy_right_scene_fake_button[b].getPosition();
        let dx=buttonPos.x-pos.x;
        let dy=buttonPos.y-pos.y;
        lines[m].setStart(pos.x,pos.y);
        linesFlag[m]=true;
        let traceCursor=()=>{
            if (!linesFlag[m]){
                return;
            }
            lines[m].setTransparentAlpha(1);
            buttonPos=xsy_right_scene_fake_button[b].getPosition();
            lines[m].setEnd(buttonPos.x-dx,buttonPos.y-dy);
            requestAnimationFrame(traceCursor);
        };
        requestAnimationFrame(traceCursor);
    }

    var xsy_right_scene_fake_button=[
        new Button(canvas.scene("xsy_right_scene"),49,109,202,271,2,null,null,null,foo.bind(null,0,0),(pos)=>{
            if (linesAccomplished[0]) return;
            if (xsy_right_scene_fake_button[4].isPositionIn(pos)){
                linesAccomplished[0]=true;
                xsy_right_scene_fake_button[0].setDraggable(false);
                xsy_right_scene_fake_button[4].setDraggable(false);
            }
            else lines[0].setTransparentAlpha(0);
            linesFlag[0]=false;
            xsy_right_scene_fake_button[0].setPostition(49,109);
            check();
        }),
        new Button(canvas.scene("xsy_right_scene"),296,118,322,248,2,null,null,null,foo.bind(null,1,1),(pos)=>{
            if (linesAccomplished[1]) return;
            if (xsy_right_scene_fake_button[5].isPositionIn(pos)){
                linesAccomplished[1]=true;
                xsy_right_scene_fake_button[1].setDraggable(false);
                xsy_right_scene_fake_button[5].setDraggable(false);
            }
            else lines[1].setTransparentAlpha(0);
            linesFlag[1]=false;
            xsy_right_scene_fake_button[1].setPostition(296,118);
            check();
        }),
        new Button(canvas.scene("xsy_right_scene"),667,117,223,246,2,null,null,null,foo.bind(null,2,2),(pos)=>{
            if (linesAccomplished[2]) return;
            if (xsy_right_scene_fake_button[3].isPositionIn(pos)){
                linesAccomplished[2]=true;
                xsy_right_scene_fake_button[2].setDraggable(false);
                xsy_right_scene_fake_button[3].setDraggable(false);
            }
            else lines[2].setTransparentAlpha(0);
            linesFlag[2]=false;
            xsy_right_scene_fake_button[2].setPostition(667,117);
            check();
        }),
        new Button(canvas.scene("xsy_right_scene"),79,572,219,172,2,null,null,null,foo.bind(null,3,2),(pos)=>{
            if (linesAccomplished[2]) return;
            if (xsy_right_scene_fake_button[2].isPositionIn(pos)){
                linesAccomplished[2]=true;
                xsy_right_scene_fake_button[3].setDraggable(false);
                xsy_right_scene_fake_button[2].setDraggable(false);
            }
            else lines[2].setTransparentAlpha(0);
            linesFlag[2]=false;
            xsy_right_scene_fake_button[3].setPostition(79,572);
            check();
        }),
        new Button(canvas.scene("xsy_right_scene"),357,570,219,172,2,null,null,null,foo.bind(null,4,0),(pos)=>{
            if (linesAccomplished[0]) return;
            if (xsy_right_scene_fake_button[0].isPositionIn(pos)){
                linesAccomplished[0]=true;
                xsy_right_scene_fake_button[0].setDraggable(false);
                xsy_right_scene_fake_button[4].setDraggable(false);
            }
            else lines[0].setTransparentAlpha(0);
            linesFlag[0]=false;
            xsy_right_scene_fake_button[4].setPostition(357,570);
            check();
        }),
        new Button(canvas.scene("xsy_right_scene"),630,567,219,172,2,null,null,null,foo.bind(null,5,1),(pos)=>{
            if (linesAccomplished[1]) return;
            if (xsy_right_scene_fake_button[1].isPositionIn(pos)){
                linesAccomplished[1]=true;
                xsy_right_scene_fake_button[1].setDraggable(false);
                xsy_right_scene_fake_button[5].setDraggable(false);
            }
            else lines[1].setTransparentAlpha(0);
            linesFlag[1]=false;
            xsy_right_scene_fake_button[5].setPostition(630,567);
            check();
        })
    ]
    for (let i=0;i<6;i++) xsy_right_scene_fake_button[i].setDraggable(true);

    function check(){
        if (flag233 && linesAccomplished.every(v=>v)){
            xsy_door_scene_lock.setTransparentAlpha(0);
            xsy_answer_box_fake_button.setClickable(true);
        }
    }

    canvas.changeScene("xsy_door_scene");
    // xsy_answer_box.enable();
}

var res;

function init(canvas){
    res=new Resource(cfg); //加载素材
    res.onload=()=>build(canvas); //仅测试用
}

export default{
    init,build
};
