var path =require('path');
var mime = require('mime');
var fs = require('mz/fs');

function staticFiles(url,dir){
    return async (ctx,next)=>{
        var rpath = ctx.request.path;
        if(rpath.startsWith(url)){
            let fp = path.join(dir,rpath.substring(url.length));
            if(await fs.exists(fp)){
                ctx.response.type=mime.lookup(fp);
                ctx.response.body=await fs.readFile(fp);
            }else{
                ctx.response.type=404;
            }
        }else{
            await next();
        }
    }
}


module.exports = staticFiles;