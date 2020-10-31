

async function renderDashboard () {
    try {
        await renderMap();

    } catch (err) {
        console.error(err);
    }
}

async function renderMap() {
  fetch("https://corona.lmao.ninja/v2/countries?yesterday=&sort=")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
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
                  element.cases.toLocaleString() +
                  "</p>" +
                  '<p class="popup-text">active cases: ' +
                  element.active.toLocaleString() +
                  "</p>" +
                  '<p class="popup-text">deaths: ' +
                  element.deaths.toLocaleString() +
                  "</p>" +
                  '<p class="popup-text">population: ' +
                  element.population.toLocaleString() +
                  "</p>"
              )
          )
          .addTo(map);
      });
      renderStatistics(data);
    });
  mapboxgl.accessToken =
    "pk.eyJ1IjoibHVrZXk4OCIsImEiOiJja2Z0eGI4eGcwdWhzMnRtdDc4Z2lrMTVoIn0.1C1oHpJeoVInABgwd7pVVg";
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/dark-v10", // stylesheet location
    center: [134.273, -26.273], // starting position [lng, lat]
    zoom: 1, // starting zoom
  });
}

async function renderStatistics(data) {
    console.log(data);
    const table = document.createElement('table');
    const tr = document.createElement('tr');
    const th1 = document.createElement('th');
    th1.textContent = 'Country';
    const th2 = document.createElement('th');
    th2.textContent = 'Total Cases';
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

renderDashboard();


document.getElementById("currentDate").textContent = moment().format('LLL');

