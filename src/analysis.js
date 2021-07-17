const { getTrips, getDriver, getVehicle } = require('api');
/**
 * This function should return the trip data analysis
 *
 * Question 3
 * @returns {any} Trip data analysis
 */
async function analysis() {
  // Your code goes here
  let trips = await getTrips()
  let drivers = {}

  trips.map((trip,index) =>{
    if(drivers[trip.driverID]){
        drivers[trip.driverID]['trip'] += 1
        drivers[trip.driverID]['amount'] += +String(trip.billedAmount).replace(',','')
    }else{
        drivers[trip.driverID] = {
            'trip' : 1,
            'amount' : +String(trip.billedAmount).replace(',','')
        }
    }
  })

  let driverPromise = [], driversInfo
  let mostTripsDriver,count = 0, highestEarner, totalAmount = 0

  try{
    for(key in drivers){
      if(drivers[key].trip > count){
          count = drivers[key].trip
          mostTripsDriver = key
      }
      if(drivers[key].amount > totalAmount){
          totalAmount = drivers[key].amount
          highestEarner = key
      }
      driverPromise.push(getDriver(key))
    }
  }catch(error){

  }
  driversInfo = await Promise.allSettled(driverPromise)

  let maxTripDriver = await getDriver(mostTripsDriver), higherstEarningDriver = await getDriver(highestEarner)

  let objectReport = {
    "noOfCashTrips": trips.filter(trip => trip.isCash).length,
    "noOfNonCashTrips": trips.filter(trip => !trip.isCash).length,
    "billedTotal": trips.reduce((sum,trip) => {
      sum += +String(trip.billedAmount).replace(',','')
      return +sum.toFixed(2)
    },0),
    "cashBilledTotal": trips.filter(trip => trip.isCash).reduce((sum,trip) => {
        sum += +String(trip.billedAmount).replace(',','')
        return +sum.toFixed(2)
      },0),
    "nonCashBilledTotal": trips.filter(trip => !trip.isCash).reduce((sum,trip) => {
      sum += +String(trip.billedAmount).replace(',','')
      return +sum.toFixed(2)
    },0),
    "noOfDriversWithMoreThanOneVehicle": driversInfo.filter(driver => driver.status === 'fulfilled').filter(driver => driver.value.vehicleID.length > 1).length,
    "mostTripsByDriver": {
      "name": maxTripDriver.name,
      "email": maxTripDriver.email,
      "phone": maxTripDriver.phone,
      "noOfTrips": count,
      "totalAmountEarned": drivers[mostTripsDriver].amount
    },
    "highestEarningDriver": {
      "name": higherstEarningDriver.name,
      "email": higherstEarningDriver.email,
      "phone": higherstEarningDriver.phone,
      "noOfTrips": drivers[highestEarner].trip,
      "totalAmountEarned": drivers[highestEarner].amount
    }
  }

  objectReport
  return objectReport
}

console.log(analysis())
module.exports = analysis;
