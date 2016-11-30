'use strict'

const Schema = use('Schema')

class LocationsTableSchema extends Schema {

  up () {
    this.create('locations', (table) => {
      table.increments()
      table.timestamps()
      table.integer('user_id')
      table.decimal('latitude')
      table.decimal('longitude')
    })
  }

  down () {
    this.drop('locations')
  }

}

module.exports = LocationsTableSchema
