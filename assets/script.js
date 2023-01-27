
// This .on("click") function will trigger the AJAX Call to get the geographical coordinates of user input
$("#search-button").on("click", function (event) {

    // event.preventDefault() prevents page reload
    event.preventDefault();


    // This builds the URL to query the database about the geographical coordinates of user selected location 
    var APIKey = "f330e129449abaac86bd926a76054f1f";
    var city = $('#search-input').val();
    var geoQueryUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + APIKey

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

        console.log("This is the query URL for the forecast " + forecastQueryURL);

        //AJAX call to get the data about weather forecast from the geoQueryUrl above.
        $.ajax({
            url: forecastQueryURL,
            method: "GET"
        }).then(function (forecastResponse) {

            //This gets the icon code from the Ajax response and sets it to a new variable. 
            var iconCode = forecastResponse.list[0].weather[0].icon;

            //This get the icon id from the ajax response and uses it to build a url of the icon. 
            var icon = $('<img>');
            icon.attr({
                'id': 'icon',
                'src': "https://openweathermap.org/img/wn/" + iconCode + ".png"
            });

            //This gets the current time and date from the Ajax response, removes the time and sets it to a new variable. 
            var currentDate = (forecastResponse.list[0]['dt_txt'].slice(0, -8));

            
            // Creates a div for today header and sets its css display property
            //Creates a H2 for today header text
            //sets text of new H2
            //Appends new header div to today section
            //Appends new H2 to new header div
            //Appends icon to new header div.
            var todayHeaderDiv = $("<div>")
            todayHeaderDiv.css("display", "flex");
            var todayH2 = $("<h2>")
            todayH2.text(city + " ( " + currentDate + ')')
            $("#today").append(todayHeaderDiv)
            todayHeaderDiv.append(todayH2)
            todayHeaderDiv.append(icon)











            var icon = $("<i>")
            icon.attr("src", "http://openweathermap.org/img/wn/04n@2x.png")
            $("#forecast").append(icon)


            //TODO: Create weather forecast cards in bootstrap, add data from AJAX query  and append them to the #forecast section
            //TODO: Create ajax call for current weather, create a div for it and append it to #today section. 
            //TODO: Create code making new button each time user types in search and clicks the button. 
        })
    });
})


//& Example icon url: http://openweathermap.org/img/wn/04n@2x.png.
//& Icon codes: https://openweathermap.org/weather-conditions