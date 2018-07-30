const withCSS = require('@zeit/next-css')
const withTypescript = require('@zeit/next-typescript')

module.exports = withCSS(withTypescript({
    webpack (config) {
      config.module.rules.push({
        test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            publicPath: './',
            outputPath: 'static/',
            name: '[name].[ext]'
          }
        }
      })

      return config
    }
  }))
