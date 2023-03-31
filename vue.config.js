const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  assetsDir: "TicTacToeVueJs/assets",
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/scss/main.scss";
        `
      }
    }
  }
})
