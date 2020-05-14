module.exports = () => {
  return async function(ctx,next){
    ctx.set("Access-Control-Allow-Origin", ctx.origin);
    ctx.set('Access-Control-Allow-Credentials', true);
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    ctx.set("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    ctx.set("Content-Type", "application/json;charset=utf-8");
    ctx.set("X-Powered-By", "2.11.0")
    await next()
  }
}