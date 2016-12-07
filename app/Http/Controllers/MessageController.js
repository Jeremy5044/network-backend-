'use strict'

const Message = use('App/Model/Message')
const Database = use('Database')

class MessageController {
	* index (request, response){
		 let user = request.authUser
		 let sentTo = yield Database.from('messages').where('sender_id', user.id).distinct('recipient_id').pluck('recipient_id')
		 let sentFrom = yield Database.from('messages').where('recipient_id', user.id).distinct('sender_id').pluck('sender_id')

		 let user_ids = sentTo + sentFrom
		 console.log('ids : ', user_ids)
		 let users = yield Database.from('users').whereIn('id', user_ids)

		 response.status(200).json({ users: users })



	  
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
