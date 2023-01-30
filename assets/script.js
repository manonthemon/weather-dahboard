//CURRENT DATE VARIABLE
var currentDate = moment().format("DD/MM/YYYY");

// CLEAR ALL BUTTON
// Clears all from local storage and page
$("#clear-button").on("click", function (event) {
    event.preventDefault();
    localStorage.clear()
    $("#today").html("")
    $("#forecast").html("")
    $(".input-group-append").html("")
    console.log("Clear button clicked");
})

//MAIN WEATHER SEARCH FUNCTION assigned later to search button
function searchWeather() {

    //This creates an array with typed in cities sent to local storage. 
    cityArray = JSON.parse(localStorage.getItem("cityArray")) || [];

    //Then it checks if city already exists in array, If yes, returns.
    if (cityArray.includes($('#search-input').val())) {
        console.log("city already selected")
        return;
    }

    //Then it checks if text field is not empty. If yes, returns. If not, creates a button.
    else if (!$('#search-input').val()) {
        alert("Please enter a valid city name");
        return;
    }

    else {
        cityArray.push($('#search-input').val());
        localStorage.setItem("cityArray", JSON.stringify(cityArray));
    }

    // This builds the URL to query the database about the geographical coordinates of user selected location 
    var APIKey = "f330e129449abaac86bd926a76054f1f";
    var city = $('#search-input').val();
    var geoQueryUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + APIKey

    //This clears the today and forecast sections before printing new query results
    $("#today").html("")
    $("#forecast").html("")

    //AJAX call to get the data from the geoQueryUrl above.
    $.ajax({
        url: geoQueryUrl,
        method: "GET"
    }).then(function (geoResponse) {

        // Assigning lat and lon from resulting object to variables to be used in next query URL
        var latitude = (geoResponse[0].lat).toFixed(2)
        var longitude = (geoResponse[0].lon).toFixed(2)

        // building the new url for the query, this time about the weather forecast, using coordinates received above
        var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey

        //AJAX call to get the data about weather forecast
        $.ajax({
            url: forecastQueryURL,
            method: "GET"
        }).then(function (forecastResponse) {

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

            //Generate a div holding today weather info and append its contents
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
            //First it makes arrays for icon codes, temperatures, winds and humidity for the next 5 days
            var icons = [];
            for (var j = 7; j < forecastResponse.list.length; j += 8) {
                icons.push(forecastResponse.list[j].weather[0].icon);
            }
            var temps = [];
            for (var j = 7; j < forecastResponse.list.length; j += 8) {
                temps.push(((forecastResponse.list[j].main.temp) - 273.15).toFixed(2));
            }
            var winds = [];
            for (var j = 7; j < forecastResponse.list.length; j += 8) {
                winds.push(forecastResponse.list[0].wind.speed).toFixed(1)
            }
            var humid = [];
            for (var j = 7; j < forecastResponse.list.length; j += 8) {
                humid.push(forecastResponse.list[0].main.humidity)
            }

            //Then it generates cards and assigns them headings with dates of the next 5 days
            for (var i = 0; i < 5; i++) {
                var futureDate = moment().add(i + 1, 'days').format("DD/MM/YYYY");
                var forecastCard = $("<div>");
                forecastCard.addClass("forecast-card-body");
                forecastCard.append("<h4>" + futureDate + " </h4>");

                // Then it appends each card an icon, temperature, wind and humidity value
                var futureIconCode = icons[i];
                var forecastIcon = $("<img>");
                forecastIcon.attr({
                    'id': 'icon',
                    'src': "https://openweathermap.org/img/wn/" + futureIconCode + ".png"
                });
                forecastCard.append(forecastIcon)
                var futureTemp = temps[i];
                forecastCard.append("<p>Temp: " + futureTemp + " °C</p>")
                var futureWind = winds[i]
                forecastCard.append("<p>Wind: " + futureWind + " KPH</p>")
                var futureHumid = humid[i]
                forecastCard.append("<p>Humidity: " + futureHumid + " %</p>");
                $("#forecast").append(forecastCard);
            }
        })
    })
}

// MAIN SEARCH BUTTON 
// This is the .on("click") event of the main search button
$("#search-button").on("click", function (event) {
    event.preventDefault()
    cityArray = JSON.parse(localStorage.getItem("cityArray")) || [];
  if (cityArray.includes($('#search-input').val())) {
        console.log("city already selected")
        return; }
else {
    searchWeather()
    cityButtonMaker()
}
})

// NEW CITY BUTTONS
function cityButtonMaker() {

    cityArray = JSON.parse(localStorage.getItem("cityArray")) || [];

    // Makes a city button each time a city is searched for
    if (!$('#search-input').val()) {
        return;
    }

    else {
        var cityButton = $("<button>");
        cityButton.text($('#search-input').val());
        cityButton.attr({
            "id": "city-button",
            "type": "button"
        });
        cityButton.addClass("btn btn-primary btn-block city-button");
        $(".input-group-append").prepend(cityButton);

        //Adds click event to the new button
        cityButton.on("click", function (event) {
            var clickedButtonText = $(this).text();
            var APIKey = "f330e129449abaac86bd926a76054f1f";
            var city = clickedButtonText
            var geoQueryUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + APIKey
            $("#today").html("")
            $("#forecast").html("")
            $.ajax({
                url: geoQueryUrl,
                method: "GET"
            }).then(function (geoResponse) {
                var latitude = (geoResponse[0].lat).toFixed(2)
                var longitude = (geoResponse[0].lon).toFixed(2)
                var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey

                $.ajax({
                    url: forecastQueryURL,
                    method: "GET"
                }).then(function (forecastResponse) {

                    var temp = ((forecastResponse.list[0].main.temp) - 273.15).toFixed(2)
                    var wind = (forecastResponse.list[0].wind.speed).toFixed(1)
                    var humidity = (forecastResponse.list[0].main.humidity)

                    var iconCode = forecastResponse.list[0].weather[0].icon;
                    var icon = $('<img>');
                    icon.attr({
                        'id': 'icon',
                        'src': "https://openweathermap.org/img/wn/" + iconCode + ".png"
                    });

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

                    var icons = [];
                    for (var j = 7; j < forecastResponse.list.length; j += 8) {
                        icons.push(forecastResponse.list[j].weather[0].icon);
                    }
                    var temps = [];
                    for (var j = 7; j < forecastResponse.list.length; j += 8) {
                        temps.push(((forecastResponse.list[j].main.temp) - 273.15).toFixed(2));
                    }
                    var winds = [];
                    for (var j = 7; j < forecastResponse.list.length; j += 8) {
                        winds.push(forecastResponse.list[0].wind.speed).toFixed(1)
                    }
                    var humid = [];
                    for (var j = 7; j < forecastResponse.list.length; j += 8) {
                        humid.push(forecastResponse.list[0].main.humidity)
                    }

                    for (var i = 0; i < 5; i++) {
                        var futureDate = moment().add(i + 1, 'days').format("DD/MM/YYYY");
                        var forecastCard = $("<div>");
                        forecastCard.addClass("forecast-card-body");
                        forecastCard.append("<h4>" + futureDate + " </h4>");

                        var futureIconCode = icons[i];
                        var forecastIcon = $("<img>");
                        forecastIcon.attr({
                            'id': 'icon',
                            'src': "https://openweathermap.org/img/wn/" + futureIconCode + ".png"
                        });
                        forecastCard.append(forecastIcon)
                        var futureTemp = temps[i];
                        forecastCard.append("<p>Temp: " + futureTemp + " °C</p>")
                        var futureWind = winds[i]
                        forecastCard.append("<p>Wind: " + futureWind + " KPH</p>")
                        var futureHumid = humid[i]
                        forecastCard.append("<p>Humidity: " + futureHumid + " %</p>");
                        $("#forecast").append(forecastCard);
                    }
                })
            })
        })

    }
}


// Reloading city buttons on page refresh

$(document).ready(function () {

    cityArray = JSON.parse(localStorage.getItem("cityArray")) || []

   if (cityArray.length == 0 ) {
    return;
   }
    for (i = 0; i < cityArray.length; i++) {
        var cityButton = $("<button>")
        cityButton.addClass("btn btn-primary btn-block")
        cityButton.attr({
            "type": "button",
            "id": "perm-city-button"
        })
        cityButton.text(cityArray[i])
        $(".input-group-append").prepend(cityButton)

        var cityButton = $("#perm-city-button")

        cityButton.on("click", function (event) {
            var clickedButtonText = $(this).text();
            var APIKey = "f330e129449abaac86bd926a76054f1f";
            var city = clickedButtonText
            var geoQueryUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + APIKey
            $("#today").html("")
            $("#forecast").html("")
            $.ajax({
                url: geoQueryUrl,
                method: "GET"
            }).then(function (geoResponse) {
                var latitude = (geoResponse[0].lat).toFixed(2)
                var longitude = (geoResponse[0].lon).toFixed(2)
                var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey

                $.ajax({
                    url: forecastQueryURL,
                    method: "GET"
                }).then(function (forecastResponse) {

                    var temp = ((forecastResponse.list[0].main.temp) - 273.15).toFixed(2)
                    var wind = (forecastResponse.list[0].wind.speed).toFixed(1)
                    var humidity = (forecastResponse.list[0].main.humidity)

                    var iconCode = forecastResponse.list[0].weather[0].icon;
                    var icon = $('<img>');
                    icon.attr({
                        'id': 'icon',
                        'src': "https://openweathermap.org/img/wn/" + iconCode + ".png"
                    });

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

                    var icons = [];
                    for (var j = 7; j < forecastResponse.list.length; j += 8) {
                        icons.push(forecastResponse.list[j].weather[0].icon);
                    }
                    var temps = [];
                    for (var j = 7; j < forecastResponse.list.length; j += 8) {
                        temps.push(((forecastResponse.list[j].main.temp) - 273.15).toFixed(2));
                    }
                    var winds = [];
                    for (var j = 7; j < forecastResponse.list.length; j += 8) {
                        winds.push(forecastResponse.list[0].wind.speed).toFixed(1)
                    }
                    var humid = [];
                    for (var j = 7; j < forecastResponse.list.length; j += 8) {
                        humid.push(forecastResponse.list[0].main.humidity)
                    }

                    for (var i = 0; i < 5; i++) {
                        var futureDate = moment().add(i + 1, 'days').format("DD/MM/YYYY");
                        var forecastCard = $("<div>");
                        forecastCard.addClass("forecast-card-body");
                        forecastCard.append("<h4>" + futureDate + " </h4>");

                        var futureIconCode = icons[i];
                        var forecastIcon = $("<img>");
                        forecastIcon.attr({
                            'id': 'icon',
                            'src': "https://openweathermap.org/img/wn/" + futureIconCode + ".png"
                        });
                        forecastCard.append(forecastIcon)
                        var futureTemp = temps[i];
                        forecastCard.append("<p>Temp: " + futureTemp + " °C</p>")
                        var futureWind = winds[i]
                        forecastCard.append("<p>Wind: " + futureWind + " KPH</p>")
                        var futureHumid = humid[i]
                        forecastCard.append("<p>Humidity: " + futureHumid + " %</p>");
                        $("#forecast").append(forecastCard);
                    }
                })
            })
        })

    }
})

//TODO Try to check for invalid city inputs
//TODO Refactor, add comments
