const fs = require('fs');
const router = require('koa-router')();
function addMapping(router,mapping){ //路由 mapping文件
    for(let methods in mapping){
        console.log(methods)
        //如果get开头
        if(methods.startsWith('GET ')){
            var path = methods.substring(4);
            router.get(path,mapping[methods]);
        } else if(methods.startsWith('POST ')){
            var path = methods.substring(5);
            router.post(path,mapping[methods]);
        }else{
            console.log(`invalid url ${methods}`)
        }
    }

}

function addControllers(router,dirObj){
    //读取指定文件下的JS文件
    let dir = dirObj || '/controllers';
    var files = fs.readdirSync(__dirname+dir);
    files=files.filter((f)=>{
        return f.endsWith('.js');
    })
    //先读取指定的JS文件，再加载指定的mapping 
    files.map((file,index)=>{
        let mapping = require(__dirname+dir+'/'+file);
        addMapping(router,mapping)
    })
}

module.exports=function(dir){
    addControllers(router,dir);
    return router.routes();
}
