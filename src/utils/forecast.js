const request = require('request') //Tuve que instalar de nuevo npm i request para poder usarla porque en web-server no estaba instalada

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=cff48dad4cf190c0c764d1cfb3f06a78&query=' + latitude + ',' + longitude + '&units=f'
    // console.log('Received Latitude:', latitude);
    // console.log('Received Longitude:', longitude);
    request ({url, json: true}, (error, {body}) =>{ //Antes teniamos response en vez de body y sin las llaves, y en todos los lugares donde llamamos a body era response,body
        if (error){
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error){
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined,
                body.current.weather_descriptions[0]+ ', '+
                body.current.temperature + '°F,' +
                body.current.precip + ' %'
            )
        }
    })
}


module.exports = forecast