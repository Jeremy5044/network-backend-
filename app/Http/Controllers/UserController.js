'use strict'

const Hash = use('Hash')

const User = use('App/Model/User')
const Location = use('App/Model/Location')

class UserController {

	* register (request,response){
      	let data = request.only('username','password','email','name','company','number','description','img','age','linkedin','intrest')
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
	let user = yield User.findBy('id', userId)
	// let users = yield user.users()

	response.json(user)
}
* delete (request,response){
 let userId = request.param('id')
  let user = yield User.findBy('id',userId)
  if(user) {
  	let deleteuser = yield User.query().where('id',userId).del()

 response.status(202).json({ User: "Page Deleted!" })

  }else{


  response.status(401).json({ User: "not working" })

}
}

* all(request,response){
	let locations = yield User.query().with('location').fetch()
	let user = request.authUser 
	if (user){
		response.status(201).json(location)
	}else{
		response.status(401).json({User:Error})
	}
 }


}

module.exports = UserController

