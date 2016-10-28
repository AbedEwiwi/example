var mong = require('mongoose')
var schem = mong.Schema

var newSc = schem({
	Email:{
		type:String,
		required:true
	},
	pass:{
		type:String,
		required:true
	},
	name:{
		type:String,
		required:true
	},
	cookies:{
		type:String,
		required:true
	}

},{timestamps:true})
var table = mong.model('ha',newSc,"loginTable")
module.exports = table