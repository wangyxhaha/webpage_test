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
        this.res=new Object();
        for (let i=0;i<urls.length;i++){
            fetch(urls[i])
                .then();
        }
    }
}

export default{
    Resource
}
