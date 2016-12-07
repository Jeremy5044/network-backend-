'use strict'

const Message = use('App/Model/Message')
const Database = use('Database')

class MessageController {
	* index (request, response){
		 let user = request.authUser
		 let userIds = yield Database.select('users.id', 'users.username', 'users.name').from('users').
		 	.innerJoin('messages','messages.recipient_id','users.id')
		 	.distinct('messages.recipient_id').where('messages.sender_id',user.id)
		 response.status(200).json(userIds)



	  
	}

	* post (request, response){
		let data = request.only('recipient_id','content')
		let user = request.authUser
		data.sender_id = user.id
		let message = yield Message.create(data)


	  	response.status(200).json(message)
	
	    

	}


    * show (request, response){
    	let friend_id = request.param('friend_id')
    	let user = request.authUser
    	let message = yield Message.query().whereRaw("sender_id = ? AND recipient_id = ? OR sender_id = ? AND recipient_id = ?",
    		[user.id, friend_id, friend_id, user.id]).orderBy('created_at','desc').fetch()

    	response.status(200).json(message)

    }





}

module.exports = MessageController
