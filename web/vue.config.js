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
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/v1/web/',
        ws: true,
        changeOrigin: true
      }
    }
  }
}