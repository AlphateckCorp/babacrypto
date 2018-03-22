var webpack = require('webpack');
var cssnext = require('postcss-cssnext');
var postcssFocus = require('postcss-focus');
var postcssReporter = require('postcss-reporter');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: {
    app: [
      'eventsource-polyfill',
      'webpack-hot-middleware/client',
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      './client/index.js',
    ],
    vendor: [
      'react',
      'react-dom',
    ],
    stylesCustom: './scss/maincss.js'
  },

  output: {
    path: __dirname,
    filename: '[name].js',
    publicPath: 'http://localhost:8000/',
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    modules: [
      'client',
      'node_modules',
    ],
  },

  module: {
    loaders: [
      {
        test: /\.css$/,
        exclude: [/node_modules/, /scss/],
        loader: 'style-loader!css-loader?localIdentName=[name]__[local]__[hash:base64:5]&modules&importLoaders=1&sourceMap!postcss-loader',
      }, {
        test: /\.css$/,
        include: /node_modules/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        include: /scss/,
        loader: ExtractTextPlugin.extract("style", "css!sass")
      },

      // {
      //   test: /\.scss$/,
      //   exclude: /node_modules/,
      //   loader: 'style-loader!css-loader?localIdentName=[name]__[local]__[hash:base64:5]&modules&importLoaders=1&sourceMap!sass-loader?sourceMap',
      // }, {
      //   test: /\.scss$/,
      //   include: /node_modules/,
      //   loaders: ['style-loader', 'css-loader', 'sass-loader']
      // }, 
      {
        test: /\.jsx*$/,
        exclude: [/node_modules/, /.+\.config.js/],
        loader: 'babel',
      }, {
        test: /\.jpe?g$|\.gif$|\.png$|\.woff$|\.woff2$|\.eot$|\.ttf$|\.svg$/i,
        loader: 'url-loader?limit=10000',
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      },
      //   {
      //     test: /\.(eot|svg|ttf|woff|woff2)$/,
      //     loader: 'file?name=/font/[name].[ext]'
      // }
      // {
      //   test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      //   use: [{
      //     loader: 'file-loader',
      //     options: {
      //       name: '[name].[ext]',
      //       outputPath: 'http://localhost:8000/font/'
      //     }
      //   }]
      // },
      // {

      //   test: /\.(eot|svg|ttf|woff|woff2)$/,
      //   loader: "url-loader",
      //   options: {
      //     name: "./font/[name].[ext]",
      //   },
      // },
      { test: /\.svg$/, 
        include: '/scss/font/',
        // loader: ExtractTextPlugin.extract("style", "css!sass")
        loader: 'url?limit=65000&mimetype=image/svg+xml&name=font/[name].[ext]'
      },
      // { test: /\.woff$/, loader: 'url?limit=65000&mimetype=application/font-woff&name=font/[name].[ext]' },
      // { test: /\.woff2$/, loader: 'url?limit=65000&mimetype=application/font-woff2&name=font/[name].[ext]' },
      // { test: /\.[ot]tf$/, loader: 'url?limit=65000&mimetype=application/octet-stream&name=font/[name].[ext]' },
      // { test: /\.eot$/, loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=font/[name].[ext]' },
      { 
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
        loader: 'url-loader?limit=100000' 
        
      }
    ],
  },

  plugins: [
    new ExtractTextPlugin('[name].css', { allChunks: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.js',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        CLIENT: JSON.stringify(true),
        'NODE_ENV': JSON.stringify('development'),
      }
    }),
   

  ],

  postcss: () => [
    postcssFocus(),
    cssnext({
      browsers: ['last 2 versions', 'IE > 10'],
    }),
    postcssReporter({
      clearMessages: true,
    }),
  ],
};
