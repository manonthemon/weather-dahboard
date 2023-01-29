//Removes cards on load.
// $("#forecast").css("display", "none");

// This is the .on("click") function of the main search button
$("#search-button").on("click", function (event) {

    // This prevents page reload
    event.preventDefault();


    //This clears the today section before printing new query results

    $("#today").html("")
    

    //TODO : Resolve problem with cards stacking up 

   
    

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

            //This gets the icon code from the Ajax response and sets it to a new variable
            var iconCode = forecastResponse.list[0].weather[0].icon;

            //This ads an image and sets its src attribute to the URL of current icon
            var icon = $('<img>');
            icon.attr({
                'id': 'icon',
                'src': "https://openweathermap.org/img/wn/" + iconCode + ".png"
            });

            //This gets the current time and date from the Ajax response, removes the time and sets the date to a new variable.
            var currentDate = (forecastResponse.list[0]['dt_txt'].slice(0, -8));

            //This gets the current temperature from the Ajax response and sets it to new variable
            //It converts it to Celsius
            //It reduces it to two digits after comma
            var temp = ((forecastResponse.list[0].main.temp) - 273.15).toFixed(2)

            //This gets the current wind speed from Ajax response
            var wind = (forecastResponse.list[0].wind.speed).toFixed(1)

            //This gets the current humidity from Ajax response
            var humidity = (forecastResponse.list[0].main.humidity)

            //^TODAY SECTION
            // Creates a div for today weather and sets its styles
            //Creates a div for today header and sets its css display property and margin
            //Creates a H2 for today header text and adds its style
            //Sets text of new H2
            //Appends the today weather div to today section
            //Appends new header div the today weather div
            //Appends new H2 to new header div
            //Appends icon to new header div
            var todayDiv = $("<div>")
            todayDiv.css({ "border": "1.5px solid black", "padding": "5px", "width": "67rem" })
            var todayHeaderDiv = $("<div>")
            todayHeaderDiv.css({ "display": "flex", "marginBottom": "5px" })
            var todayH2 = $("<h2>")
            todayH2.css("fontWeight", "bold")
            todayH2.text(city + " ( " + currentDate + ')')
            $("#today").append(todayDiv)
            todayDiv.append(todayHeaderDiv)
            todayHeaderDiv.append(todayH2)
            todayHeaderDiv.append(icon)

            //Creates a divs for temperature, wind and humidity display and adds their styles
            //Adds current temperature, wind, humidity to the new div
            //Appends the new divs to new today div
            var weatherDiv = $("<div>")
            weatherDiv.css("marginBottom", "5px")
            weatherDiv.html("Temp: " + temp + " &deg;C")
            todayDiv.append(weatherDiv)

            var weatherDiv = $("<div>")
            weatherDiv.css("marginBottom", "5px")
            weatherDiv.html("Wind: " + wind + " KPH")
            todayDiv.append(weatherDiv)

            var weatherDiv = $("<div>")
            weatherDiv.css("marginBottom", "5px")
            weatherDiv.html("Humidity: " + humidity + " %")
            todayDiv.append(weatherDiv)

            console.log(forecastQueryURL);

            //Changing headings of forecast cards to upcoming dates

            $("#day1 h5.card-title").text((forecastResponse.list[5]['dt_txt'].slice(0, -8)));
            $("#day2 h5.card-title").text((forecastResponse.list[13]['dt_txt'].slice(0, -8)));
            $("#day3 h5.card-title").text((forecastResponse.list[21]['dt_txt'].slice(0, -8)));
            $("#day4 h5.card-title").text((forecastResponse.list[29]['dt_txt'].slice(0, -8)));
            $("#day5 h5.card-title").text((forecastResponse.list[37]['dt_txt'].slice(0, -8)));

            //Appending icons to forecast cards. 
            var iconCode1 = forecastResponse.list[5].weather[0].icon;
            var iconCode2 = forecastResponse.list[13].weather[0].icon;
            var iconCode3 = forecastResponse.list[21].weather[0].icon;
            var iconCode4 = forecastResponse.list[29].weather[0].icon;
            var iconCode5 = forecastResponse.list[37].weather[0].icon;
       
            var icon = $('<img>');
            icon.attr({
                'id': 'icon',
                'src': "https://openweathermap.org/img/wn/" + iconCode1  + ".png"
            });
        
            $("#day1").append(icon)

            var icon = $('<img>');
            icon.attr({
                'id': 'icon',
                'src': "https://openweathermap.org/img/wn/" + iconCode2  + ".png"
            });
        
            $("#day2").append(icon)

            var icon = $('<img>');
            icon.attr({
                'id': 'icon',
                'src': "https://openweathermap.org/img/wn/" + iconCode3  + ".png"
            });
        
            $("#day3").append(icon)

            var icon = $('<img>');
            icon.attr({
                'id': 'icon',
                'src': "https://openweathermap.org/img/wn/" + iconCode4  + ".png"
            });
        
            $("#day4").append(icon)

            var icon = $('<img>');
            icon.attr({
                'id': 'icon',
                'src': "https://openweathermap.org/img/wn/" + iconCode5  + ".png"
            });
        
            $("#day5").append(icon)


            // Appending temperature to forecast cards
        
            var temp1 = ((forecastResponse.list[5].main.temp) - 273.15).toFixed(2)

            var weatherDiv = $("<div>")
            weatherDiv.css("marginBottom", "5px")
            weatherDiv.html("Temp: " + temp1 + " &deg;C")
            $("#day1").append(weatherDiv)

            var temp1 = ((forecastResponse.list[13].main.temp) - 273.15).toFixed(2)

            var weatherDiv = $("<div>")
            weatherDiv.css("marginBottom", "5px")
            weatherDiv.html("Temp: " + temp1 + " &deg;C")
            $("#day2").append(weatherDiv)

            var temp1 = ((forecastResponse.list[21].main.temp) - 273.15).toFixed(2)

            var weatherDiv = $("<div>")
            weatherDiv.css("marginBottom", "5px")
            weatherDiv.html("Temp: " + temp1 + " &deg;C")
            $("#day3").append(weatherDiv)

            var temp1 = ((forecastResponse.list[29].main.temp) - 273.15).toFixed(2)

            var weatherDiv = $("<div>")
            weatherDiv.css("marginBottom", "5px")
            weatherDiv.html("Temp: " + temp1 + " &deg;C")
            $("#day4").append(weatherDiv)

            var temp1 = ((forecastResponse.list[37].main.temp) - 273.15).toFixed(2)

            var weatherDiv = $("<div>")
            weatherDiv.css("marginBottom", "5px")
            weatherDiv.html("Temp: " + temp1 + " &deg;C")
            $("#day5").append(weatherDiv)


        // Appending wind to forecast cards
                var wind = (forecastResponse.list[5].wind.speed).toFixed(1)

                var weatherDiv = $("<div>")
                weatherDiv.css("marginBottom", "5px")
                weatherDiv.html("Wind: " + wind + " KPH")
                $("#day1").append(weatherDiv)

                var wind = (forecastResponse.list[13].wind.speed).toFixed(1)

                var weatherDiv = $("<div>")
                weatherDiv.css("marginBottom", "5px")
                weatherDiv.html("Wind: " + wind + " KPH")
                $("#day2").append(weatherDiv)

                var wind = (forecastResponse.list[21].wind.speed).toFixed(1)

                var weatherDiv = $("<div>")
                weatherDiv.css("marginBottom", "5px")
                weatherDiv.html("Wind: " + wind + " KPH")
                $("#day3").append(weatherDiv)

                var wind = (forecastResponse.list[29].wind.speed).toFixed(1)

                var weatherDiv = $("<div>")
                weatherDiv.css("marginBottom", "5px")
                weatherDiv.html("Wind: " + wind + " KPH")
                $("#day4").append(weatherDiv)

                var wind = (forecastResponse.list[37].wind.speed).toFixed(1)

                var weatherDiv = $("<div>")
                weatherDiv.css("marginBottom", "5px")
                weatherDiv.html("Wind: " + wind + " KPH")
                $("#day5").append(weatherDiv)

                 // Appending humidity to forecast cards
                var humidity = (forecastResponse.list[5].main.humidity)

                var weatherDiv = $("<div>")
                weatherDiv.css("marginBottom", "5px")
                weatherDiv.html("Humidity: " + humidity + " %")
                $("#day1").append(weatherDiv)

                var humidity = (forecastResponse.list[13].main.humidity)

                var weatherDiv = $("<div>")
                weatherDiv.css("marginBottom", "5px")
                weatherDiv.html("Humidity: " + humidity + " %")
                $("#day2").append(weatherDiv)

                var humidity = (forecastResponse.list[21].main.humidity)

                var weatherDiv = $("<div>")
                weatherDiv.css("marginBottom", "5px")
                weatherDiv.html("Humidity: " + humidity + " %")
                $("#day3").append(weatherDiv)

                var humidity = (forecastResponse.list[29].main.humidity)

                var weatherDiv = $("<div>")
                weatherDiv.css("marginBottom", "5px")
                weatherDiv.html("Humidity: " + humidity + " %")
                $("#day4").append(weatherDiv)

                var humidity = (forecastResponse.list[37].main.humidity)

                var weatherDiv = $("<div>")
                weatherDiv.css("marginBottom", "5px")
                weatherDiv.html("Humidity: " + humidity + " %")
                $("#day5").append(weatherDiv)


            //TODO: Create a loop for creating cards
            //TODO: Create code making new button each time user types in search and clicks the button. 
            //TODO: Make sure the city name is displayed with a capital letter.
        })
    });
})


//& Example icon url: http://openweathermap.org/img/wn/04n@2x.png.
//& Icon codes: https://openweathermap.org/weather-conditions