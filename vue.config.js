const { defineConfig } = require('@vue/cli-service')
moduleExports = {
  devServer:{
    proxy:{
      '^/api':{
        target: 'http://localhost:1337',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: { '^/api': '/' },
      }
    }
  },
}