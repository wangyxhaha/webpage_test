"use strict"

// import { GifReader } from "./omggif.js";
import Animation from "./animation.js";
import MyAudio from "./audio.js";

class Resource{ //用来读取关卡并加载资源，生成对应对象
    constructor(urls){
        // this.jsonOK=false;
        // this.json=null;
        // fetch(levelJSONurl) //异步读取JSON
        //     .then(resource=>resource.json())
        //     .then(jsonResource=>{
        //         this.json=jsonResource;
        //         console.log(typeof(this.json),this.json);
        //         this.jsonOK=true;
        //     })
        //     .catch(text=>{
        //         console.log("fail!",text);
        //     })
        this.fail=false;
        this.resourceOK=false;
        this.resource=new Object();
        this.promiseArray=new Array();
        this.onload=()=>{};
        for (let i=0;i<urls.length;i++){
            if (urls[i].type=="image"){
                this.promiseArray.push( //通过Promise数组和Promise.all来统一加载
                    new Promise((resolve,reject)=>{
                        this.resource[urls[i].name]=new Image();
                        this.resource[urls[i].name].src=urls[i].value;
                        this.resource[urls[i].name].onload=()=>resolve();
                        this.resource[urls[i].name].onerror=()=>reject(`Image loading error, name:${urls[i].name}, url:${urls[i].value}`);
                    })
                    .catch(err=>{
                        this.fail=true;
                        console.log(`ERROR information:${err}`)
                    })
                );
            }
            else if (urls[i].type=="gif"){
                this.promiseArray.push(
                    (async ()=>{
                        try{
                            let response=await fetch(urls[i].value);
                            if (!response.ok){
                                throw new Error(`Fetch failed with status ${response.status}`);
                            }
                            let buffer=await response.arrayBuffer();
                            let uint8Array = new Uint8Array(buffer);
                            let reader=new GifReader(uint8Array);
                            let frameArray=new Array();
                            let prepixels=new Uint8Array(reader.width*reader.height*4);
                            for (let j=0;j<reader.numFrames();j++){
                                let pixels=new Uint8Array(reader.width*reader.height*4);
                                reader.decodeAndBlitFrameRGBA(j,pixels);
                                let disposal= j===0 ? 1 : reader.frameInfo(j-1).disposal;
                                if (disposal===1){
                                    for (let k=0,kl=pixels.length;k<kl;k+=4){
                                        if (pixels[k+3]===0){
                                            pixels[k]=prepixels[k];
                                            pixels[k+1]=prepixels[k+1];
                                            pixels[k+2]=prepixels[k+2];
                                            pixels[k+3]=prepixels[k+3];
                                        }
                                    }
                                }
                                prepixels=pixels;
                                let clampedPixels = new Uint8ClampedArray(pixels); // 明确转为 Uint8ClampedArray
                                let imgData=new ImageData(clampedPixels, reader.width, reader.height)
                                let tempCanvas=new OffscreenCanvas(imgData.width,imgData.height);
                                let osctx=tempCanvas.getContext("2d");
                                osctx.putImageData(imgData,0,0);
                                let bolb=await tempCanvas.convertToBlob();
                                let imgURL=URL.createObjectURL(bolb);
                                let img=new Image();
                                await new Promise(resolve=>{
                                    img.src=imgURL;
                                    img.onload=()=>resolve();
                                });
                                frameArray.push({image:img,interval:Math.max(reader.frameInfo(j).delay*10,10)});
                            }
                            this.resource[urls[i].name]=new Animation(frameArray);
                        }
                        catch(err){
                            throw `File:${urls[i].value}, Message:${err.message}\n${err.stack}}`;
                        }
                    })()
                );
            }
            // else if (urls[i].type=="audio"){
            //     this.promiseArray.push( //通过Promise数组和Promise.all来统一加载
            //         new Promise((resolve,reject)=>{
            //             this.resource[urls[i].name]=new Audio();
            //             this.resource[urls[i].name].src=urls[i].value;
            //             this.resource[urls[i].name].oncanplaythrough=()=>resolve();
            //             this.resource[urls[i].name].onerror=()=>reject(`Audio loading error, name:${urls[i].name}, url:${urls[i].value}`);
            //         })
            //         .catch(err=>{
            //             this.fail=true;
            //             console.log(`ERROR information:${err}\n${err.stack}`)
            //         })
            //     );
            // }
            else if (urls[i].type=="audio"){
                this.promiseArray.push( //通过Promise数组和Promise.all来统一加载
                    (async ()=>{
                        try{
                            let response=await fetch(urls[i].value);
                            if (!response.ok){
                                throw new Error(`Fetch failed with status ${response.status}`);
                            }
                            let buffer=await response.arrayBuffer();
                            let audioBuffer=await MyAudio.audioContext.decodeAudioData(buffer);
                            this.resource[urls[i].name]=new MyAudio(audioBuffer);
                        }
                        catch(err){
                            throw `File:${urls[i].value}, Message:${err.message}\n${err.stack}}`;
                        }
                    })()
                );
            }
            else throw `unknown type ${urls[i].type}`;
        }
        Promise.all(this.promiseArray) //通过Promise.all获取全部加载状态
            .then(()=>{
                this.resourceOK=true;
                console.log("Resources loaded successfully");
                this.onload();
            })
            .catch(err=>{
                this.fail=true;
                console.log(`ERROR information:${err}\n${err.stack}`)
            })
    }
    areOurResourcesReady(){
        if (this.fail) return false;
        if (this.resourceOK) return true;
        return false;
    }
    getResource(name){
        if (this.areOurResourcesReady() && (name in this.resource)){
            return this.resource[name];
        }
        return null;
    }
}

export default Resource;
