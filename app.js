const express = require('express');
const https = require('https');

const app = express();

app.get("/",function (req,res) {
    
const url = "https://api.openweathermap.org/data/2.5/weather?q=sikar&appid=4c3c6afd85f94ebf17f5d255f3211dcb&units=metric";

    https.get(url,function (response) {
        //Status Code
        console.log(response.statusCode);

        response.on("data",function (data) {

           const weatherData= JSON.parse(data);
           var temp = weatherData.main.temp;
           var description = weatherData.weather[0].description.charAt(0).toUpperCase()+weatherData.weather[0].description.slice(1);
           var icon = weatherData.weather[0].icon;
           var iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
           

           res.send(` <div style="display: flex; flex-direction: row">
    <img src="${iconURL}" alt="" />
    <div style="margin-left: 2%;">
      <p id="temp" style="font-weight: 600;font-size: 2.3rem;">Temprature : ${temp}°C</p>
      <p id="desc" style="font-weight: 550;font-size: 1.3rem;">The Weather is Currently ${description}</p>
    </div>
  </div>`); 

           
    });

    });
    
    // res.send("Server setup finally");
})


app.listen(3000,function () {
    console.log("Server is running on port 3000");
})