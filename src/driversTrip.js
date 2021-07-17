const { getTrips} = require('api');

module.exports.driversTripsDetails = async function driverReport() {
  // Your code goes here
  
  let trips = await getTrips()
  let drivers = {}
  trips.map((trip,index) =>{
    let amount = +String(trip.billedAmount).replace(',','')
    //drivers[trip.driverID] ? drivers[trip.driverID] += 1 : drivers[trip.driverID] = 1
    if(drivers[trip.driverID]){
        if(trip.isCash){
          drivers[trip.driverID]['cashTrip'] += 1
          //drivers[trip.driverID]['cashAmount'] += +amount
          // console.log(drivers[trip.driverID]['cashAmount'])
        }else{
          drivers[trip.driverID]['nonCashTrip'] += 1
          //drivers[trip.driverID]['nonCashAmount'] += +amount
          // console.log(drivers[trip.driverID]['nonCashAmount'])
        }
        drivers[trip.driverID]['amount'] += amount
        drivers[trip.driverID]['trips'].push({
          'user' : trip.user.name,
          'created' : trip.created,
          'pickup' : trip.pickup.address,
          'destination' : trip.destination.address,
          'billed' : trip.billedAmount,
          'isCash' : trip.isCash
        })
    }else{
        if(trip.isCash){
            drivers[trip.driverID] = {
              'cashTrip' : 1,
              'nonCashTrip' : +0,
              //'cashAmount' : +amount
          }
          // console.log(drivers[trip.driverID]['cashAmount'])
        }else{
            drivers[trip.driverID] = {
              'cashTrip' : +0,
              'nonCashTrip' : 1,
              //'nonCashAmount' : +amount
          }
          // console.log(drivers[trip.driverID]['nonCashAmount'])
        }
        drivers[trip.driverID]['amount'] = amount
        drivers[trip.driverID]['trips'] = [{
          'user' : trip.user.name,
          'created' : trip.created,
          'pickup' : trip.pickup.address,
          'destination' : trip.destination.address,
          'billed' : trip.billedAmount,
          'isCash' : trip.isCash
        }]
    }

  })

  drivers
  return drivers

}

// export default drives