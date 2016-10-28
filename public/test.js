
var http = require("http");
var t = require('./s.js')
var assert = require("assert");
var mongosse=require('mongoose');
var url = "mongodb://localhost:27017/test";
var parsee = require('body-parser');

mongosse.connect(url);
var db =mongosse.connection;
db.once('open',function(){
	console.log("connect correctly to db")
	var int = t({
		name:"newData",
		discr:"newDisc"
	})
	int.save(function(err){
		assert.equal(err,null)
		console.log("save item ok")
		t.find({},function(err,data){
			console.log(data)
		})
	})

})
var net =require('net')
var express = require("express");
var app=express();
app.use(parsee.text())

// var async = require('async');
app.use(express.static(__dirname));
app.get("/todo",process_request)
app.post("/todo/:itemId",function(req,res){
	console.log(req.params.itemId)
	// console.log(req.query.username)
	// console.log(req.body.pass)
	var js = JSON.parse(req.body)
	// console.log(js.username)
	console.log(req.body)
	console.log(req.headers)
})	

// async.waterfall([function(callback){callback(33)},function(x){console.log(x)}])
// console.assert((1==1),"WTF");
function process_request(req,res){
	// res.send(["a","b","c"]+"\n")
	res.sendFile(__dirname+"/index.html")
}

// function simply_serve(req,res){
// 	res.writeHead(200,{"Content_Type":"application/json"});
// 	res.end("OK\n")
// }
app.listen(1234,function(err){
	console.log("running...........")
});
