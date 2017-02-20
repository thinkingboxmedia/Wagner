import path from 'path';
import webpack from 'webpack';

module.exports = {

  output: {
    filename: 'example.js',
    publicPath: '/build/'
  },
	module: {
		loaders: [
			{
        test: /\.js$/,
        loader: 'babel-loader',
      },

      // GLSL
      { test: /\.(glsl|frag|vert)$/, loader: 'raw-loader' },
      { test: /\.(glsl|frag|vert)$/, loader: 'glslify-loader' }
		]
	},

  plugins: ([

		new webpack.HotModuleReplacementPlugin(),

	])
};