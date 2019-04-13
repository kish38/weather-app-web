const request = require('request')

const geocode = (creds, address, callback) =>{
    
    const geocode_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token='+creds.geo_api_key+'&limit=1'
    request({url: geocode_url, json: true}, (error, {body}) => {
        if (error){
            callback("Unable to connect to weather servie", undefined)
        } else if (body.features.length === 0){
            callback("Unable to find the location. Try another search", undefined)
        } else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
            
        }
    })
    callback(undefined, geocode_url)
}

module.exports = geocode