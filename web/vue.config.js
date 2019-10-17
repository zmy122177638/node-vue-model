module.exports = {
  outputDir: __dirname + '/../server/web',
  css: {
    loaderOptions: {
      less: {
        /** 全局less变量 */
        globalVars: {
          color: '#ccc'
        }
      }
    }
  }
}