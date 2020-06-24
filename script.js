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
    var th4 = $('<th>').text('New Cases');
    table.append(tr);
    tr.append(th1, th2, th3, th4);

    //sort response by number of cases highest to lowest
    var sortedData = dataArray.sort((a,b) => b.cases.total - a.cases.total)

    var count = 0;
    var index = 0;
    while (count < 10){

        if(sortedData[index].continent === sortedData[index].country){
        index++
        continue;
        }
        var totalCases = sortedData[index].cases.total.toLocaleString();
        var totalDeaths = sortedData[index].deaths.total.toLocaleString();
        var tr = $('<tr>');
        var td1 = $('<td>').text(sortedData[index].country);
        var td2 = $('<td>').text(totalCases);
        var td3 = $('<td>').text(totalDeaths);
        var td4 = $('<td>').text(sortedData[index].cases.new);
        tr.append(td1,td2,td3,td4);
        table.append(tr);
        index++
        count++;
    }

    $('#frame2').append(table);

});