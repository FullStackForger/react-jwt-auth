var webpack = require("webpack");
var path = require("path");

module.exports = {
	target:  "web",
	cache:   false,
	context: path.join(__dirname, '../'),
	devtool: false,
	entry:   {
		"index":             "./src/index",
	},
	output:  {
		path:          path.join(__dirname, '../dist/'),
		filename:      "[name].js",
		libraryTarget: "commonjs"
	},
	externals: [{
			"react": "commonjs react",
			"react-dom": "commonjs react-dom",
			"react-loader": "commonjs react-loader",
			//"isomorphic-fetch": "commonjs isomorphic-fetch",
			//"react-redux": "commonjs react-redux",
			//"redux": "commonjs redux",
			//"rc-dialog": "commonjs rc-dialog",
			//"url": "commonjs url"
	}],
	plugins: [
		// new webpack.DefinePlugin({__CLIENT__: true, __SERVER__: false}),
		new webpack.DefinePlugin({"process.env": {NODE_ENV: "\"production\""}}),
		new webpack.optimize.DedupePlugin(),
		// new webpack.optimize.OccurenceOrderPlugin(),
		// new webpack.optimize.UglifyJsPlugin()
	],
	module:  {
		loaders: [
			//{ include: /\.json$/, loaders: ["json"] },
			{ include: /\.js$/, loaders: ["babel?cacheDirectory&presets[]=es2015&presets[]=react"], exclude: /node_modules/ }
		]
	},
	resolve: {
		alias: {
			react: path.join(__dirname, "node_modules/react")
		},
		modulesDirectories: [
			"src",
			"node_modules"
		],
		extensions: ["", ".json", ".js", ".jsx"]
	},
	node:    {
		__dirname: true,
		fs:        "empty"
	}
};