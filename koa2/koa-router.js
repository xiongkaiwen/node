
const Koa = require('koa');
// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();
//解析post参数对象
const bodyParse = require('koa-bodyparser');
const app = new Koa();

router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    console.log(ctx)
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

router.get('/',async (ctx,next)=>{
    ctx.response.body = `<h1>Index</h1>
    <form action="/signin" method="post">
        <p>Name: <input name="name" value="koa"></p>
        <p>Password: <input name="password" type="password"></p>
        <p><input type="submit" value="Submit"></p>
    </form>`;
})

router.post('/signin',async(ctx,next)=>{
   let name = ctx.request.body.name|| '',
       password = ctx.request.body.password || '';
    if(name=='koa'&&password=='123456'){
        ctx.response.body=`welcome ${name}`;
    }else{
        ctx.response.body=`<div>login failed <br>  <a href='/'>relogin</a></div>`
    }
})



app.use(bodyParse());
app.use(router.routes());
app.listen(3000);
console.log('app start');