"use strict"

class MyAudio/*!!!!!*/{
    static audioContext=new AudioContext({latencyHint: 'interactive'});

    static resume=()=>{
        this.audioContext.resume();
    }

    constructor(audioBuffer){
        this.audioBuffer=audioBuffer;
        this.firstTime=true;
        this.playing=false;
        this.mute_bgm=false;
    }
    play(from=0,effect=null){
        if (!this.firstTime) this.src.stop();
        this.firstTime=false;

        if (effect==="mute_bgm"){
            this.mute_bgm=true;
            MyAudio.bgm_mute_cnt++;
        }

        this.src=MyAudio.audioContext.createBufferSource();
        this.src.buffer=this.audioBuffer;
        this.src.connect(MyAudio.audioContext.destination);
        this.src.start(0,from);
        this.src.addEventListener("ended",()=>this.stop());
        this.playing=true;
    }
    stop(){
        if (this.playing) this.src.stop();
        this.playing=false;
        if (this.mute_bgm){
            MyAudio.bgm_mute_cnt--;
            this.mute_bgm=false;
        }
    }

    static bgm_src=null;
    static bgm_gain_node=null;
    static bgm_mute_cnt=0;
    static bgm_mute_cnt_pre=0;
    static play_bgm=(src_buffer)=>{
        console.log("bgm");
        if (MyAudio.bgm_src){
            MyAudio.bgm_src.stop();
            MyAudio.bgm_gain_node.disconnect();
            MyAudio.bgm_src.disconnect();
            let loop=()=>{
                console.log(MyAudio.bgm_mute_cnt,MyAudio.bgm_mute_cnt_pre);
                if (MyAudio.bgm_mute_cnt===0 && MyAudio.bgm_mute_cnt_pre!=0){
                    MyAudio.bgm_gain_node.gain.setValueCurveAtTime([0,1],MyAudio.audioContext.currentTime,1);
                }
                else if (MyAudio.bgm_mute_cnt!=0 && MyAudio.bgm_mute_cnt_pre===0){
                    console.log("!");
                    MyAudio.bgm_gain_node.gain.setValueCurveAtTime([1,0],MyAudio.audioContext.currentTime,1);
                }
                MyAudio.bgm_mute_cnt_pre=MyAudio.bgm_mute_cnt;
                requestAnimationFrame(loop);
            };
            requestAnimationFrame(loop);
        }
        MyAudio.bgm_src=MyAudio.audioContext.createBufferSource();
        MyAudio.bgm_src.loop=true;
        MyAudio.bgm_gain_node=MyAudio.audioContext.createGain();
        MyAudio.bgm_src.connect(MyAudio.bgm_gain_node);
        MyAudio.bgm_gain_node.connect(MyAudio.audioContext.destination)
        MyAudio.bgm_src.buffer=src_buffer.audioBuffer;
        MyAudio.bgm_src.start(0);
    }
}

export default MyAudio;
