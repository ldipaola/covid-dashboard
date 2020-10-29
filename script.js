$(function() {

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
    console.log(response);
    var dataArray = response.response;
    var table = $('<table>');
    var tr = $('<tr>');
    var th1 = $('<th>').text('Country');
    var th2 = $('<th>').text('Total Cases');
    var th3 = $('<th>').text('Deaths');
    table.append(tr);
    tr.append(th1, th2, th3);

    //sort response by number of cases highest to lowest
    var sortedData = dataArray.sort((a,b) => b.cases.total - a.cases.total)
    var labels1 = [];
    var data1 = [];
    var count = 0;
    var index = 0;
    while (count < 10){

        if(sortedData[index].continent === sortedData[index].country){
        index++
        continue;
        }
        labels1.push(sortedData[index].country);
        data1.push(sortedData[index].cases.total);
        var totalCases = sortedData[index].cases.total.toLocaleString();
        var totalDeaths = sortedData[index].deaths.total.toLocaleString();
        var tr = $('<tr>');
        var td1 = $('<td class="country-text">').text(sortedData[index].country);
        var td2 = $('<td>').text(totalCases);
        var td3 = $('<td>').text(totalDeaths);
        tr.append(td1,td2,td3);
        table.append(tr);
        index++
        count++;
        
    }
    


    


    $('#frame2').append(table);

    // var ctx = $('#covid-chart');
    // var labels1 = sortedData.map(function(e) {
    //     return e.country
    // });
    // var data1 = sortedData.map(function(e) {
    //     return e.cases.total
    // });
    // var myChart = new Chart(ctx, {
    //     type: 'bar',
    //     data: {
    //         labels: labels1,
    //         datasets: [{
    //             label: 'Total Cases',
    //             data: data1,
    //             backgroundColor: [
    //                 'rgba(255, 99, 132, 0.2)',
    //                 'rgba(54, 162, 235, 0.2)',
    //                 'rgba(255, 206, 86, 0.2)',
    //                 'rgba(75, 192, 192, 0.2)',
    //                 'rgba(153, 102, 255, 0.2)',
    //                 'rgba(255, 159, 64, 0.2)',
    //                 'rgba(26, 19, 64, 0.2)',
    //                 'rgba(45, 196, 164, 0.2)',
    //                 'rgba(60, 20, 64, 0.2)',
    //                 'rgba(205, 70, 64, 0.2)'
                    
    //             ],
    //             borderColor: [
    //                 'rgba(255, 99, 132, 1)',
    //                 'rgba(54, 162, 235, 1)',
    //                 'rgba(255, 206, 86, 1)',
    //                 'rgba(75, 192, 192, 1)',
    //                 'rgba(153, 102, 255, 1)',
    //                 'rgba(255, 159, 64, 1)',
    //                 'rgba(26, 19, 64, 1)',
    //                 'rgba(45, 196, 164, 1)',
    //                 'rgba(60, 20, 64, 1)',
    //                 'rgba(205, 70, 64, 1)'
    //             ],
    //             borderWidth: 1
    //         }]
    //     },
    //     options: {
    //         scales: {
    //             yAxes: [{
    //                 ticks: {
    //                     beginAtZero: true
    //                 }
    //             }]
    //         }
    //     }
    // });


});

// Creating the current Date
$("#currentDate").text(moment().format('LLL'));
});