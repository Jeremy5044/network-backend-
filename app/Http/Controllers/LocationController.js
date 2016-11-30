'use strict'
const User = use('App/Model/User')
const Location = use('App/Model/Location')

class LocationController {

  * post(request, response) {
 let data = request.only('latitude', 'longitude')
 let users = request.authUser
 let loc = yield User.location()
  if (loc){
   loc.fill(data)
    yield loc.save();
    response.status(200).json(loc)

  }else{
    response.status(404).json(loc);
  }
 
    //
  }

 

}

module.exports = LocationController
