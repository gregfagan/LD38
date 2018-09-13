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
          presets: ['env', 'react'],
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
  entry: './src/index.js',
  output: {
    ...config.output,
    filename: '[name].[chunkhash].js',
    publicPath: './',
  },
  devServer: {
    // makes app available at the dev server root (http://localhost:8080/)
    contentBase: path.join(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'technoglyph',
      template: 'template.ejs',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => (
        module.context && module.context.indexOf('node_modules') !== -1
      )
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' })
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
