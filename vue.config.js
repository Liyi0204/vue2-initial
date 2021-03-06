const path = require("path");
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        vue$: "vue/dist/vue.esm.js",
        "@": path.resolve(__dirname, "./src"),
        API: path.resolve(__dirname, "./src/api"),
        PAGES: path.resolve(__dirname, "./src/pages"),
        COMPS: path.resolve(__dirname, "./src/components"),
        ASSETS: path.resolve(__dirname, "./src/assets"),
        COMJS: path.resolve(__dirname, "./src/js"),
        AXIOSHTTP: path.resolve(__dirname, "./src/axiosHttp"),
      },
    },
  },

  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },

  devServer: {
    overlay: { // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true
    },
    host: "0.0.0.0",
    port: 8080, // 端口号
    open: true, //配置后自动启动浏览器
    disableHostCheck: true,
    // proxy: 'http://localhost:8080'   // 配置跨域处理,只有一个代理
    proxy: { //配置多个跨域
      "/api": {
        target: 'http://api.ciit.tech/cganjin',
        changeOrigin: true,
        pathRewrite: {
          "^/api": "http://0.0.0.0:8085"
        }
      }
    }
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/assets/css/config.less')]
    }
  }
};
