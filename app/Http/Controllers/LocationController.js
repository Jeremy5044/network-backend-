'use strict'
const User = use('App/Model/User')
const Location = use('App/Model/Location')

class LocationController {

  * post(request, response) {
 let data = request.only('latitude', 'longitude')
 let user = request.authUser
 let loc = yield user.location(data)
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
