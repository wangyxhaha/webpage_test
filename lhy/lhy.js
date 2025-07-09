"use strict"

import Resource from "../resource.js";
import Sprite from "../sprite.js";
import Canvas from "../canvas.js";
import Button from "../button.js";
import Animation from "../animation.js";
import Input from "../input.js";
import "../buttonPlugin.js";

var cfg=[
    {
        name: "lhy_door_bg",
        type: "image",
        value: "./lhy/data/lhy背景门.jpg"
    },
    {
        name: "lhy_top_bg",
        type: "image",
        value: "./lhy/data/浩宇顶底图.jpg"
    },
    {
        name: "lhy_left_bg",
        type: "image",
        value: "./lhy/data/浩宇左底图.jpg"
    },
    {
        name: "lhy_right_bg",
        type: "image",
        value: "./lhy/data/浩宇右底图.jpg"
    },
    {
        name: "left_arrow",
        type: "image",
        value: "./lhy/data/左.png"
    },
    {
        name: "right_arrow",
        type: "image",
        value: "./lhy/data/右.png"
    },
    {
        name: "up_arrow",
        type: "image",
        value: "./lhy/data/上.png"
    },
    {
        name: "down_arrow",
        type: "image",
        value: "./lhy/data/下.png"
    },
    {
        name: "dui1",
        type: "image",
        value: "./lhy/data/对1.png"
    },
    {
        name: "dui2",
        type: "image",
        value: "./lhy/data/对2.png"
    },
    {
        name: "dui3",
        type: "image",
        value: "./lhy/data/对3.png"
    },
    {
        name: "dui4",
        type: "image",
        value: "./lhy/data/对4.png"
    },
    {
        name: "dui5",
        type: "image",
        value: "./lhy/data/对5.png"
    },
    {
        name: "cuo1",
        type: "image",
        value: "./lhy/data/错1.png"
    },
    {
        name: "cuo2",
        type: "image",
        value: "./lhy/data/错2.png"
    },
    {
        name: "cuo3",
        type: "image",
        value: "./lhy/data/错3.png"
    },
    {
        name: "cuo4",
        type: "image",
        value: "./lhy/data/错4.png"
    },
    {
        name: "cuo5",
        type: "image",
        value: "./lhy/data/错5.png"
    },
    {
        name: "daoxian1",
        type: "image",
        value: "./lhy/data/导线1.png"
    },
    {
        name: "daoxian2",
        type: "image",
        value: "./lhy/data/导线2.png"
    },
    {
        name: "dianyuan",
        type: "image",
        value: "./lhy/data/电源.png"
    },
    {
        name: "dianzu",
        type: "image",
        value: "./lhy/data/定值电阻.png"
    },
    {
        name: "heibi",
        type: "image",
        value: "./lhy/data/黑表笔.png"
    },
    {
        name: "hongbi",
        type: "image",
        value: "./lhy/data/红表笔.png"
    },
    {
        name: "huabian",
        type: "image",
        value: "./lhy/data/滑变.png"
    },
    {
        name: "daoxian1F",
        type: "image",
        value: "./lhy/data/导线1F.png"
    },
    {
        name: "daoxian2F",
        type: "image",
        value: "./lhy/data/导线2F.png"
    },
    {
        name: "dianyuanF",
        type: "image",
        value: "./lhy/data/电源F.png"
    },
    {
        name: "dianzuF",
        type: "image",
        value: "./lhy/data/定值电阻F.png"
    },
    {
        name: "heibiF",
        type: "image",
        value: "./lhy/data/黑表笔F.png"
    },
    {
        name: "hongbiF",
        type: "image",
        value: "./lhy/data/红表笔F.png"
    },
    {
        name: "huabianF",
        type: "image",
        value: "./lhy/data/滑变F.png"
    },
    {
        name: "qinxian",
        type: "image",
        value: "./lhy/data/浩宇琴弦.png"
    },
    {
        name: "lhy_figure",
        type: "image",
        value: "./lhy/data/浩宇形象.png"
    },
    {
        name: "youwenzi",
        type: "image",
        value: "./lhy/data/右文字.png"
    },
    {
        name: "lock",
        type: "image",
        value: "./lhy/data/锁.png"
    }
]

function isIn(p,lx,ly,l,h){ //是否在检测框内
    return p.x>=lx-25 && p.x<=lx+l+25 && p.y>=ly-25 && p.y<=ly+h+25;
}

function build(canvas){
    console.log("build");
    canvas.createNewScene("lhy_door_scene",res.getResource("lhy_door_bg"));
    canvas.createNewScene("lhy_top_scene",res.getResource("lhy_top_bg"));
    canvas.createNewScene("lhy_left_scene",res.getResource("lhy_left_bg"));
    canvas.createNewScene("lhy_right_scene",res.getResource("lhy_right_bg"));
    var lhy_door_scene_left_arrow=new Button(canvas.scene("lhy_door_scene"),0,0,57,89,0,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("lhy_left_scene"),98,443);
    var lhy_door_scene_right_arrow=new Button(canvas.scene("lhy_door_scene"),0,0,57,89,0,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("lhy_right_scene"),777,443);
    var lhy_left_scene_right_arrow=new Button(canvas.scene("lhy_left_scene"),0,0,57,89,0,res.getResource("right_arrow"),null,null,()=>{},()=>canvas.changeScene("lhy_door_scene"),777,443);
    var lhy_right_scene_left_arrow=new Button(canvas.scene("lhy_right_scene"),0,0,57,89,0,res.getResource("left_arrow"),null,null,()=>{},()=>canvas.changeScene("lhy_door_scene"),98,443);
    var lhy_door_scene_up_arrow=new Button(canvas.scene("lhy_door_scene"),0,0,88,46,0,res.getResource("up_arrow"),null,null,()=>{},()=>canvas.changeScene("lhy_top_scene"),416,114);
    var lhy_top_scene_down_arrow=new Button(canvas.scene("lhy_top_scene"),0,0,88,46,0,res.getResource("down_arrow"),null,null,()=>{},()=>canvas.changeScene("lhy_door_scene"),416,833);
    
    var lhy_door_scene_lock=new Button(canvas.scene("lhy_door_scene"),0,0,0,0,1,res.getResource("lock"),null,null,()=>{},()=>{});
    lhy_door_scene_lock.setClickable(false);
    
    var lhy_answer_box=new Input(canvas.scene("lhy_door_scene"),"gameInput",453,468,1);
    lhy_answer_box.setTextAlign("center");
    lhy_answer_box.setFillColor("black");
    lhy_answer_box.setFontHeight(40);
    lhy_answer_box.setFont("黑体");
    lhy_answer_box.clear();
    var lhy_answer_box_fake_button=new Button(canvas.scene("lhy_door_scene"),362,395,180,98,2,null,null,null,()=>{},()=>{
        lhy_answer_box.enable();
        lhy_answer_box_fake_disable_button.setClickable(true);
        lhy_answer_box_fake_disable_button.setIgnoreClickEven(false);
    });
    lhy_answer_box_fake_button.setClickable(false);

    var lhy_answer_box_fake_disable_button=new Button(canvas.scene("lhy_door_scene"),0,0,935,935,2,null,null,null,()=>{},()=>{
        lhy_answer_box.disable();
        lhy_answer_box_fake_disable_button.setClickable(false);
        lhy_answer_box_fake_disable_button.setIgnoreClickEven(true);
    });
    lhy_answer_box_fake_disable_button.setClickable(false);
    lhy_answer_box_fake_disable_button.setIgnoreClickEven(true);    
    
    var lhy_door_scene_figure=new Button(canvas.scene("lhy_door_scene"),0,0,0,0,1,res.getResource("lhy_figure"),null,null,()=>{},()=>{});
    lhy_door_scene_figure.setClickable(false);

    //右场景拖动模块
    var cnt=0;
    var right_flag=false;

    function right_check(){
        if(cnt==7) right_flag=true;
    }

    var lhy_right_scene_text=new Button(canvas.scene("lhy_right_scene"),0,0,0,0,11,res.getResource("youwenzi"),null,null,()=>{},()=>{});
    lhy_right_scene_text.setClickable(false);
    lhy_right_scene_text.setTransparentAlpha(1);

    var lhy_right_scene_daoxian1_final=new Button(canvas.scene("lhy_right_scene"),0,0,0,0,21,res.getResource("daoxian1F"),null,null,()=>{},()=>{});
    lhy_right_scene_daoxian1_final.setClickable(false);
    lhy_right_scene_daoxian1_final.setTransparentAlpha(0);
    var lhy_right_scene_daoxian1=new Button(canvas.scene("lhy_right_scene"),635,699,88,99,21,res.getResource("daoxian1"),null,null,()=>{},()=>{
        if (isIn(lhy_right_scene_daoxian1.getPosition(),345,580,88,99)){
            cnt++;
            lhy_right_scene_daoxian1_final.setTransparentAlpha(1);
            lhy_right_scene_daoxian1.setTransparentAlpha(0);
            lhy_right_scene_daoxian1.setDraggable(false);
            lhy_right_scene_daoxian1.setClickable(false);
            right_check();
        }
    });
    lhy_right_scene_daoxian1.setDraggable(true);

    var lhy_right_scene_daoxian2_final=new Button(canvas.scene("lhy_right_scene"),0,0,0,0,21,res.getResource("daoxian2F"),null,null,()=>{},()=>{});
    lhy_right_scene_daoxian2_final.setClickable(false);
    lhy_right_scene_daoxian2_final.setTransparentAlpha(0);
    var lhy_right_scene_daoxian2=new Button(canvas.scene("lhy_right_scene"),602,748,72,105,21,res.getResource("daoxian2"),null,null,()=>{},()=>{
        if (isIn(lhy_right_scene_daoxian2.getPosition(),541,579,72,105)){
            cnt++;
            lhy_right_scene_daoxian2_final.setTransparentAlpha(1);
            lhy_right_scene_daoxian2.setTransparentAlpha(0);
            lhy_right_scene_daoxian2.setDraggable(false);
            lhy_right_scene_daoxian2.setClickable(false);
            right_check();
        }
    });
    lhy_right_scene_daoxian2.setDraggable(true);

    var lhy_right_scene_dianyuan_final=new Button(canvas.scene("lhy_right_scene"),0,0,0,0,21,res.getResource("dianyuanF"),null,null,()=>{},()=>{});
    lhy_right_scene_dianyuan_final.setClickable(false);
    lhy_right_scene_dianyuan_final.setTransparentAlpha(0);
    var lhy_right_scene_dianyuan=new Button(canvas.scene("lhy_right_scene"),508,396,118,228,21,res.getResource("dianyuan"),null,null,()=>{},()=>{
        if (isIn(lhy_right_scene_dianyuan.getPosition(),290,248,118,228)){
            cnt++;
            lhy_right_scene_dianyuan_final.setTransparentAlpha(1);
            lhy_right_scene_dianyuan.setTransparentAlpha(0);
            lhy_right_scene_dianyuan.setDraggable(false);
            lhy_right_scene_dianyuan.setClickable(false);
            right_check();
        }
    });
    lhy_right_scene_dianyuan.setDraggable(true);

    var lhy_right_scene_dianzu_final=new Button(canvas.scene("lhy_right_scene"),0,0,0,0,21,res.getResource("dianzuF"),null,null,()=>{},()=>{});
    lhy_right_scene_dianzu_final.setClickable(false);
    lhy_right_scene_dianzu_final.setTransparentAlpha(0);
    var lhy_right_scene_dianzu=new Button(canvas.scene("lhy_right_scene"),168,136,174,85,21,res.getResource("dianzu"),null,null,()=>{},()=>{
        if (isIn(lhy_right_scene_dianzu.getPosition(),407,637,174,85)){
            cnt++;
            lhy_right_scene_dianzu_final.setTransparentAlpha(1);
            lhy_right_scene_dianzu.setTransparentAlpha(0);
            lhy_right_scene_dianzu.setDraggable(false);
            lhy_right_scene_dianzu.setClickable(false);
            right_check();
        }
    });
    lhy_right_scene_dianzu.setDraggable(true);

    var lhy_right_scene_heibi_final=new Button(canvas.scene("lhy_right_scene"),0,0,0,0,21,res.getResource("heibiF"),null,null,()=>{},()=>{});
    lhy_right_scene_heibi_final.setClickable(false);
    lhy_right_scene_heibi_final.setTransparentAlpha(0);
    var lhy_right_scene_heibi=new Button(canvas.scene("lhy_right_scene"),632,109,78,149,21,res.getResource("heibi"),null,null,()=>{},()=>{
        if (isIn(lhy_right_scene_heibi.getPosition(),574,479,78,149)){
            cnt++;
            lhy_right_scene_heibi_final.setTransparentAlpha(1);
            lhy_right_scene_heibi.setTransparentAlpha(0);
            lhy_right_scene_heibi.setDraggable(false);
            lhy_right_scene_heibi.setClickable(false);
            right_check();
        }
    });
    lhy_right_scene_heibi.setDraggable(true);

    var lhy_right_scene_hongbi_final=new Button(canvas.scene("lhy_right_scene"),0,0,0,0,21,res.getResource("hongbiF"),null,null,()=>{},()=>{});
    lhy_right_scene_hongbi_final.setClickable(false);
    lhy_right_scene_hongbi_final.setTransparentAlpha(0);
    var lhy_right_scene_hongbi=new Button(canvas.scene("lhy_right_scene"),744,181,68,158,21,res.getResource("hongbi"),null,null,()=>{},()=>{
        if (isIn(lhy_right_scene_hongbi.getPosition(),314,454,68,158)){
            cnt++;
            lhy_right_scene_hongbi_final.setTransparentAlpha(1);
            lhy_right_scene_hongbi.setTransparentAlpha(0);
            lhy_right_scene_hongbi.setDraggable(false);
            lhy_right_scene_hongbi.setClickable(false);
            right_check();
        }
    });
    lhy_right_scene_hongbi.setDraggable(true);

    var lhy_right_scene_huabian_final=new Button(canvas.scene("lhy_right_scene"),0,0,0,0,21,res.getResource("huabianF"),null,null,()=>{},()=>{});
    lhy_right_scene_huabian_final.setClickable(false);
    lhy_right_scene_huabian_final.setTransparentAlpha(0);
    var lhy_right_scene_huabian=new Button(canvas.scene("lhy_right_scene"),84,518,152,286,21,res.getResource("huabian"),null,null,()=>{},()=>{
        if (isIn(lhy_right_scene_huabian.getPosition(),564,237,152,286)){
            cnt++;
            lhy_right_scene_huabian_final.setTransparentAlpha(1);
            lhy_right_scene_huabian.setTransparentAlpha(0);
            lhy_right_scene_huabian.setDraggable(false);
            lhy_right_scene_huabian.setClickable(false);
            right_check();
        }
    });
    lhy_right_scene_huabian.setDraggable(true);

    //左场景点击模块

    //上场景音乐模块

    canvas.changeScene("lhy_door_scene");
}

var res;

function init(canvas){
    res=new Resource(cfg); //加载素材
    res.onload=()=>build(canvas); //仅测试用
}

export default{
    init,build
};