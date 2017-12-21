const path = require('path');

const output = path.resolve(__dirname, 'dist/');
const config = {
	entry: './index.js',
	output: {
		filename: 'index.js',
		path: output
	},
	module: {
		// 加载器配置
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								[
									'env', {
										targets: { browsers: '> 5%' }
									}
								],
								'react'
							],
							plugins: [
								'transform-decorators-legacy',
								require('babel-plugin-transform-object-rest-spread'),
								require('babel-plugin-transform-class-properties')
							]
						}
					}
				]
			},
			{
				test: /\.less$/,
				use: [
					{ loader: 'style-loader' },
					{
						loader: 'css-loader',
						options: {
							modules: true
						}
					},
					{ loader: 'less-loader' }
				]
			}
		]
	}
};

module.exports = config;
