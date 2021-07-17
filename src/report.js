const { getTrips, getVehicle, getDriver } = require('api');

// const { drives } = require('./driversTrip')
// import drives from './driversTrip'

/**
 * This function should return the data for drivers in the specified format
 *
 * Question 4
 *
 * @returns {any} Driver report data
 */
async function driverReport() {
  // Your code goes here
  
  let trips = await getTrips()
  let driversFromTrips = {}, driversReport = [], driverDetails
  trips.map((trip,index) =>{
    let amount = +String(trip.billedAmount).replace(',','')
    if(driversFromTrips[trip.driverID]){
        trip.isCash ? driversFromTrips[trip.driverID]['cashTrip'] += 1 : driversFromTrips[trip.driverID]['nonCashTrip'] += 1
        driversFromTrips[trip.driverID]['amount'] += amount
        driversFromTrips[trip.driverID]['trips'].push({
          'user' : trip.user.name,
          'created' : trip.created,
          'pickup' : trip.pickup.address,
          'destination' : trip.destination.address,
          'billed' : trip.billedAmount,
          'isCash' : trip.isCash
        })
    }else{
        if(trip.isCash){
          driversFromTrips[trip.driverID] = {
              'cashTrip' : 1,
              'nonCashTrip' : +0,
              //'cashAmount' : +amount
          }
        }else{
          driversFromTrips[trip.driverID] = {
              'cashTrip' : +0,
              'nonCashTrip' : 1,
              //'nonCashAmount' : +amount
          }
        }
        driversFromTrips[trip.driverID]['amount'] = amount
        driversFromTrips[trip.driverID]['trips'] = [{
          'user' : trip.user.name,
          'created' : trip.created,
          'pickup' : trip.pickup.address,
          'destination' : trip.destination.address,
          'billed' : trip.billedAmount,
          'isCash' : trip.isCash
        }]
    }

  })

  let driverPromises = [], driversInfo

  for(key in driversFromTrips){
    driverPromises.push(getDriver(key))
  }
  driversInfo = await Promise.allSettled(driverPromises)

  try{
    let i = 0
    for(key in driversFromTrips){
      let driver
      driver = driversInfo[i].value
      let vehicles = [], vehiclesPromises = [], vehiclesInfo
      for(id of driver.vehicleID){
        vehiclesPromises.push(getVehicle(id))
      }
      vehiclesInfo = await Promise.all(vehiclesPromises)
      for(vehicle of vehiclesInfo){
        vehicles.push({
              plate : vehicle.plate,
              manufacturer: vehicle.manufacturer
            })
      }
      driverDetails = {
        "fullName": driver.name,
        "id": key,
        "phone": driver.phone,
        "noOfTrips": driversFromTrips[key].trips.length,
        "noOfVehicles": driver.vehicleID.length,
        "vehicles": vehicles,
        "noOfCashTrips": driversFromTrips[key].cashTrip,
        "noOfNonCashTrips": driversFromTrips[key].nonCashTrip,
        "totalAmountEarned": driversFromTrips[key].amount.toFixed(2),
        "trips": driversFromTrips[key].trips
      }

      driversReport.push(driverDetails)
      i++
    }
  }catch(error){
    console.log(error)
  }

  driversReport
  return driversReport

}

driverReport()

module.exports = driverReport;
