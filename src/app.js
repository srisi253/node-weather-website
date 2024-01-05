const path = require('path') //No es necesario instalarlo
const express = require ('express') // para instalar express primero puse npm init -y y despues npm install express
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express ()

const port = process.env.PORT || 3000

//Define paths for Express confug
const publicDirectoryPath = path.join(__dirname, '../public') //Lo usa para ir a la carpeta de interes
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handlebars emgine and views location, Se instalo npm i hbs
app.set('view engine','hbs')
// app.set('views', path.join(__dirname, '../views'));
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath)) //Este es el que te muestra en el local host 3000, sin /algo??

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'Santiago Risi',
        message: 'Use this site to get your weather!'
    })
})
app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About me',
        name: 'Santiago Risi',
    })
})
app.get('/help', (req, res) =>{
    res.render('help', {
        helpText: 'This is a help Text',
        title: 'Help title',
        name: 'Santiago Risi',
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address',
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} ={}) => { //Poner los {} permite que no se rompa al no poner un valor valido para la location
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Santiago Risi'
    })
})

// Esta con el error tiene que ir siempre ultima
app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        errorMessage: 'Error, try again!',
        name: 'Santiago Risi'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + 3000)
})