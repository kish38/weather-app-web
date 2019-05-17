const path = require("path")
const express = require('express')
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/weather")
// console.log(__dirname)
// console.log(path.join(__dirname, '..', 'public'))

const app = express()
const port = process.env.PORT || 3000

const publicDPath = path.join(__dirname, '..', 'public')
const viewsPath = path.join(__dirname, '..', 'templates/views')
const partialsPath = path.join(__dirname, '..', 'templates/partials')

app.use(express.static(publicDPath))

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Kishore'
    })
})
app.get("/about", (req, response)=>{
    response.render('about', {
        title: "About Page",
        about: "This is Kishore Kumar",
        name: 'Kishore'
    })
})

app.get("/weather", (req, res)=>{
    if (!req.query.address){
        return res.send({
            "error": "You must provide address"
        })
    }
    const creds = {weather_api_key: "b78128e88cf3601a5401b90f9f277787"}
    geocode(creds, req.query.address, (error, {latitude, longitude, location})=>{
        if (error){
            return res.send({ error })
        }
        forecast(creds, {latitude, longitude}, (error, forecastData)=>{
            if (error){
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })   
        })
    })
    // res.render('weather', {
    //     title: "Weather & ForeCast",
    //     name: 'Kishore',
    //     address: req.query.address
    // })
})


app.get("/help/*", (req, res)=>{
    res.render('404', {
        title: "404 Help",
        errorMessage: "No Help Article Found"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404 Error",
        errorMessage: "Page Not Found"
    })
})
app.listen(port, ()=>{
    console.log("Server is up on port 3000")
})