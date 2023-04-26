const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/scss/main.scss";
        `
      }
    }
  },  
  chainWebpack: config => {
    config
        .plugin('html')
        .tap(args => {
            args[0].title = "Tic Tac Toe";
            return args;
        })
  }, 
  publicPath: '/TicTacToeVueJs/'
})
