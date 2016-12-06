'use strict'

const Schema = use('Schema')

class MessagesTableSchema extends Schema {

  up () {
    this.table('messages', (table) => {
      // alter messages table
    })
  }

  down () {
    this.table('messages', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = MessagesTableSchema
