fetch("https://covid-193.p.rapidapi.com/statistics", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "covid-193.p.rapidapi.com",
		"x-rapidapi-key": "510f15014bmsh6ce0dd84c132d79p116676jsna21790da67cc"
	}
})
.then(response => response.ok ? response.json() : console.log("Error"))
.then(data =>{
    console.log(data);

    document.querySelector("#currentCountry").textContent = JSON.stringify(data);
})
.catch(err => {
	console.log(err);
});


