"use strict"

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
                )
            }
            else if (urls[i].type=="audio"){
                this.promiseArray.push( //通过Promise数组和Promise.all来统一加载
                    new Promise((resolve,reject)=>{
                        this.resource[urls[i].name]=new Audio();
                        this.resource[urls[i].name].src=urls[i].value;
                        this.resource[urls[i].name].onload=()=>resolve();
                        this.resource[urls[i].name].onerror=()=>reject(`Audio loading error, name:${urls[i].name}, url:${urls[i].value}`);
                    })
                    .catch(err=>{
                        this.fail=true;
                        console.log(`ERROR information:${err}`)
                    })
                )
            }
            else throw `unknown type ${urls[i].type}`;
        }
        Promise.all(this.promiseArray) //通过Promise.all获取全部加载状态
            .then(()=>{
                this.resourceOK=true;
                console.log("Resources loaded successfully");
            })
            .catch(()=>{
                this.fail=true;
                console.log(`ERROR information:${err}`)
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

export default{
    Resource
}
