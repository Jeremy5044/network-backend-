'use strict'
const User = use('App/Model/User')
const Location = use('App/Model/Location')

class LocationController {

  * post(request, response) {
    let data = request.only('lat', 'long')
    let user = request.authUser
    let location = yield Location.findBy('user_id', user.id)

    if (location) {
      location.fill(data) 
      yield location.save()
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

  * nearby (request, response) {
    let user = request.authUser
    // let distance = request.only('distance')
    let myLoc = yield user.location()
    let distanceQuery = `point(${myLoc.long}, ${myLoc.lat}) <@> point(lon, lat)::point`

    let nearby = yield Location.query()
      .select(distanceQuery).as('userDistance')
      .where('userDistance < 10').order('userDistance').fetch()

    response.status(200).json(nearby)

   }

}

module.exports = LocationController
