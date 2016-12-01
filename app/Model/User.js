'use strict'

const Lucid = use('Lucid')


class User extends Lucid {
	

	static get hidden(){
		return ['password']
	}

  apiTokens () {

    return this.hasMany('App/Model/Token')
  }

 location(){
  return this.hasOne('App/Model/Location')

}
}
module.exports = User

