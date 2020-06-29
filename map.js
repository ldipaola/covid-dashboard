// var settings = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "https://coronavirus-map.p.rapidapi.com/api/v1/regions",
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "coronavirus-map.p.rapidapi.com",
// 		"x-rapidapi-key": "d6a3a44921msh729ef7ac547d6cep1f6aa3jsn48332191f917"
// 	}
// }

// $.ajax(settings).done(function (response) {
// 	console.log(response);
// });
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://coronavirus-map.p.rapidapi.com/v1/summary/region?region=australia",
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "coronavirus-map.p.rapidapi.com",
        "x-rapidapi-key": "d6a3a44921msh729ef7ac547d6cep1f6aa3jsn48332191f917"
    }
}

$.ajax(settings).done(function(response) {
    console.log(response);
});