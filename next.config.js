const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');

module.exports = withCSS(
  withSass({
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: '[name]_[local]'
    },
    images: {
      domains: ['skol.mavinx.com', 'scontent.cdninstagram.com']
    },
    webpack(config) {
      config.module.rules.push({
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1000000
          }
        }
      });

      return config;
    }
  })
);
