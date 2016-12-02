'use strict'

const User = use('App/Model/User')
const Location = use('App/Model/Location')
const Database = use('Database')

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
    let myLoc = yield Location.findBy('user_id', user.id)
    let distanceQuery = `point(${myLoc.long}, ${myLoc.lat}) <@> point(long, lat)::point`

    let nearbyQuery = yield Database.raw(`SELECT *, ${distanceQuery} AS userDistance FROM locations
      WHERE ${distanceQuery} < 10 AND user_id <> ${user.id} ORDER BY userDistance`);
    console.log(nearbyQuery);

    let nearbyUsers = yield User.query().whereIn('id', nearbyQuery.rows.map(loc => loc.user_id)).fetch()

    console.log(nearbyUsers)

    let result = nearbyUsers.map(function (user) {
      let location = nearbyQuery.rows.find(loc => loc.user_id === user.id)
      user.location = location
    }).value()

    console.log(result)

    // let nearby = yield Location.query()
    //   .select(distanceQuery).as('userDistance')
    //   .where('userDistance < 10').order('userDistance')

    // let nearby = yield Database.select('*', distanceQuery).from('locations').whereRaw('userDistance < ?', [10])

    response.status(200).json(result)

   }

}

module.exports = LocationController
