class Music{
    constructor(resource){
        this.audio=new Audio(resource);
        this.audio.preload="auto";
    }
    play(){
        this.audio.play().catch(err=>{
            console.warn('无法播放音乐 ${this.name}:',err);
        });
    }
    pause(){
        this.audio.pause();
    }
    stop(){
        this.audio.pause();
        this.audio.currentTime=0;
    }
    loop(enabled=true){
        this.audio.loop=enabled;
    }
    static get(name){
        return Music.instances[name];
    }
}

export default Music;