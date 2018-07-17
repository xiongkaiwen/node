
var fn_index = async (ctx,next)=>{
    ctx.response.body = `<h1>Index</h1>
    <form action="/signin" method="post">
        <p>Name: <input name="name" value="koa"></p>
        <p>Password: <input name="password" type="password"></p>
        <p><input type="submit" value="Submit"></p>
    </form>`;
};

var fn_login = async(ctx,next)=>{
    let name = ctx.request.body.name|| '',
        password = ctx.request.body.password || '';
     if(name=='koa'&&password=='123456'){
         ctx.response.body=`welcome ${name}`;
     }else{
         ctx.response.body=`<div>login failed <br>  <a href='/'>relogin</a></div>`
     }
 };

 module.exports={
     'GET /':fn_index,
     'POST /signin' : fn_login
 }
 


