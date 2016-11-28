'use strict'

const Schema = use('Schema')

class UsersTableSchema extends Schema {

  up () {
    this.create('users', table => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('name')
      table.string('company')
      table.string('number')
      table.text('description')
      table.string('img')
      table.string('age')
      table.string('linkedin-url')
      table.timestamps()

    })
  }

  down () {
    this.drop('users')
  }

}

module.exports = UsersTableSchema
