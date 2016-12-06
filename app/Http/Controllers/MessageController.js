'use strict'

const Message = use('App/Model/Message')
const Database = use('Database')

class MessageController {
	* index (request, response){
		 let user = request.authUser
		 let userIds = yield Database.table('messages').distinct('recipient_id').where('sender_id',user.id) 
		 response.status(200).json(userIds)

	  
	}

	* post (request, response){
		let data = request.only('recipient_id','content','sender_id')
		let user = request.authUser
		let message = yield Message.create(data)


	  	response.status(200).json(message)
	
	    

	}


    * show (request, response){
    	let friend_id = request.param('friend_id')
    	let user = request.authUser
    	let message = yield Message().whereRaw("(sender_id = ? AND recipient_id = ?) OR (sender_id = ? AND recipient_id = ?)",
    		[user.id, friend_id, friend_id, user.id]).orderBy('created_at','desc')

    	response.status(200).json(message)

    }





}

module.exports = MessageController
