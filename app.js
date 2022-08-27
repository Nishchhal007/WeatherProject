const express = require('express');
const https = require('https');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function (req,res) {

  res.sendFile(__dirname+"/index.html");
})


app.post("/",function (req,res){
  var city = req.body.cityName;
  city = city.charAt(0).toUpperCase()+city.slice(1);
  const api_key = "4c3c6afd85f94ebf17f5d255f3211dcb";
  const unit = "metric";
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=${unit}`;
  
    https.get(url,function (response) {
          //Status Code
          console.log(response.statusCode);
  
      response.on("data",function (data) {
  
            //Data to display

             const weatherData= JSON.parse(data);
             var temperature = weatherData.main.temp;
             var description = weatherData.weather[0].description.charAt(0).toUpperCase()+weatherData.weather[0].description.slice(1);
             var feelsLike = weatherData.main.feels_like;
             var MaxTemp = weatherData.main.temp_max;
             var MinTemp = weatherData.main.temp_min;
             var humidity = weatherData.main.humidity;
             var pressure = weatherData.main.pressure;
             var visibility = weatherData.visibility/1000;
             var windSpeed = weatherData.wind.speed;
             var winddeg = weatherData.wind.deg;
             var location = weatherData.sys.country;

            //Icon for weather

             var icon = weatherData.weather[0].icon;
             var iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            
  
             res.send(`<!DOCTYPE html>
             <html lang="en">
               <head>
                 <meta charset="UTF-8" />
                 <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                 <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                 <link rel="preconnect" href="https://fonts.googleapis.com">
             <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
             <link href="https://fonts.googleapis.com/css2?family=Baloo+Bhai+2&display=swap" rel="stylesheet">
                 <link rel="stylesheet" href="style.css">
             
                 <title>Live Weather</title>
               </head>
               <body>
                 <div class="container" style="margin: 5% 25%;font-family: cursive;">
                   <h1 style="text-align: center;">${city} Forecast Today!</h1>
                   <div id="info" style="display: flex;flex-direction: row;align-items: center;justify-content: center;">
                     <img src="${iconURL}" alt="" />
                     <div style="margin-left: 2%">
                       <p id="temp" style="font-weight: 600; font-size: 2.3rem">
                         ${temperature}°C
                       </p>
                       <p id="desc" style="font-weight: 550; 
                       font-size: 1.3rem">
                         ${description}
                       </p>
                     </div>
                   </div>
                   <div id="moreDetails" style="display: flex;flex-direction: column;align-items: center;justify-content: center;">
                     <h2>Weather Details</h2>
                     <div id="details" style="display: flex;flex-direction: row;">
                       <div id="firstCol" style="margin-right: 20px;">
                         <p class="details">Temprature : ${temperature}°C</p>
                         <p class="details">Max Temp : ${MaxTemp}°C</p>
                         <p class="details">Pressure : ${pressure}hPa</p>
                         <p class="details">Visibility : ${visibility}km</p>
                         <p class="details">Wind speed : ${windSpeed}km/h</p>
                       </div>
                       <div id="secCol" style="margin-left: 20px;">
                         <p class="details">Feels like : ${feelsLike}°C</p>
                         <p class="details">Min Temp : ${MinTemp}°C</p>
                         <p class="details">Humidity : ${humidity}%</p>
                         <p class="details">Wind deg : ${winddeg}°</p>
                         <p class="details">Location : ${location}</p>
                       </div>
                     </div>
                   </div>
                 </div>
               </body>
             </html>
             `); 
     
      });

    });
      
});

app.listen(3000,function () {
    console.log("Server is running on port 3000");
})
