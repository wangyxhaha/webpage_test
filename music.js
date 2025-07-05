const audio = new Audio('./bgm.mp3');
audio.loop = true;
audio.autoplay = true;
audio.volume = 0.5;

audio.play().catch(err => {
    console.warn("浏览器阻止了自动播放：", err);
});