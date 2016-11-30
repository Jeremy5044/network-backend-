'use strict'
const User = use('App/Model/User')
const Lucid = use('Lucid')

class Location extends Lucid {
	user () {
    return this.belongsTo(User)
  }
 

}

module.exports = Location
