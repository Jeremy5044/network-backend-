'use strict'








const Env = use('Env')




module.exports = {

ally: {



	linkedin: {
		clientId: Env.get('Lk_CLIENT_ID'),

		clientSecret: Env.get('Lk_CLIENT_SECRET'),

		redirectUri: `${Env.get('APP_URL')}/linkedin/authenticated`
	}

}


}