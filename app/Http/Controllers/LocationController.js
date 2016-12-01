'use strict'
const User = use('App/Model/User')
const Location = use('App/Model/Location')

class LocationController {

  * post(request, response) {
    let data = request.only('latitude', 'longitude')
    let user = request.authUser
    let location = yield user.location.fetch()

    if (location.length) {
      console.log('location is   ', location)
      user.location().fill(data) 
      yield user.location().save()
    } else {
      location = yield user.location().create(data)
    }

    response.status(201).json(location)
  }

//  *update(request, response){
//  let location_id = request.param('id')
//  let data = request.only('latitude', 'longitude')
//  let user = request.authUser

 
//  let loc = yield user.location()
//   if (loc){
//    loc.fill(data)
//     yield loc.save();
//     response.status(200).json(loc)

//   }else{
//     response.status(404).json(loc);
//   }
//  }
  * grab(request, response){
    let id = request.param('id')
    let user = yield User.find(id)
    let loc = user.location()

    response.status(200).json(loc)
  }

}

module.exports = LocationController
