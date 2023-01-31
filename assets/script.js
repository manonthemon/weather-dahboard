//CURRENT DATE VARIABLE
var currentDate = moment().format("DD/MM/YYYY");

//^CLEAR ALL BUTTON
// Clears all weather content from local storage and page
$("#clear-button").on("click", function (event) {
    event.preventDefault();
    localStorage.clear()
    $("#today").html("")
    $("#forecast").html("")
    $(".input-group-append").html("")
})

//^ MAIN WEATHER SEARCH FUNCTION 
//assigned later to search button
function searchWeather(cityButtonText) {
    var APIKey = "f330e129449abaac86bd926a76054f1f";
    // Takes variable used in making the URL takes either the value of function argument or of the search input
    var city = cityButtonText || $('#search-input').val(); 
    // This builds the URL to query the database about the geographical coordinates of user selected location 
    var geoQueryUrl = "http://cors-anywhere.herokuapp.com/api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + APIKey
    //This clears the today and forecast sections before printing new query results
    $("#today").html("")
    $("#forecast").html("")

    //AJAX call to get the data from the geoQueryUrl above
    $.ajax({
        url: geoQueryUrl,
        method: "GET"
    }).then(function (geoResponse) {    
        // Assigning lat and lon from resulting object to variables to be used in next query URL
        var latitude = (geoResponse[0].lat).toFixed(2)
        var longitude = (geoResponse[0].lon).toFixed(2)
        // building the new url for the query, this time about the weather forecast, using coordinates received above
        var forecastQueryURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey

        //AJAX call to get the data about weather forecast
        $.ajax({
            url: forecastQueryURL,
            method: "GET",
            
        }).then(function (forecastResponse) {
            // Variables for current temperature, wind and humidity
            var temp = ((forecastResponse.list[0].main.temp) - 273.15).toFixed(2)
            var wind = (forecastResponse.list[0].wind.speed).toFixed(1)
            var humidity = (forecastResponse.list[0].main.humidity)
            
            //^TODAY SECTION
            // Code to generate weather icon
            var iconCode = forecastResponse.list[0].weather[0].icon;
            var icon = $('<img>');
            icon.attr({
                'id': 'icon',
                'src': "https://cors-anywhere.herokuapp.com/openweathermap.org/img/wn/" + iconCode + ".png"
            });
            //Generate a div holding today weather info and append its contents
            var todayCard = $("<div>");
            todayCard.addClass("today-card-body");
            var todayHeaderDiv = $("<div>");
            todayHeaderDiv.css("display", "flex")
            todayHeaderDiv.append("<h2>" + city + " ( " + currentDate + ")" + " </h2>")
                .append(icon)
            todayCard.append("<p>Temp: " + temp + " &deg;C</p>" + "<p>Wind: " + wind + " KPH</p>" + "<p>Humidity: " + humidity + " %</p>");
            todayCard.prepend(todayHeaderDiv)
            $("#today").append(todayCard);

            //^FORECAST SECTION
            //First it uses a loop to make arrays of icon codes, temperatures, winds and humidity for the next 5 days
            var icons = [], temps = [] , winds = [], humid = [];
            for (var j = 7; j < forecastResponse.list.length; j += 8) {
                icons.push(forecastResponse.list[j].weather[0].icon);
                temps.push(((forecastResponse.list[j].main.temp) - 273.15).toFixed(2));
                winds.push(forecastResponse.list[0].wind.speed).toFixed(1)
                humid.push(forecastResponse.list[0].main.humidity)
            }
         
            //Then it generates cards and assigns them headings with dates of the next 5 days
            for (var i = 0; i < 5; i++) {
                var futureDate = moment().add(i + 1, 'days').format("DD/MM/YYYY");
                var forecastCard = $("<div>");
                forecastCard.addClass("forecast-card-body");
                forecastCard.append("<h4>" + futureDate + " </h4>");
                //Then it appends each card a consecutive icon, temperature, wind and humidity value
                var futureIconCode = icons[i];
                var forecastIcon = $("<img>");
                forecastIcon.attr({
                    'id': 'icon',
                    'src': "https://cors-anywhere.herokuapp.com/openweathermap.org/img/wn/" + futureIconCode + ".png"
                });
                forecastCard.append(forecastIcon)
                forecastCard.append("<p>Temp: " + temps[i] + " °C</p>" + "<p>Wind: " + winds[i]+ " KPH</p>" + "<p>Humidity: " + humid[i] + " %</p>");
                $("#forecast").append(forecastCard);
            }
        })
    })
}

//^ MAIN SEARCH BUTTON 
// This is the .on("click") event of the main search button
$("#search-button").on("click", function (event) {
        event.preventDefault()
    //This receives an array with searched cities from local storage or creates a new array if local storage empty
        cityArray = JSON.parse(localStorage.getItem("cityArray")) || [];
    // Then it checks if searched city already exists in array, If yes, returns.
    if (cityArray.includes($('#search-input').val())) {
        console.log("city already selected")
        return;
    }
    //Then it checks if text field is not empty. If yes, returns. If not, pushes city to local storage and calls functions to search for Weather and create city buttons.
     if (!$('#search-input').val()) {
        alert("Please enter a valid city name");
        return;
    }
    else {
        cityArray.push($('#search-input').val());
        localStorage.setItem("cityArray", JSON.stringify(cityArray));
    }
        searchWeather()
        cityButtonMaker()

// ^NEW BUTTONS
// Function to create buttons with previously searched city names
function cityButtonMaker() {
        var cityButton = $("<button>");
        cityButton.text($('#search-input').val());
        cityButton.attr({
            "id": "city-button",
            "type": "button"
        });
        cityButton.addClass("btn btn-info btn-block city-button");
        $(".input-group-append").prepend(cityButton);
        //Adds click event to the new button. Is passes the text from the button as a function argument to generate new AJAX query URL when calling searchWeather()
        cityButton.on("click", function (event) {
            event.preventDefault()
            var cityButtonText = ($(this).text());
            searchWeather(cityButtonText) 
        })
    }
})

// ^ PERSISTENT BUTTONS
// Function to keep city buttons persistent on page reload
$(document).ready(function () {
    //Gets previously searched cities from local storage. If none found, returns.
    cityArray = JSON.parse(localStorage.getItem("cityArray")) || []
    if (cityArray.length == 0) {
        return;
    }
    // Else it loops through cities array and creates buttons with cities names
    for (i = 0; i < cityArray.length; i++) {
        var cityButton = $("<button>")
        cityButton.addClass("btn btn-info btn-block")
        cityButton.attr({
            "type": "button",
            "id": "perm-city-button"
        })
        city = cityButton.text(cityArray[i])
        clickedButtonText =  $(this).text();
        $(".input-group-append").prepend(cityButton)
        var cityButton = $("#perm-city-button")
        //Adds click event to reloaded buttons. Is passes the text from the button as a function argument to generate new AJAX query URL when calling searchWeather()
        cityButton.on("click", function (event) {
            event.preventDefault()
            var cityButtonText = ($(this).text());
            searchWeather(cityButtonText) 
        })
        }
    })
    
//TODO Try to check for invalid city inputs
//TODO to change letters to capital