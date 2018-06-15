var path = require('path');
var webpack = require('webpack');

module.exports = {

  entry: __dirname + "/src/index.js",              //需要打包的文件  
  
  output: { 

        path: __dirname + "/dist",             //打包后的js文件存放的地方        

        filename: "bundle.js"                     //打包后的js文件名   

  },

	module: {
		rules:[{
			test: /\.js$/,
			use:['babel-loader?cacheDirectory=true'],
			include: path.join(__dirname,'src'),
		},
		{
			test:/\.css$/,
			loader:['style-loader','css-loader','less-loader']
		},
		{
			test:/\.less$/,
			use:[{
				loader: "style-loader"
			},{
				loader: "css-loader"
			},{
				loader: "less-loader",
				options: { javascriptEnabled: true}
			}]
		},
		{
			test:/\.(png|jpg|gif)$/,
			loader:['url-loader','file-loader']
    },
  {
    test:/\.(htm|html)$/,
    loader:['html-loader']
  }
]},

	


};