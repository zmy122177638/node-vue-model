module.exports = () => {
  return async function(ctx,next){
    ctx.cookies.set(
      'cid', 
      'hello world',
      {
        domain: 'localhost',  // 写cookie所在的域名
        path: '/',       // 写cookie所在的路径
        maxAge: 10 * 60 * 1000, // cookie有效时长
        expires: new Date('2020-02-15'),  // cookie失效时间
        httpOnly: false,  // 是否只用于http请求中获取
        overwrite: false  // 是否允许重写
      }
    )
    await next()
  }
}