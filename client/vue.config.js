module.exports = {
  outputDir: __dirname + "/../server/web",
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/styles/theme.scss";'
      }
    }
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3300/zxd/zh/v1/api",
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
