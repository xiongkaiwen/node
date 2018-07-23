const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const production = process.env.NODE_ENV==='production';
const templating = require('./templating');
const controllers = require('./controller');


app.use(async(ctx,next)=>{
    console.log(`process ${ctx.request.url} and ${ctx.request.method}`)
    let date = new Date().getTime(),
    exctime;
    await next();
    exctime = new Date().getTime()-date;
    ctx.response.set('X-Response-Time', `${exctime}ms`);
    console.log(`中间件所用时间${exctime}`)
})

if (! production) {
    let staticFiles = require('./static-file');
    app.use(staticFiles('/static/', __dirname + '/static'));
}
app.use(bodyParser());
app.use(templating('views',{
    noCache:!production,
    watch:!production
}))
app.use(controllers());
app.listen(3000);

function doubleAfter2seconds(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(2 * num)
        }, 2000);
    } )
}
async function testResult() {
    let result = await doubleAfter2seconds(30);
    console.log(result);
}
testResult();


console.log(production)
console.log('app start')