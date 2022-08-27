const express = require('express');
const https = require('https');

const app = express();

app.get("/",function (req,res) {
    
const url = "https://api.openweathermap.org/data/2.5/weather?q=Sikar&appid=4c3c6afd85f94ebf17f5d255f3211dcb&units=metric";

    https.get(url,function (response) {
        console.log(response.statusCode);

        response.on("data",function (data) {
           const weatherData= JSON.parse(data);
           console.log(weatherData.weather[0].description);
           
        })

    })
    
    
    res.send("Server setup finally");
})


app.listen(3000,function () {
    console.log("Server is running on port 3000");
})