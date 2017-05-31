var mong = require('mongoose')
var schem = mong.Schema

var loginScem = schem({
	Email:{
		type:String,
		required:true
	},
	pass:{
		type:String,
		required:true
	},
	name:{
		type:String
		required:true
	}

},{timestamps:true})
var table = mong.model('hackthon',loginScem,"loginTable")
module.exports.loginTable = loginTable

var test = "ok";
