
// This .on("click") function will trigger the AJAX Call to get the geographical coordinates of user input
$("#search-button").on("click", function (event) {

    // event.preventDefault() prevents page reload
    event.preventDefault();


    // This builds the URL to query the database about the geographical coordinates of user selected location 
    var APIKey = "f330e129449abaac86bd926a76054f1f";
    var userInput = $('#search-input').val();
    var geoQueryUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + userInput + "&appid=" + APIKey

    console.log("This is the query url for geo query " + geoQueryUrl);

    //AJAX call to get the data from the geoQueryUrl above.
    $.ajax({
        url: geoQueryUrl,
        method: "GET"
    }).then(function (geoResponse) {

        // response from the call about geographical coordinates
        console.log(geoResponse);
       
    // Assigning lat and lon from resulting object into variables and reducing to two digits after come, to be used in next AJAX call.


        var latitude = (geoResponse[0].lat).toFixed(2)
        var longitude = (geoResponse[0].lon).toFixed(2)

        console.log("This is the latitude " + latitude);
        console.log("This is the longitude " + longitude);

// building the new url for the query, this time about the weather forecast, using coordinates received above. 

        var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey

        console.log("This is the query URL for the forecast " +  forecastQueryURL);

      //AJAX call to get the data about weather forecast from the geoQueryUrl above.
        $.ajax({
            url: forecastQueryURL,
            method: "GET"
        }).then(function (forecastResponse) {
    
            // response from the call about weather forecast coordinates
            console.log(forecastResponse);

            //TODO: Create weather forecast cards in bootstrap, add data from AJAX query  and append them to the #forecast section
            //TODO: Create ajax call for current weather, create a div for it and append it to #today section. 
            //TODO: Create code making new button each time user types in search and clicks the button. 
        })  
    });
})


//& Example icon url: http://openweathermap.org/img/wn/04n@2x.png.
//& Icon codes: https://openweathermap.org/weather-conditions