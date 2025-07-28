"use strict"

class MyAudio/*!!!!!*/{
    static audioContext=new AudioContext({latencyHint: 'interactive'});
    constructor(audioBuffer){
        this.audioBuffer=audioBuffer;
        this.firstTime=true;
        this.playing=false;
    }
    play(from=0){
        if (!this.firstTime) this.src.stop();
        this.firstTime=false;
        this.src=MyAudio.audioContext.createBufferSource();
        this.src.buffer=this.audioBuffer;
        this.src.connect(MyAudio.audioContext.destination);
        this.src.start(0,from);
        this.playing=true;
    }
    stop(){
        if (this.playing) this.src.stop();
        this.playing=false;
    }
}

MyAudio.audioContext.resume();

export default MyAudio;
