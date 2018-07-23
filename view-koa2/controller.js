const fs = require('fs');
const router = require('koa-router')();

function addMapping(router,mapping){ //路由 mapping文件
    for(let method in  mapping){
        if(method.startsWith('GET ')){
            let path = method.substring(4);
            router.get(path,mapping[method]);
        }else if (method.startsWith('POST ')){
            let path = method.substring(5);
            router.post(path,mapping[method]);
        }else{
            console.log(`error methos ${method}`)
        }
    }
};

function addControllers(router,dir){
    //读取controllers下的文件
    let path = dir || '/controllers';
    let files = fs.readdirSync(__dirname+path);
    files = files.filter((f)=>{
        return f.endsWith('.js');
      
    })
    files.map((file,index)=>{
        //需要文件所以是require 不是 readfile
        let mapping=require(__dirname+path+'/'+file);
        addMapping(router,mapping);
    })


}

module.exports=function(dir){
    addControllers(router,dir);
    return router.routes();
}