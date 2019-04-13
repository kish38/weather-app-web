const request = require('request')

const forecast = (creds, data, callback) => {

    // const url = "https://api.darksky.net/forecast/"+creds.weather_api_key+"/37.8267,-122.4233"
    const url = "https://api.darksky.net/forecast/"+creds.weather_api_key+"/" + encodeURI(data.latitude) + "," + encodeURI(data.longitude)

    request({url: url, json: true}, (error, {body}) => {
        if (error){
            callback("Unable to connect to weather servie", undefined)
        } else if (body.error){
            callback("Unable to find the location", undefined)
        } else{
            callback(undefined, body.daily.data[0].summary+" It is Currently "+ body.currently.temperature+ " degrees out. There is a "+body.currently.precipProbability+ '% chance of rain')
        }
    })

}

module.exports = forecast