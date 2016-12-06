'use strict'
const User = use('App/Model/User')

const Lucid = use('Lucid')

class Message extends Lucid {
	user () {
    return this.belongsTo(User)
}

module.exports = Message
