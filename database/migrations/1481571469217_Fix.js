'use strict'

const Schema = use('Schema')

class FixTableSchema extends Schema {

  up () {
    this.table('users', (table) => {
       table.dropColumn('linkedin-url')
       table.string('linkedin')
       table.string('intrest')
    })
  }

  down () {
    this.table('users', (table) => {
      // opposite of up goes here
       table.string('linkedin-url')
       table.dropColumn('linkedin')
       table.dropColumn('intrest')
    })
  }

}

module.exports = FixTableSchema
