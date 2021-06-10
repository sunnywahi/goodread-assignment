const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
	entry: {
		/** set webpack to look in src/index.jsx for the first file to load" */
		index: path.resolve(__dirname, "src", "index.jsx")
	},
	output: {
		/** set webpack to set the bundle output in 'dist' directory. Note that this is the default" */
		path: path.resolve(__dirname, "dist")
	},
	devServer: {
		contentBase: "./",
		port: 8080
	},
	module: {
		rules: [
			/** 
			 * Note that webpack loaders are loaded right to left 
			 * Here we load css first, and then use style-loader to inject
			 * the css into the page.
			 * Similarly, if we use sass, we have to specify it first
			 * If we specify it the other way around, it is not going to work
			 */
			{
				test: /\.css$/,
				use: ["style-loader","css-loader"]
			},
			{
				test: /\.scss$/,
				use: ["style-loader","css-loader", "sass-loader"]
			},
			/**
			 * Configure webpack to use babel-loader to transform Javascript files
			 */
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				use: ["babel-loader"]
			}

		]
	},
	plugins: [
		/** 
		 * tell webpack to load HTML template from src/index.html 
		 * goal of html-webpack-plugin is:
		 * - load the HTML
		 * - inject bundle(s) in the same file
		 */
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "src", "index.html")
		})
	]

};
