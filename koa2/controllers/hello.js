var fn_Hello = async (ctx,next)=>{
    var name = ctx.params.name ;
    console.log('hello')
    ctx.response.body=`<div>hello ${name}</div>`;
}
module.exports={
    'GET /hello/:name':fn_Hello
};
