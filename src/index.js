const path = require("path")
const express = require('express')
const hbs = require("hbs")

// console.log(__dirname)
// console.log(path.join(__dirname, '..', 'public'))

const app = express()

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


app.get("/weather", (req, response)=>{
    response.render('weather', {
        title: "Weather & ForeCast",
        name: 'Kishore'
    })
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
app.listen(3000, ()=>{
    console.log("Server is up on port 3000")
})