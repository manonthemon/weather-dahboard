
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

            // Creates a div for today weather and sets its styles
            //Creates a div for today header and sets its css display property and margin
            //Creates a H2 for today header text and adds its style
            //Sets text of new H2
            //Appends the today weather div to today section
            //Appends new header div the today weather div
            //Appends new H2 to new header div
            //Appends icon to new header div
            var todayDiv = $("<div>")
            todayDiv.css({ "border" : "1.5px solid black", "padding" : "5px" , "width" : "67rem" })
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


        

            //TODO: Create weather forecast cards in bootstrap and append them to the #forecast section

    

var forecastCardsDiv = $("<div>")
forecastCardsDiv.css = ( "display" , "flex")



$("#forecast").append(forecastCardsDiv)

            var forecastCard = $("<div>")
            forecastCard.addClass("card-body")
            forecastCard.css({ 
            "backgroundColor":"rgba(49,62,78,255)", 
            "color" : "white", 
            "width": "13rem",
        "marginRight" : "10px"})
            var forecastHeaderDiv = $("<div>")
            var forecastH4 = $("<h4>")
            forecastH4.css("fontWeight", "bold")
            forecastH4.text(currentDate)
            forecastCard.append(forecastHeaderDiv)
            forecastHeaderDiv.append(forecastH4)
            forecastHeaderDiv.append(icon)
            forecastCardsDiv.append(forecastCard)
        
            var forecastContentDiv = $("<div>")
            forecastContentDiv.css("marginBottom", "5px")
            forecastContentDiv.html("Temp: " + temp + " &deg;C")
            forecastCard.append(forecastContentDiv)

            var forecastContentDiv = $("<div>")
            forecastContentDiv.css("marginBottom", "5px")
            forecastContentDiv.html("Wind: " + wind + " KPH")
            forecastCard.append(forecastContentDiv)

            var forecastContentDiv = $("<div>")
            forecastContentDiv.css("marginBottom", "5px")
            forecastContentDiv.html("Humidity: " + humidity + " %")
            forecastCard.append(forecastContentDiv)




            //TODO: Create code making new button each time user types in search and clicks the button. 
            //TODO: Make sure the city name is displayed with a capital letter.
        })
    });
})


//& Example icon url: http://openweathermap.org/img/wn/04n@2x.png.
//& Icon codes: https://openweathermap.org/weather-conditions