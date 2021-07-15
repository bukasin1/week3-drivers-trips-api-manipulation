# API

The api module exposes the following function

```
getTrips - To get all trips.
getDriver - To get information for a driver
getVehicle - To get vehicle information
```

These functions return promises.

The `getDriver` and `getVehicle` function may throw if given an ID that is unrecognized

## Usage

### getTrips

```js
getTrips();
```

Returns all trips that recorded.
Note that some drivers may not have their information already recorded as a result of data loss.

### getDriver

```js
getDriver(driverID);
```

Returns information about the driver with the specified `id` of the format

```json
{
  "vehicleID": [
    "1955476f-038e-4119-bae5-fcd8673bc95a",
    "7a4c337b-84c5-45ba-b660-162862b8bc23"
  ],
  "name": "Jane Doe",
  "gender": "female",
  "agent": "Hiring Agent",
  "email": "john@doe.com",
  "phone": "+234 800-000-0000",
  "DOB": "1991-01-30T05:03:47+01:00",
  "address": "Decagon, Traditions Building, Igbo Efon, Lagos"
}
```

The vehicle ID field contains the ids of the vehicles that has been assigned to the driver.

If the ID of the driver is not found, `getDriver` throws `Driver not found` error.
In some scenarios, you should still include that driver in the analysis and report but elide the name and vehicle information.

### getVehicle

```js
getVehicle(vehicleID);
```

Returns information about the vehicle with the id specified of the format

```json
{
  "manufacturer": "Ducati",
  "plate": "EPE-5000-LG",
  "acquired": "2018-10-02T03:30:45+01:00",
  "acquiredNew": true
}
```

If the ID of the vehicle is not found, `getVehicle` throws `Vehicle not found` error.
