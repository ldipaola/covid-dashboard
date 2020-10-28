$(function() {

Chart.defaults.line.spanGaps = true;

getCountryStats('Australia');

function getCountryStats (userInput) {

var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://covid-193.p.rapidapi.com/history?&country=" + userInput,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "covid-193.p.rapidapi.com",
		"x-rapidapi-key": "510f15014bmsh6ce0dd84c132d79p116676jsna21790da67cc"
	}
}


$.ajax(settings).done(function (response) {
    $('#country-stat').empty();
    var table = $('<table>');
    var tr1 = $('<tr>');
    var tr2 = $('<tr>');
    var tr3 = $('<tr>');
    var tr4 = $('<tr>');
    var tr5 = $('<tr>');
    var tr6 = $('<tr>');
    var tr7 = $('<tr>');
    var tr8 = $('<tr>');
    var tr9 = $('<tr>');
    var tr10 = $('<tr>');
    var tr11 = $('<tr>');
    var tr12 = $('<tr>');
    var tr13 = $('<tr>');
    var tr14 = $('<tr>');
    var td1 = $('<td>').text(response.response[0].country);
    var td2 = $('<td>').text(response.response[0].cases.total.toLocaleString());
    var td3 = $('<td>').text(response.response[0].cases.new);
    var td4 = $('<td>').text(response.response[0].deaths.total.toLocaleString());
    var td5 = $('<td>').text(response.response[0].deaths.new);
    var td6 = $('<td>').text(response.response[0].cases.recovered.toLocaleString());
    var td7 = $('<td>').text(response.response[0].cases.active.toLocaleString());
    var td8 = $('<td>').text(response.response[0].cases.critical.toLocaleString());
    var td9 = $('<td>').text(parseFloat(response.response[0].cases["1M_pop"]).toLocaleString());
    var td10 = $('<td>').text(parseFloat(response.response[0].deaths["1M_pop"]).toLocaleString());
    var td11 = $('<td>').text(response.response[0].tests.total.toLocaleString());
    var td12 = $('<td>').text(parseFloat(response.response[0].tests["1M_pop"]).toLocaleString());
    var td13 = $('<td>').text(response.response[0].population.toLocaleString());
    var th1 = $('<th>').text('Country');
    tr1.append(th1,td1);
    var th2 = $('<th>').text('Total Cases');
    tr2.append(th2,td2);
    var th3 = $('<th>').text('New Cases');
    tr3.append(th3,td3);
    var th4 = $('<th>').text('Total Deaths');
    tr4.append(th4,td4);
    var th5 = $('<th>').text('New Deaths');
    tr5.append(th5,td5);
    var th6 = $('<th>').text('Total Recovered');
    tr6.append(th6,td6);
    var th7 = $('<th>').text('Active Cases');
    tr7.append(th7,td7);
    var th8 = $('<th>').text('Serious, Critical');
    tr8.append(th8,td8);
    var th9 = $('<th>').text('Cases / 1M Pop');
    tr9.append(th9,td9);
    var th10 = $('<th>').text('Deaths / 1M Pop');
    tr10.append(th10,td10);
    var th11 = $('<th>').text('Tests');
    tr11.append(th11,td11);
    var th12 = $('<th>').text('Tests / 1M Pop');
    tr12.append(th12,td12);
    var th13 = $('<th>').text('Population');
    tr13.append(th13,td13);
    var td8 = $('<td>');
    table.append(tr1,tr2,tr3,tr4,tr5,tr6,tr7,tr8,tr9,tr10,tr11,tr12,tr13);

    var pieChartArr = [];
    pieChartArr.push(response.response[0].cases.active);
    pieChartArr.push(response.response[0].cases.recovered);
    pieChartArr.push(response.response[0].deaths.total);



    $('#country-stat').append(table);
    
    var day = []
    var logDate = "";
    var activeCases = [];
    var totalCases = [];
    for (var i = 0; i < response.response.length; i++){
        if (response.response[i].day === logDate){
            continue;
        } else {          
        day.push(response.response[i].day);
        activeCases.push(response.response[i].cases.active);
        logDate = response.response[i].day;
        totalCases.push(response.response[i].cases.total);

        }

    }
    


    var totalCasesRev = totalCases.reverse();
    var dayRev = day.reverse();
    var activeCasesRev = activeCases.reverse();
    $('#chart-container1').empty();
    $('#chart-container2').empty();
    $('#chart-container3').empty();
    $('#chart-container4').empty();
    $('#chart-container1').append($('<canvas id="chart1" width="800" height="500">'));
    $('#chart-container2').append($('<canvas id="chart2" width="800" height="500">'));
    $('#chart-container3').append($('<canvas id="chart3" width="800" height="500">'));
    $('#chart-container4').append($('<canvas id="chart4" width="800" height="500">'));
    var chart1 = new Chart($("#chart1"), {
        type: 'line',
        data: {
          labels: dayRev,
          datasets: [{ 
              data: totalCasesRev,
              label: response.response[0].country,
              borderColor: "#3e95cd",
              fill: false
            }
          ]
        },
        options: {
            elements: {
              point: {
                radius: 0
              }
            },
            responsive: true,
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  var value = data.datasets[0].data[tooltipItem.index];
                  value = value.toString();
                  value = value.split(/(?=(?:...)*$)/);
                  value = value.join(',');
                  return value;
                }
              }
            },
            scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero:true,
                    userCallback: function(value, index, values) {
                        value = value.toString();
                        value = value.split(/(?=(?:...)*$)/);
                        value = value.join(',');
                        return value;
                    }
                }
                }],
                xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'month'
                    }
                }]
            },
          legend: {
              display: true
          },  
          title: {
            display: true,
            text: 'Total Covid-19 cases'
          }
        }
      });
    
    var chart2 = new Chart($("#chart2"), {
        type: 'line',
        data: {
          labels: dayRev,
          datasets: [{ 
              data: activeCasesRev,
              label: response.response[0].country,
              borderColor: "#3e95cd",
              fill: false
            }
          ]
        },
        options: {
          elements: {
            point: {
              radius: 0
            }
          },
            responsive: true,
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  var value = data.datasets[0].data[tooltipItem.index];
                  value = value.toString();
                  value = value.split(/(?=(?:...)*$)/);
                  value = value.join(',');
                  return value;
                }
              }
            },
            scales: {
              tooltips: {
			  callbacks: {
					label: function(tooltipItem, data) {
						var value = data.datasets[0].data[tooltipItem.index];
						value = value.toString();
						value = value.split(/(?=(?:...)*$)/);
						value = value.join(',');
						return value;
					}
			  } // end callbacks:
			},
              yAxes: [{
                ticks: {
                  beginAtZero:true,
                  userCallback: function(value, index, values) {
                      value = value.toString();
                      value = value.split(/(?=(?:...)*$)/);
                      value = value.join(',');
                      return value;
                  }
              }
              }],
                xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'month'
                    }
                }]
            },
          legend: {
              display: true
          },  
          title: {
            display: true,
            text: 'Active Covid-19 cases'
          }
        }
      });

      var chart3 = new Chart($("#chart3"), {
        type: 'doughnut',
        data: {
            labels: ["Active", "Recovered", "Deaths"],
            datasets: [
                {
                    label: "Covid-19 cases",
                    backgroundColor: ["#3cba9f", "#8e5ea2", "#FF6347"],
                    data: pieChartArr
                }
            ]
        },
        options: {
            tooltips: {
                callbacks: {
                  label: function (tooltipItem, data) {
                    try {
                      var label = ' ' + data.labels[tooltipItem.index] || '';
            
                      if (label) {
                        label += ': ';
                      }
            
                      var sum = data.datasets[0].data.reduce((accumulator, curValue) => {
                        return accumulator + curValue;
                      });
                      var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            
                      label += Number((value / sum) * 100).toFixed(2) + '%';
                      return label;
                    } catch (error) {
                      console.log(error);
                    }
                  }
                }
              },
            title: {
              display: true,
              text: 'Covid-19 Cases'
            }
          }
    });
    

});
}

$('#input').on("keyup", function(e){
    if(e.keyCode == 13)
    {
        var input = $(this).val();
        var userInput = input.trim().split(" ").join("-");
        console.log(userInput)
        getCountryStats(userInput);
    }
});



});