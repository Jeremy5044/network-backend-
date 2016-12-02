'use strict'

const Schema = use('Schema')

class SwitchLatlongTableSchema extends Schema {

  up () {
    this.table('locations', (table) => {
      table.dropColumn('longitude')
      table.dropColumn('latitude')
      table.float('lat') 
      table.float('long')
      table.index(['lat','long'])

    })
  }

  down () {
    this.table('locations', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = SwitchLatlongTableSchema
