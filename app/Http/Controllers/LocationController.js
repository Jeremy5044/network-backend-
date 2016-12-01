'use strict'
const User = use('App/Model/User')
const Location = use('App/Model/Location')

class LocationController {

  * post(request, response) {
    let data = request.only('latitude', 'longitude')
    let user = request.authUser
    console.log(user)
    let loc = yield Location.create(data)
    response.status(201).json(loc)
  }

 *update(request, response){
 let location_id = request.param('id')
 let data = request.only('latitude', 'longitude')
 let user = request.authUser

 console.log(user)
 let loc = yield user.location()
  if (loc){
   loc.fill(data)
    yield loc.save();
    response.status(200).json(loc)

  }else{
    response.status(404).json(loc);
  }
 }

}

module.exports = LocationController
