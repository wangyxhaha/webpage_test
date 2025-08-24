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
    // {
    //     name: "mandarin_red",
    //     type: "image",
    //     value: "./xyj/data/红仕.png"
    // },
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
        value: "./xyj/data/许砚均胜利.png"
    },
    {
        name: "lose",
        type: "image",
        value: "./xyj/data/许砚均失败.png"
    },
    {
        name: "try_again",
        type: "image",
        value: "./xyj/data/许砚均重试.png"
    },
    {
        name: "undo",
        type: "image",
        value: "./xyj/data/撤销.png"
    }
]

function build(canvas){
    console.log("build xyj");
    canvas.createNewScene("xyj_door_scene",res.getResource("xyj_door_bg"));
    canvas.createNewScene("xyj_top_scene",res.getResource("xyj_top_bg"));
    canvas.createNewScene("xyj_left_scene",res.getResource("xyj_left_bg"));
    canvas.createNewScene("xyj_right_scene",res.getResource("xyj_right_bg"));
    var xyj_door_scene_left_arrow=new Button(canvas.scene("xyj_door_scene"),0,0,57,89,0,res.getResource("left_arrow"),null,null,()=>{
        if(!wingame){
            document.dispatchEvent(setEvent);
            console.log("Game Start");
        }
    },()=>canvas.changeScene("xyj_left_scene"),98,443);
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

    var xyj_game_scene_bg=new Button(canvas.scene("xyj_left_scene"),0,0,0,0,22,xyj_game_scene,null,null,()=>{},()=>{});
    xyj_game_scene_bg.setIgnoreClickEvent(true);
    var xyj_left_scene_undo=new Button(canvas.scene("xyj_left_scene"),0,0,113,113,12,res.getResource("undo"),null,null,()=>{
        document.dispatchEvent(setEvent);
    },()=>{});

    var setEvent=new CustomEvent('setGame');
    //var startEvent=new CustomEvent('startGame');
    var loseEvent=new CustomEvent('loseGame');
    var winEvent=new CustomEvent('winGame');

    var x=[132,208,284,361,437,512,589,665,741];
    var y=[58,134,210,286,362,492,568,644,720,796];
 
    var flag;

    //FIXME Bigger chess peices.

    var xyj_left_scene_rook_black=new Button(canvas.scene("xyj_left_scene"),x[8],y[0],60,64,11,res.getResource("rook_black"),null,null,()=>{},()=>{
        checkMove(xyj_left_scene_rook_black.getPosition(),0);
        xyj_left_scene_rook_black.setPosition(x[point[0].x],y[point[0].y]);
    });
    var xyj_left_scene_knight_red=new Button(canvas.scene("xyj_left_scene"),x[1],y[9],60,64,11,res.getResource("knight_red"),null,null,()=>{},()=>{
        checkMove(xyj_left_scene_knight_red.getPosition(),1);
        xyj_left_scene_knight_red.setPosition(x[point[1].x],y[point[1].y]);
    });
    var xyj_left_scene_elephant_black=new Button(canvas.scene("xyj_left_scene"),x[2],y[0],60,64,11,res.getResource("elephant_black"),null,null,()=>{},()=>{
        checkMove(xyj_left_scene_elephant_black.getPosition(),2);
        xyj_left_scene_elephant_black.setPosition(x[point[2].x],y[point[2].y]);
    });
    var xyj_left_scene_king_black=new Button(canvas.scene("xyj_left_scene"),x[4],y[1],60,64,11,res.getResource("king_black"),null,null,()=>{},()=>{
        checkMove(xyj_left_scene_king_black.getPosition(),3);
        xyj_left_scene_king_black.setPosition(x[point[3].x],y[point[3].y]);
    });
    var xyj_left_scene_king_red=new Button(canvas.scene("xyj_left_scene"),x[4],y[8],60,64,11,res.getResource("king_red"),null,null,()=>{},()=>{
        checkMove(xyj_left_scene_king_red.getPosition(),4);
        xyj_left_scene_king_red.setPosition(x[point[4].x],y[point[4].y]);
    });
    var xyj_left_scene_cannon_red=new Button(canvas.scene("xyj_left_scene"),x[1],y[7],60,64,11,res.getResource("cannon_red"),null,null,()=>{},()=>{
        checkMove(xyj_left_scene_cannon_red.getPosition(),5);
        xyj_left_scene_cannon_red.setPosition(x[point[5].x],y[point[5].y]);
    });
    var xyj_left_scene_pawn_black=new Button(canvas.scene("xyj_left_scene"),x[2],y[6],60,64,11,res.getResource("pawn_black"),null,null,()=>{},()=>{
        checkMove(xyj_left_scene_pawn_black.getPosition(),6);
        xyj_left_scene_pawn_black.setPosition(x[point[6].x],y[point[6].y]);
    });
    var xyj_left_scene_pawn_red1=new Button(canvas.scene("xyj_left_scene"),x[2],y[3],60,64,11,res.getResource("pawn_red1"),null,null,()=>{},()=>{
        checkMove(xyj_left_scene_pawn_red1.getPosition(),7);
        xyj_left_scene_pawn_red1.setPosition(x[point[7].x],y[point[7].y]);
    });
    var xyj_left_scene_pawn_red2=new Button(canvas.scene("xyj_left_scene"),x[4],y[3],60,64,11,res.getResource("pawn_red2"),null,null,()=>{},()=>{
        checkMove(xyj_left_scene_pawn_red2.getPosition(),8);
        xyj_left_scene_pawn_red2.setPosition(x[point[8].x],y[point[8].y]);
    });

    var pieces=[];
    pieces.push(
        xyj_left_scene_rook_black,
        xyj_left_scene_knight_red,
        xyj_left_scene_elephant_black,
        xyj_left_scene_king_black,
        xyj_left_scene_king_red,
        xyj_left_scene_cannon_red,
        xyj_left_scene_pawn_black,
        xyj_left_scene_pawn_red1,
        xyj_left_scene_pawn_red2
    )

    var point,final;
    var wingame=false;
    var xyj_left_scene_notice=new Text(canvas.scene("xyj_left_scene"),35,480,1);
    xyj_left_scene_notice.setFillColor("Red");
    xyj_left_scene_notice.setFont("黑体");
    xyj_left_scene_notice.setFontHeight(40);
    xyj_left_scene_notice.setTransparentAlpha(0);
    xyj_left_scene_notice.value="任务：将棋子挪到对应虚线位置上并吃掉黑方的将";
    //xyj_left_scene_notice.setIgnoreClickEvent(true);

    var showNotice;

    document.addEventListener('setGame',()=>{
        xyj_game_scene.to(0);
        clearInterval(showNotice);
        xyj_left_scene_try_button.setTransparentAlpha(0);
        xyj_left_scene_try_button.setIgnoreClickEvent(true);
        xyj_left_scene_try_button.setClickable(false);
        xyj_left_scene_notice.setTransparentAlpha(1);
        showNotice=setInterval(()=>{
            xyj_left_scene_notice.setTransparentAlpha(0);
        },5000);

        fcnt=0,sur=true;
        point=[ //初始坐标
            {x:8,y:0},
            {x:1,y:9},
            {x:2,y:0},
            {x:4,y:1},
            {x:4,y:8},
            {x:1,y:7},
            {x:2,y:6},
            {x:2,y:3},
            {x:4,y:3}
        ];
        final=[ //终点坐标
            {x:6,y:8},
            {x:2,y:7},
            {x:4,y:2},
            {x:-1,y:-1},
            {x:5,y:7},
            {x:3,y:1},
            {x:3,y:6},
            {x:1,y:3},
            {x:3,y:3}
        ];
        flag=[
            [0,0,1,0,0,0,0,0,1],
            [0,0,0,0,1,0,0,0,0],
            [0,0,1,0,0,0,1,1,0],
            [0,0,1,0,1,0,0,0,0],
            [0,0,0,0,0,1,0,1,0],
            [0,0,0,0,1,0,0,1,0],
            [0,0,1,0,0,0,0,0,0],
            [0,1,0,0,0,0,0,1,0],
            [0,0,0,0,1,0,0,0,0],
            [0,1,0,0,0,0,0,0,0]
        ];

        for(let i=0;i<=8;i++){
            pieces[i].setPosition(x[point[i].x],y[point[i].y]);
            pieces[i].setDraggable(true);
        }
        xyj_left_scene_king_black.setTransparentAlpha(1);
        xyj_left_scene_king_black.setDraggable(true);
        xyj_left_scene_king_black.setIgnoreClickEvent(false);
    });

    var fcnt=0,sur=true;

    function checkMove(p,id){
        let cx=-1,cy=-1;
        let px=point[id].x,py=point[id].y;
        for(let i=0;i<=8;i++){
            if(Math.abs(p.x-x[i])<=40) cx=i;
        }
        for(let i=0;i<=9;i++){
            if(Math.abs(p.y-y[i])<=40) cy=i;
        }
        if(cx==-1||cy==-1) return;
        if(flag[cy][cx]==1&&cx!=4&&cy!=1) return;
        let valid=false;
        switch(id){
            case 1:{ //马
                if(Math.abs(px-cx)==2&&Math.abs(py-cy)==1) valid=true;
                if(Math.abs(px-cx)==1&&Math.abs(py-cy)==2) valid=true;
                break;
            }
            case 2:{ //象
                if(Math.abs(px-cx)==2&&Math.abs(py-cy)==2&&cy<=4) valid=true;
                if(flag[(py+cy)/2][(px+cx)/2]==1) valid=false;
                break;
            }
            //TODO Mandarin and cannon move check.
            //Finish.
            // case 3:{ //仕
            //     if(cx<3&&cx>5&&cy<7&&cy>9) break;
            //     if(px%2==0&&py%2==0){ //角或中央
            //         if(Math.abs(px-cx)==1||Math.abs(py-cy)==1) valid=true;
            //     }else{ //边
            //         if(Math.abs(px-cx)==1&&Math.abs(py-cy)==0||Math.abs(px-cx)==0&&Math.abs(py-cy)==1) valid=true;
            //     }
            //     break;
            // }
            case 3:{ //将
                if(cx<3||cx>5||cy<0||cy>2) break;
                if(px%2==1&&py%2==0||px==4&&py==1){ //角或中央
                    if(Math.abs(px-cx)==1||Math.abs(py-cy)==1) valid=true;
                }else{ //边
                    if(Math.abs(px-cx)==1&&Math.abs(py-cy)==0||Math.abs(px-cx)==0&&Math.abs(py-cy)==1) valid=true;
                }
                break;
            }
            case 4:{ 
                if(cx<3||cx>5||cy<7||cy>9) break;
                if(px%2==1&&py%2==1||px==4&&py==8){ //角或中央
                    if(Math.abs(px-cx)==1||Math.abs(py-cy)==1) valid=true;
                }else{ //边
                    if(Math.abs(px-cx)==1&&Math.abs(py-cy)==0||Math.abs(px-cx)==0&&Math.abs(py-cy)==1) valid=true;
                }
                break;
            }
            case 0:{ //車
                let cnt=0
                if(cx==px&&cy<py){ //up
                    for(let i=cy+1;i<py;i++){
                        if(flag[i][cx]) cnt++;
                    }
                    if(cnt==0) valid=true;
                }
                if(cx==px&&cy>py){ //down
                    for(let i=py+1;i<cy;i++){
                        if(flag[i][cx]) cnt++;
                    }
                    if(cnt==0) valid=true;
                }
                if(cy==py&&cx<px){ //left
                    for(let i=cx+1;i<px;i++){
                        if(flag[cy][i]) cnt++;
                    }
                    if(cnt==0) valid=true;
                }
                if(cy==py&&cx>px){ //right
                    for(let i=px+1;i<cx;i++){
                        if(flag[cy][i]) cnt++;
                    }
                    if(cnt==0) valid=true;
                }
                break;
            }
            case 5:{ //炮
                let cnt=0
                if(cx==px&&cy<py){ //up
                    for(let i=cy+1;i<py;i++){
                        if(flag[i][cx]) cnt++;
                    }
                    if(cnt==0) valid=true;
                    if(cnt==1&&flag[cy][cx]==1) valid=true;
                }
                if(cx==px&&cy>py){ //down
                    for(let i=py+1;i<cy;i++){
                        if(flag[i][cx]) cnt++;
                    }
                    if(cnt==0) valid=true;
                    if(cnt==1&&flag[cy][cx]==1) valid=true;
                }
                if(cy==py&&cx<px){ //left
                    for(let i=cx+1;i<px;i++){
                        if(flag[cy][i]) cnt++;
                    }
                    if(cnt==0) valid=true;
                    if(cnt==1&&flag[cy][cx]==1) valid=true;
                }
                if(cy==py&&cx>px){ //right
                    for(let i=px+1;i<cx;i++){
                        if(flag[cy][i]) cnt++;
                    }
                    if(cnt==0) valid=true;
                    if(cnt==1&&flag[cy][cx]==1) valid=true;
                }
                break;
            }
            case 6:{ //卒(黑)
                if(px-cx==0&&py-cy==-1) valid=true;
                if(py>=5&&Math.abs(px-cx)==1&&py-cy==0) valid=true;
                break;
            }
            case 7:
            case 8:{ //兵(红)
                if(px-cx==0&&py-cy==1) valid=true;
                if(py<=4&&Math.abs(px-cx)==1&&py-cy==0) valid=true;
                break;
            }
        }
        if(valid){
            if(cx==point[3].x&&cy==point[3].y&&id!=3){ //吃将
                //fcnt++;
                xyj_left_scene_king_black.setTransparentAlpha(0);
                console.log(`King OUT`);
                sur=false;
                if(cx==final[id].x&&cy==final[id].y&&fcnt==7) document.dispatchEvent(winEvent);
                else document.dispatchEvent(loseEvent);
            }
            console.log(`${pieces[id]} Move to (${cx},${cy})`);
            flag[py][px]=0;
            flag[cy][cx]=1;
            point[id].x=cx;
            point[id].y=cy;
            if(cx==final[id].x&&cy==final[id].y){
                fcnt++;
                console.log(`${pieces[id]} Complete, Total ${fcnt}`);
                //TODO Check winning.
                if(fcnt==8){
                    if(sur==true) document.dispatchEvent(loseEvent);
                    else document.dispatchEvent(winEvent);
                }
                pieces[id].setDraggable(false);
            }
        }
        if(!valid) console.log(`${pieces[id]} Invalid Move`);
        return;
    }

    var xyj_left_scene_try_button=new Button(canvas.scene("xyj_left_scene"),0,0,336,66,12,res.getResource("try_again"),null,null,()=>{
        document.dispatchEvent(setEvent);
        xyj_left_scene_try_button.setTransparentAlpha(0);
        xyj_left_scene_try_button.setIgnoreClickEvent(true);
        xyj_left_scene_try_button.setClickable(false);
    },()=>{},309,502);
    
    document.addEventListener('loseGame',()=>{
        xyj_game_scene.to(2);
        xyj_left_scene_try_button.setTransparentAlpha(1);
        xyj_left_scene_try_button.setIgnoreClickEvent(false);
        xyj_left_scene_try_button.setClickable(true);
    });

    document.addEventListener('winGame',()=>{
        console.log(`You Win!`);
        wingame=true;
        xyj_game_scene.to(1);
        xyj_answer_box_fake_button.setClickable(true);
        xyj_door_scene_lock.setTransparentAlpha(0);
        xyj_left_scene_undo.setClickable(false);
    });

    //canvas.changeScene("xyj_door_scene");
}

var res;

function init(canvas){
    res=new Resource(cfg); //加载素材
    //res.onload=()=>build(canvas); //仅测试用
}

function destroy(canvas){
    canvas.deleteScene("xyj_door_scene");
    canvas.deleteScene("xyj_top_scene");
    canvas.deleteScene("xyj_right_scene");
    canvas.deleteScene("xyj_left_scene");
    console.log("des xyj");
}

export default{
    init,build,destroy,
    setOnload: (ol)=>res.onload=ol
};