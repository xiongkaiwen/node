const Koa = require('koa');
const bodyParse = require('koa-bodyparser');
const app = new Koa();
const controllers = require('./controller');


app.use(bodyParse())
app.use(controllers())
app.listen(3000)
console.log(`app start`)