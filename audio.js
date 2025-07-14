"use strict"

class MyAudio/*!!!!!*/{
    static audioContext=new AudioContext();
    constructor(audioBuffer){
        this.audioBuffer=audioBuffer;
        this.firstTime=true;
    }
    play(from=0){
        if (!this.firstTime) this.src.stop();
        this.firstTime=false;
        this.src=MyAudio.audioContext.createBufferSource();
        this.src.buffer=this.audioBuffer;
        this.src.connect(MyAudio.audioContext.destination);
        this.src.start(0,from);
    }
    stop(){
        this.src.stop();
    }
}

export default MyAudio;
