// This is the .on("click") function of the main search button
$("#search-button").on("click", function (event) {

    // This prevents page reload
    event.preventDefault();

    //This clears the today and forecast sections before printing new query results
    $("#today").html("")
    $("#forecast").html("")

    // This builds the URL to query the database about the geographical coordinates of user selected location 
    var APIKey = "f330e129449abaac86bd926a76054f1f";
    var city = $('#search-input').val();
    var geoQueryUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + APIKey

    //AJAX call to get the data from the geoQueryUrl above.
    $.ajax({
        url: geoQueryUrl,
        method: "GET"
    }).then(function (geoResponse) {

        // Assigning lat and lon from resulting object to variables and reducing to two digits after coma, to be used in next query URL
        var latitude = (geoResponse[0].lat).toFixed(2)
        var longitude = (geoResponse[0].lon).toFixed(2)

        // building the new url for the query, this time about the weather forecast, using coordinates received above
        var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey

       
        //AJAX call to get the data about weather forecast
        $.ajax({
            url: forecastQueryURL,
            method: "GET"
        }).then(function (forecastResponse) {

            console.log(forecastQueryURL);
            console.log(forecastResponse);

            //Variable for current date
     
            var currentDate = moment().format("DD/MM/YYYY"); 

            // Variables for current temp, wind and humidity
            var temp = ((forecastResponse.list[0].main.temp) - 273.15).toFixed(2)
            var wind = (forecastResponse.list[0].wind.speed).toFixed(1)
            var humidity = (forecastResponse.list[0].main.humidity)

            //^TODAY SECTION

            // Code to generate weather icon
            var iconCode = forecastResponse.list[0].weather[0].icon;
            var icon = $('<img>');
            icon.attr({
                'id': 'icon',
                'src': "https://openweathermap.org/img/wn/" + iconCode + ".png"
            });

            //Generate a div holding today weather info

            var todayCard = $("<div>");
            todayCard.addClass("today-card-body");
            var todayHeaderDiv = $("<div>");
            todayHeaderDiv.css("display", "flex")
            todayHeaderDiv.append("<h2>" + city + " ( " + currentDate + ")" + " </h2>")
                .append(icon)

            todayCard.append("<p>Temp: " + temp + " &deg;C</p>")
                .append("<p>Wind: " + wind + " KPH</p>")
                .append("<p>Humidity: " + humidity + " %</p>");
            todayCard.prepend(todayHeaderDiv)
            $("#today").append(todayCard);

            
            //^FORECAST SECTION

      
              //A loop to generate cards holding weather forecast with date headings
              for (var i = 0; i < 5; i++) {
                var futureDate = moment().add(i+1, 'days').format("DD/MM/YYYY");
                var forecastCard = $("<div>");
                forecastCard.addClass("forecast-card-body");
                forecastCard.append("<h4>" + futureDate + " </h4>")
                $("#forecast").append(forecastCard);
            }




            for (var i = 7; i < forecastResponse.list.length; i+=8) {
                var futureIconCode = forecastResponse.list[i].weather[0].icon;
                console.log(futureIconCode);
                  var futureIcon = $('<img>');
                futureIcon.attr({
                    'id': 'icon',
                    'src': "https://openweathermap.org/img/wn/" + futureIconCode + ".png"     
                });

            console.log(futureIcon);
            }



              for (var i = 0; i < 5; i++) { 

                var forecastCard = $("<div>");
                
                    forecastCard.append(futureIcon)
                
                }
                 
            

                
        
          


    
                // .append("<p>Temp: " + temp + " °C</p>")
                // .append("<p>Wind: " + wind + " KPH</p>")
                // .append("<p>Humidity: " + humidity + " %</p>");
              



                
                // var futureIconCode = forecastResponse.list[i].weather[0].icon;
                // var futureIcon = $('<img>');
                // futureIcon.attr({
                //     'id': 'icon',
                //     'src': "https://openweathermap.org/img/wn/" + futureIconCode + ".png"
                // });

                
                // var futureIconCode = forecastResponse.list[i].weather[0].icon;
                // var futureIcon = $('<img>');
                // futureIcon.attr({
                //     'id': 'icon',
                //     'src': "https://openweathermap.org/img/wn/" + futureIconCode + ".png"
                // });


     
            // //Appending icons to forecast cards. 
            // var iconCode1 = forecastResponse.list[5].weather[0].icon;
            // var iconCode2 = forecastResponse.list[13].weather[0].icon;
            // var iconCode3 = forecastResponse.list[21].weather[0].icon;
            // var iconCode4 = forecastResponse.list[29].weather[0].icon;
            // var iconCode5 = forecastResponse.list[37].weather[0].icon;

            // var icon = $('<img>');
            // icon.attr({
            //     'id': 'icon',
            //     'src': "https://openweathermap.org/img/wn/" + iconCode1 + ".png"
            // });

            // $("#day1").append(icon)

            // var icon = $('<img>');
            // icon.attr({
            //     'id': 'icon',
            //     'src': "https://openweathermap.org/img/wn/" + iconCode2 + ".png"
            // });

            // $("#day2").append(icon)

            // var icon = $('<img>');
            // icon.attr({
            //     'id': 'icon',
            //     'src': "https://openweathermap.org/img/wn/" + iconCode3 + ".png"
            // });

            // $("#day3").append(icon)

            // var icon = $('<img>');
            // icon.attr({
            //     'id': 'icon',
            //     'src': "https://openweathermap.org/img/wn/" + iconCode4 + ".png"
            // });

            // $("#day4").append(icon)

            // var icon = $('<img>');
            // icon.attr({
            //     'id': 'icon',
            //     'src': "https://openweathermap.org/img/wn/" + iconCode5 + ".png"
            // });

            // $("#day5").append(icon)


            // // Appending temperature to forecast cards

            // var temp1 = ((forecastResponse.list[5].main.temp) - 273.15).toFixed(2)

            // var weatherDiv = $("<div>")
            // weatherDiv.css("marginBottom", "5px")
            // weatherDiv.html("Temp: " + temp1 + " &deg;C")
            // $("#day1").append(weatherDiv)

            // var temp1 = ((forecastResponse.list[13].main.temp) - 273.15).toFixed(2)

            // var weatherDiv = $("<div>")
            // weatherDiv.css("marginBottom", "5px")
            // weatherDiv.html("Temp: " + temp1 + " &deg;C")
            // $("#day2").append(weatherDiv)

            // var temp1 = ((forecastResponse.list[21].main.temp) - 273.15).toFixed(2)

            // var weatherDiv = $("<div>")
            // weatherDiv.css("marginBottom", "5px")
            // weatherDiv.html("Temp: " + temp1 + " &deg;C")
            // $("#day3").append(weatherDiv)

            // var temp1 = ((forecastResponse.list[29].main.temp) - 273.15).toFixed(2)

            // var weatherDiv = $("<div>")
            // weatherDiv.css("marginBottom", "5px")
            // weatherDiv.html("Temp: " + temp1 + " &deg;C")
            // $("#day4").append(weatherDiv)

            // var temp1 = ((forecastResponse.list[37].main.temp) - 273.15).toFixed(2)

            // var weatherDiv = $("<div>")
            // weatherDiv.css("marginBottom", "5px")
            // weatherDiv.html("Temp: " + temp1 + " &deg;C")
            // $("#day5").append(weatherDiv)


            // // Appending wind to forecast cards
            // var wind = (forecastResponse.list[5].wind.speed).toFixed(1)

            // var weatherDiv = $("<div>")
            // weatherDiv.css("marginBottom", "5px")
            // weatherDiv.html("Wind: " + wind + " KPH")
            // $("#day1").append(weatherDiv)

            // var wind = (forecastResponse.list[13].wind.speed).toFixed(1)

            // var weatherDiv = $("<div>")
            // weatherDiv.css("marginBottom", "5px")
            // weatherDiv.html("Wind: " + wind + " KPH")
            // $("#day2").append(weatherDiv)

            // var wind = (forecastResponse.list[21].wind.speed).toFixed(1)

            // var weatherDiv = $("<div>")
            // weatherDiv.css("marginBottom", "5px")
            // weatherDiv.html("Wind: " + wind + " KPH")
            // $("#day3").append(weatherDiv)

            // var wind = (forecastResponse.list[29].wind.speed).toFixed(1)

            // var weatherDiv = $("<div>")
            // weatherDiv.css("marginBottom", "5px")
            // weatherDiv.html("Wind: " + wind + " KPH")
            // $("#day4").append(weatherDiv)

            // var wind = (forecastResponse.list[37].wind.speed).toFixed(1)

            // var weatherDiv = $("<div>")
            // weatherDiv.css("marginBottom", "5px")
            // weatherDiv.html("Wind: " + wind + " KPH")
            // $("#day5").append(weatherDiv)

            // // Appending humidity to forecast cards
            // var humidity = (forecastResponse.list[5].main.humidity)

            // var weatherDiv = $("<div>")
            // weatherDiv.css("marginBottom", "5px")
            // weatherDiv.html("Humidity: " + humidity + " %")
            // $("#day1").append(weatherDiv)

            // var humidity = (forecastResponse.list[13].main.humidity)

            // var weatherDiv = $("<div>")
            // weatherDiv.css("marginBottom", "5px")
            // weatherDiv.html("Humidity: " + humidity + " %")
            // $("#day2").append(weatherDiv)

            // var humidity = (forecastResponse.list[21].main.humidity)

            // var weatherDiv = $("<div>")
            // weatherDiv.css("marginBottom", "5px")
            // weatherDiv.html("Humidity: " + humidity + " %")
            // $("#day3").append(weatherDiv)

            // var humidity = (forecastResponse.list[29].main.humidity)

            // var weatherDiv = $("<div>")
            // weatherDiv.css("marginBottom", "5px")
            // weatherDiv.html("Humidity: " + humidity + " %")
            // $("#day4").append(weatherDiv)

            // var humidity = (forecastResponse.list[37].main.humidity)

            // var weatherDiv = $("<div>")
            // weatherDiv.css("marginBottom", "5px")
            // weatherDiv.html("Humidity: " + humidity + " %")
            // $("#day5").append(weatherDiv)


            //TODO: Create a loop for creating cards
            //TODO: Create code making new button each time user types in search and clicks the button. 
            //TODO: Make sure the city name is displayed with a capital letter.
        })
    });


    //& Example icon url: http://openweathermap.org/img/wn/04n@2x.png.
    //& Icon codes: https://openweathermap.org/weather-conditions

})