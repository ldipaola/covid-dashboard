function addCommas(number) {
  if (number === null) return 0
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


async function renderMap() {
  const covidStats = await fetch("https://corona.lmao.ninja/v2/countries?yesterday=&sort=").then((response) => response.json());
  const vaccineStats = await fetch("https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=1&fullData=false").then((response) => response.json());
  console.log(covidStats[0].hasOwnProperty('country'));
  console.log(vaccineStats);

  for(let i = 0; i<covidStats.length; i++){
    for(let x = 0; x<vaccineStats.length; x++){
      if(covidStats[i].country === vaccineStats[x].country){
        covidStats[i] = { ...covidStats[i], timeline: vaccineStats[x].timeline};
      }
      
    }
  }
  

  mapboxgl.accessToken =
    "pk.eyJ1IjoibHVrZXk4OCIsImEiOiJja2Z0eGI4eGcwdWhzMnRtdDc4Z2lrMTVoIn0.1C1oHpJeoVInABgwd7pVVg";
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/dark-v10", // stylesheet location
    center: [134.273, -26.273], // starting position [lng, lat]
    zoom: 1, // starting zoom
  });


      covidStats.forEach((element) => {
        console.log(element.timeline);
        const vaccineDoses =  element.timeline ? addCommas(element.timeline[Object.keys(element.timeline)[0]]) : 'Not available';
        new mapboxgl.Marker({})
          .setLngLat([element.countryInfo.long, element.countryInfo.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(
                "<img src=" +
                  element.countryInfo.flag +
                  " width=60 height=35>" +
                  "<h5>" +
                  element.country +
                  '</h5><p class="popup-text">Cases: ' +
                  addCommas(element.cases) +
                  "</p>" +
                  '<p class="popup-text">active cases: ' +
                  addCommas(element.active) +
                  "</p>" +
                  '<p class="popup-text">deaths: ' +
                  addCommas(element.deaths) +
                  "</p>" +
                  '<p class="popup-text">population: ' +
                  addCommas(element.population) +
                  "</p>" +
                  '<p class="popup-text">Vaccine doses administered: ' +
                  vaccineDoses +
                  "</p>"                 
              )
              
          )
          .addTo(map);
      });
      renderStatistics(covidStats);
}

function renderStatistics(data) {
    console.log(data[0].timeline[Object.keys(data[0].timeline)[0]]);
    const table = document.createElement('table');
    const tr = document.createElement('tr');
    const th1 = document.createElement('th');
    th1.textContent = 'Country';
    const th2 = document.createElement('th');
    th2.textContent = 'Cases';
    const th3 = document.createElement('th');
    th3.textContent = 'Deaths';
    table.append(tr);
    tr.append(th1, th2, th3);

    //sort response by number of cases highest to lowest
    const sortedData = data.sort((a,b) => b.cases - a.cases)
  
    sortedData.forEach(country => {
        const totalCases = country.cases.toLocaleString();
        const totalDeaths = country.deaths.toLocaleString();
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        td1.classList.add("country-text");
        td1.textContent = (country.country);
        const td2 = document.createElement('td');
        td2.textContent = totalCases;
        const td3 = document.createElement('td');
        td3.textContent = totalDeaths;
        tr.append(td1,td2,td3);
        table.append(tr); 
    });
    
    document.getElementById('stat-sidebar').append(table);
}

renderMap();


document.getElementById("currentDate").textContent = moment().format('LLL');



