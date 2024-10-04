import express from "express"
import bodyParser from "body-parser"
import axios from "axios"
// request is for making api calls
// const request = require('request')
// import { request } from 'https';
// import  request from "request";
const app = express()
const apiKey = '2bb2b33d0301633d8a00e7790b0b6dbe';

// Just know that by using body-parser we can make use of the req.body object.
app.use(bodyParser.urlencoded({ extended: true }));

// express wont access to the css file by default  so we need to expose the following line of code
app.use(express.static('public'));
// This code allows us to access all of the static files within the ‘public’ folder.
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index.ejs',{weather:null,error:null});
})

app.post('/', async function (req, res) {
   let city = req.body.city;
   let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
   try {
    const response = await axios.get(url); // Making a GET request with Axios
    const weather = response.data; // Getting the data from the response

    if (weather.main === undefined) {
        res.render('index.ejs', { weather: null, error: 'Error, please try again' });
    } else {
        const weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index.ejs', { weather: weatherText, error: null });
    }
} catch (error) {
    res.render('index.ejs', { weather: null, error: 'Error, please try again' });
}
  })

app.listen(4000, function () {
  console.log('Example app listening on port 4000!')
})