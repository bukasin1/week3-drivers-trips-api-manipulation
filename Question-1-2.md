# Question

## Investor Meeting and Annual Driver Conference

Hello DecaDev,

The annual driver conference for Deca Rides is upcoming and during the event, we would like to showcase our most prolific drivers. The driver who has completed the most trips and the driver who has earned the highest on our platform.

Also, we'd be having a meeting with some investors in a while and we'd like to send them data for every driver on our platform, cleaned up of cruff, and simplified for analysis.

The data you require can be accessed via the API functions provided via `require('api')`
`NB: Do no modify files in the API folder`

As such, we'd like the trip data in the formats specified below

#### First, data for all trips. This should have

- Total Billed Amount for all trips
- Total Billed Amount for all trips that are cash.
  - This are trips with the `isCash` set to `true`
- Total Billed Amount for all trip that were not cash
  - This are trips with the `isCash` set to `false`
- No Of Cash Trips
- No of Non Cash Trips
- No of Drivers that have more than one vehicle
- Information for driver with the most trips
- Information for driver who has the highest earnings

A sample format is shown

```json
{
  "noOfCashTrips": 10,
  "noOfNonCashTrips": 20,
  "billedTotal": 123123,
  "cashBilledTotal": 1000,
  "nonCashBilledTotal": 1000,
  "noOfDriversWithMoreThanOneVehicle": 2,
  "mostTripsByDriver": {
    "name": "Driver name",
    "email": "Driver email",
    "phone": "Driver phone",
    "noOfTrips": 10,
    "totalAmountEarned": 1000
  },
  "highestEarningDriver": {
    "name": "Driver name",
    "email": "Driver email",
    "phone": "Driver phone",
    "noOfTrips": 10,
    "totalAmountEarned": 1000
  }
}
```

#### Second, for every driver on our platform...

We'd like a list populated with the driver information, their vehicles, and all the trips they have completed.

A sample format is shown

```json
[
  {
    "fullName": "Driver name",
    "id": "driver-id",
    "phone": "driver phone",
    "noOfTrips": 20,
    "noOfVehicles": 2,
    "vehicles": [
      {
        "plate": "vehicle plate no",
        "manufacturer": "vehicle manufacturer"
      }
    ],
    "noOfCashTrips": 5,
    "noOfNonCashTrips": 6,
    "totalAmountEarned": 1000,
    "totalCashAmount": 100,
    "totalNonCashAmount": 500,
    "trips": [
      {
        "user": "User name",
        "created": "Date Created",
        "pickup": "Pickup address",
        "destination": "Destination address",
        "billed": 1000,
        "isCash": true
      }
      // ,... {}, {}
    ]
  }
  // ,...{}, {}
]
```
