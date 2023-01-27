
// This .on("click") function will trigger the AJAX Call to get the geographical coordinates of user input
$("#search-button").on("click", function (event) {

    // event.preventDefault() prevents page reload
    event.preventDefault();


    // This builds the URL to query the database
    var APIKey = "f330e129449abaac86bd926a76054f1f";
    var userInput = $('#search-input').val();
    var geoQueryUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + userInput + "&appid=" + APIKey

    //AJAX call
    $.ajax({
        url: geoQueryUrl,
        method: "GET"
    }).then(function (response) {

        console.log(response);
        // TODO: change lat and lon from resulting object into a variable to get use in the next query URL. 
    });
})


// var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=" + APIKey;

// console.log(queryURL);