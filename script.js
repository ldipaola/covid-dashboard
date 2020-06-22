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

$.ajax(settings).done(function(response) {
    console.log(response);
});

$.ajax(settings).done(function(response) {
            for (var i = 0; i < response.length; i++) {
                console.log(response[i]);
                $("<p>Small test</p>")