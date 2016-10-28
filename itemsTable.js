var mong = require('mongoose')
require('mongoose-long')(mong);
var schem = mong.Schema

var loginScem = schem({
	title:{
		type:String,
		require:true
	},
	disc:{
		type:String,
		require:true
	},
	imageUrl:{
		type:String,
		require:false
	},
	duration:{
		type:schem.Types.Long,
		require:true,
		default:1
	},
	expired:{
		type:Date,
		require:true
	},
	lat:{
		type:Number,
		require:true
	},
	lng:{
		type:Number,
		require:true
	},
	categories:{
		type:Number,
		require:true
	},
	userId:{
		type:String,
		require:true
	},
	distance:{
		type:Number,
		require:false
	}


},{timestamps:true})
var table = mong.model('hackthon',loginScem,"itemsTable")
module.exports.item = table

