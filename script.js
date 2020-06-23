var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://covid-193.p.rapidapi.com/statistics",
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
        "x-rapidapi-key": "d6a3a44921msh729ef7ac547d6cep1f6aa3jsn48332191f917"
    }
}

//default print all fields
$.ajax(settings).done(function(response) {
    //print full array 
    var dataArray = response.response;
    console.log(dataArray);
    $.each(dataArray, function(index, value) {
        $("#frame1").empty();
        var continent = console.log(value.continent);
        var country = console.log(value.country);
        $("#frame1").append("<option value='" + continent + "'>" + country + "</option>");

    });
    // console.log(value);
    // console.log(value.country);
    // console.log(value.cases.new);
    // console.log(value.cases.active);
    // console.log(value.cases.recovered);
    // return (value !== 'three');
    // );

});