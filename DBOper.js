var userTable = require('./userTable.js')
var itemsTable = require('./itemsTable.js')
var math = require('mathjs')
var addUser =function(data,callback){
	var userName = data.name

	var email = data.email
	var password = data.password
	var cookie =String(data.cookie)
	console.log(String(cookie))
	var userToadd = new userTable({
		Email:email,
		pass:password,
		name:userName,
		cookies:cookie
	})
	userToadd.save(function(err){
		if(err){
			console.log(err+"errororororo")
			callback(err)
		}

		else{
			callback(null)
		}

	});


}
var findByEmail =function(data,callback){
	var email = data.email
	console.log(email)
	userTable.find({Email:email},function(err,data){
		if(err){
			console.log("error")
		}
		else
		{
			if (data==null || data.length==0){
				console.log("user not exist")
				callback(null,null)
			}
			else{
				console.log("user exist")
				callback(null,data)
			}
		}
	})
}
var findUser = function(db,data,callback){
	var email = data.email
	var password = data.password 
	console.log("email is "+email)
	console.log("password is "+password)
	userTable.find({Email:email,pass:password},function(err,d){
		if(err){
			callback(err)
		}
		else{
			if (d ==undefined || d.length==0){
				console.log("data undifined")
				callback(null,null)
			}
			else
			{
				callback(null,d)
			}
		}
	})

}
var checkCookie = function(data,callback){
	userTable.find({cookies:data},function(err,data){
		if (err){
			console.log("error is "+err)
			callback(err)
		}
		else{
			if (data ==null || data.length==0){
				callback(new Error("no user"))
			}
			else
			{
				callback(null,data)
			}
		}
	})
}
var addItem = function(data,callback){
	
	var item = new itemsTable.item({
		title:data.title,
		disc:data.disc,
		duration:data.duration,
		expired:data.expired,
		lat:data.lat,
		lng:data.lng,
		categories:data.cat,
		userId:data.userId
	})
	item.save(function(err,data){
		if (err){
			console.log("db error "+err)
			callback(err)
		}
		else
		{
			// console.log(data)
			callback(null,data._id)
		}
	})
}
var updateItemTable = function(data,callback){
	var id = data._id
	var url =data.url
	itemsTable.item.update({_id:id},{$set:{imageUrl:url}},function(err,data){
		if (err){
			callback(null)

		}
		else
		{
			callback(null,data)
		}
	})
}
function CalcDistanceBetween(lat1, lon1, lat2, lon2) {
    //Radius of the earth in:  1.609344 miles,  6371 km  | var R = (6371 / 1.609344);
    var R = 3958.7558657440545; // Radius of earth in Miles 
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1); 
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    return d;
}

function toRad(Value) {
    /** Converts numeric degrees to radians */
    return Value * Math.PI / 180;
}
var findItem = function(data,callback){
	var lat = data.lat
	var lng = data.lng
	console.log(lat,lng)
	var dataToreturn =[]
	var j=0;
	itemsTable.item.find({},function(err,ret){
		for (var i=0;i<ret.length;i++){
			if(ret[i].lat!=null && ret[i].lng!=null){
				var x = ret[i].lat
				var y = ret[i].lng
	 			var diffX = x-lat
		 	// 	var diffY = y-lng
				// var disty =math.pow(diffY,2)
		 	// 	var distx =math.pow(diffX,2)
		 	// 	var dis=math.pow(distx+disty,0.5)
		 		var dis = CalcDistanceBetween(x,y,lat,lng)
		 		if (dis <5){
		 			 // fundUserById(ret[i].userId,function(err,collDa){
		 			 // 	if(err){

		 			 // 	}
		 			 // 	else
		 			 // 	{
		 			 // 		console.log("data datd data is "+collDa)
		 			 // 		ret[i].name = collDa.name
		 			 		// ret[i].distance = dis
		 			 		dataToreturn[j]=ret[i]

		 			 		dataToreturn[j].distance = dis
		 			 		// console.log("data is is is "+dataToreturn[j])
				 			j=j+1
		 			 // 	}
		 			 // })
		 			 // userTable.find({_id:ret[i].userId},function(err,d){
		 			 	// if(err){
		 			 		// console.log("error to find user")
		 			 	// }
		 			// 	else
		 			// 	{
		 			// 		console.log(ret[i])
		 			// 		console.log("d is "+d)
		 					// ret[i].name=d.name
				 			
		 				// }
		 			// })

		 		}
			}	
		}
		callback(null,dataToreturn)
	})
}
var fundUserById = function(id,collback){
	userTable.find({_id:id},function(err,data){
		if(err){
			console.log("cant find user with id"+id)
			collback(err,null)
		}
		else
		{
			collback(null,data)
		}
	})
}
var fundUserItems = function (cookie,collback){
	userTable.find({cookies:cookie},function(err,data){
		if(err){
			console.log("error")
			collback(new Error("error"))
		}
		else{
			itemsTable.item.find({userId:data[0].name},function(err,d){
				if(err){
					console.log("error")
					collback(new Error("error"))
				}
				else{
					if(d!=null &&d.length!=0){
						collback(null,d)
					}
				}
			})
		}
	})
}
module.exports.fundUserItems=fundUserItems
module.exports.fundUserById=fundUserById
module.exports.updateItemTable=updateItemTable
module.exports.findByEmail = findByEmail
module.exports.findItem =findItem
module.exports.addItem = addItem
module.exports.checkCookie = checkCookie
module.exports.addUser = addUser
module.exports.findUser = findUser










