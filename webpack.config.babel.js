import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const dev = process.env.NODE_ENV !== 'production'
const targetWeb = process.env.TARGET !== 'node'

const config = {
  output: {
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        options: {
          presets: ['env'],
          plugins: ['transform-object-rest-spread']
        },
      },
      {
        test: /.hbs$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'handlebars-loader',
        options: {
          helperDirs: [`${__dirname}/src/util/helpers`]
        }
      },
      {
        test: /.m4a$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'file-loader',
        query: {
          name: '[name][hash].[ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@util': `${__dirname}/src/util`,
      '@items': `${__dirname}/src/items`,
      '@actions': `${__dirname}/src/actions`,
      '@sectors': `${__dirname}/src/sectors`,
      '@describe': `${__dirname}/src/describe`,
      '@useables': `${__dirname}/src/useables`,
      '@inputtables': `${__dirname}/src/inputtables`
    }
  },
  devtool: dev ? 'source-map' : ''
}

const webConfig = {
  ...config,
  target: 'web',
  entry: {
    head: './src/head.js',
  },
  output: {
    ...config.output,
    filename: '[name].[chunkhash].js',
    publicPath: '/LD38/',
  },
  module: {
    ...config.module,
    rules: [
      ...config.module.rules,
      {
        test: /.html$/,
        loader: 'html-loader'
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'technoglyph',
      template: 'template.ejs',
      //
      // Rather than run a JS module at the bottom of index.html that kicks things
      // off, aframe encourages you to include it and your other component
      // dependencies in the <head>, and then the body contents of the document
      // are aframe custom HTML elements which have already been registered.
      //
      // Code to be executed at document ready is instead moved into component
      // initialization methods. See src/render/components/game for an example.
      //
      inject: 'head',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => (
        module.context && module.context.indexOf('node_modules') !== -1
      )
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    })
  ]
}

const nodeConfig = {
  ...config,
  target: 'node',
  entry: './src/node-runner.js',
  output: {
    ...config.output,
    filename: 'test.js',
  }
}

export default targetWeb ? webConfig : nodeConfig
