const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('./webpack.common');

const output = common.output.path;

const config = {
	devtool: 'eval',
	devServer: {
		contentBase: path.join(__dirname, 'static'),
		hot: true
	},
	plugins: [
		new CleanWebpackPlugin([output]),
		new webpack.HotModuleReplacementPlugin()
	]
};

module.exports = merge(common, config);
