'use strict'

const Schema = use('Schema')

class MessagesTableSchema extends Schema {

  up () {
    this.create('messages', (table) => {
      table.increments()
      table.timestamps()
      table.interger('sender_id')
      table.interger('recipient_id')
      table.text('content')
    })
  }

  down () {
    this.drop('messages')
  }

}

module.exports = MessagesTableSchema
