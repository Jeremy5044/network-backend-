'use strict '

const Hash = use('Hash')

const User = use('App/Model/User')

class UserController {

	* register (request,response){
      	let data = request.only('username','password','email','name','company','number','description','img','age','linkedin-url')
      	data.password = yield Hash.make(data.password)

      	let user = yield User.create(data)

  	    response.status(201).json(user)
	
	}

	* login(request, response){
		let data = request.only('username','password')
		let user= yield User.findBy('username',data.username)
		console.log(user)	

		 try{
		 	let verify = yield Hash.verify(data.password,user.password)
		 	console.log(verify)
		 	if (!verify){ throw new Error();}

		 	console.dir(request.auth)

		 	let token = yield request.auth.generate(user)
		 	user.access_token = token

		 	response.json(user)
		   }catch (error){
		   	response.status(401).json({error:"Unidentified user or password"})

		 }

	}

	* index (request,response){
		let user_list = yield User.query().table('users')

		response.status(200).json(user_list)
	}

* show(request, response){
	let userId = request.param('id')
	console.log(userId)
	let user = yield User.findBy('id', userId)
	console.log(user)
	// let users = yield user.users()

	response.json(user)
}

}

module.exports = UserController

