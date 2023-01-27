
// This is the .on("click") function of the main search button
$("#search-button").on("click", function (event) {

    // This prevents page reload
    event.preventDefault();

    //This clears the today section before printing new query results
    $("#today").html("")

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

            //This creates a div for today header and sets its css display property and margin
            //Creates a H2 for today header text and adds its style
            //Sets text of new H2
            //Appends new header div to today section
            //Appends new H2 to new header div
            //Appends icon to new header div
            var todayHeaderDiv = $("<div>")
            todayHeaderDiv.css({ "display": "flex", "marginBottom": "5px" })
            var todayH2 = $("<h2>")
            todayH2.css("fontWeight", "bold")
            todayH2.text(city + " ( " + currentDate + ')')
            $("#today").append(todayHeaderDiv)
            todayHeaderDiv.append(todayH2)
            todayHeaderDiv.append(icon)

            //Creates a div for temperature display and adds its style
            //Adds current temperature to the new div
            //Appends the new div to today section
            var weatherDiv = $("<div>")
            weatherDiv.css("marginBottom", "5px")
            weatherDiv.html("Temp: " + temp + " &deg;C")
            $("#today").append(weatherDiv)

            //Creates a div for wind and adds its style
            //Adds current wind speed to the new div
            //Appends the new div to today section
            var weatherDiv = $("<div>")
            weatherDiv.css("marginBottom", "5px")
            weatherDiv.html("Wind: " + wind + " KPH")
            $("#today").append(weatherDiv)

            //Creates a div for humidity
            //Adds current humidity to the new div
            //Appends the new div to today section
            var weatherDiv = $("<div>")
            weatherDiv.css("marginBottom", "5px")
            weatherDiv.html("Humidity: " + humidity + " %")
            $("#today").append(weatherDiv)


            //TODO: Create weather forecast cards in bootstrap, add data from AJAX query  and append them to the #forecast section
            //TODO: Create code making new button each time user types in search and clicks the button. 
            //TODO: Make sure the city name is displayed with a capital letter.
        })
    });
})


//& Example icon url: http://openweathermap.org/img/wn/04n@2x.png.
//& Icon codes: https://openweathermap.org/weather-conditions