var express = require('express')
var app = express()
var mongosse=require('mongoose');
var url = "mongodb://localhost:27017/test";
var randomstring = require("randomstring")
mongosse.connect(url)
var db =mongosse.connection;
var op = require('./DBOper.js')
var bodyParser = require('body-parser')
var fs =require('fs')

var categories ={tools:1,furnitures:2,}
// app.use(express.cookieParser('123456789'))
app.use(bodyParser.urlencoded({extended:false,parameterLimit:100,limit:'50mb'}))
app.use(check)
app.use(express.static(__dirname+'/public'))
app.post('/signup',function (req,res){
	console.log("in sign up")
	var data =req.body
	op.findByEmail(data,function(err,ret){
		if (err){
			console.log("erorororo")
		}
		else
		{
			if (ret==null || ret.length==0)
			{
				data.cookie = String(randomstring.generate())
			 	var newUser = op.addUser(data,function(err){
	 			if (err){
			 		console.log("here")
					res.sendStatus(401)
			 	}
			 	else{
	 		// console.log("fsjadfjasdlfalsk")
		 			res.writeHeader(200, {'Cookie': String(data.cookie)})
					res.end(data.cookie)
			 	}
			 })
			}
			else
			{
				res.sendStatus(321)

			}

		}
	})
	// data.cookie = String(randomstring.generate())
	// var newUser = op.addUser(data,function(err){
	// 	if (err){
	// 		console.log("here")
	// 		res.send(401)
	// 	}
	// 	else{
	// 		console.log("fsjadfjasdlfalsk")
	// 		res.writeHeader(200, {'Cookie': String(data.cookie)})
	// 		res.end(data.cookie)
	// 	}
	// })

})

app.post('/login',function(req,res){
	console.log("in login")
	var email = req.body.email
	var password =req.body.password
	console.log(email,password)

	op.findUser(db,req.body,function(err,data){
		if (err){
			res.sendStatus(401)
		}
		else
		{
			if ((data!=null || data.length!=0) && data[0]!=undefined){
				var cook = data[0].cookies
				res.setHeader("Cookie",cook)
				res.send(cook)
			} 
			else
			{
				res.sendStatus(712)
			}

		}
	})
})
app.get('/categories',function(req,res){
	console.log("here for categories")
	var cookie =req.headers.cookies
	op.checkCookie(cookie,function(err,data){
		if (err){
			res.sendStatus(401)
		}
		else
		{
			res.json(categories)
		}

	})
})
app.post('/item',function(req,res){
	// console.log(req.headers.cookies)
	console.log("in post item")
	var cookie = req.headers.cookies
	op.checkCookie(cookie,function(err,ret){
		if(err){
			consoloe.log("error find cookie")
			res.sendStatus(401)
		}
		else
		{
			console.log(ret)
			var data ={};
			var title = req.body.title
			var disc = req.body.description
			var duration = req.body.duration
			var expired = req.body.expired
			var lat = req.body.lat
			var lng = req.body.lng
			var cat = req.body.categories
			var image = "hi"
			data.title = title
			data.disc = disc 
			data.duration= duration
			data.expired = expired
			data.lat= lat
			data.lng = lng
			data.cat=cat
			if(ret.length!=0)
				data.userId = ret[0].name

			op.addItem(data,function(err,id){
				if(err){
					console.log("error "+err)

				}
				else
				{
					fs.writeFile(__dirname+'/public/'+id+'.txt',image,function(err){
						if (err){
							console.log("cant write file ")
							res.sendStatus(500)
						}
						else{
							console.log("ok")
							var u = id
							var d = {"url":u,"_id":id}
							op.updateItemTable(d,function(err,ret){
								if(err){
									console.log("error")
								}
								else{
									res.send('OK')
								}
							})
							
						}
					})
				}
		})
			}
	})
	
})
app.get('/getItem',function(req,res){
	console.log("in getitem")
	var x = req.query.lat
	var y = req.query.lng
	op.findItem(req.query,function(err,data){
		res.send(data)
		
	})
})
app.get('/getUserItems',function(req,res){
	op.fundUserItems(req.headers.cookies,function(err,data){
		if (err){
			res.sendStatus(404)
		}
		else
		{
			res.send(data)
		}
	})

})
function check(req,res,next){
	console.log("in check")
	console.log(req.url)
	if (req.url=='/login'||req.url=='/signup'){
		// console.log("aslasdasdasdasajsdask")
		next()
	}
	var cookie = req.headers.cookies
	op.checkCookie(cookie,function(err,ret){
		if(err){
			console.log("unAuthorized")
			res.sendStatus(401)
		}
		else
		{
			next()
		}
	})
}
// app.
app.listen(1234)




