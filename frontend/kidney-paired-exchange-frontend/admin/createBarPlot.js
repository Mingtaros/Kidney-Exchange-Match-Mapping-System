function createBarPlot(doc) {
  var panelGraph = doc.getElementsByClassName("Comparator")[0]
                      .getElementsByClassName("panelGraph")[0];
  var compareGraph = panelGraph.getElementsByClassName("compareGraph")[0];
  
  // get data from the compareResult table and then plot it
  var compareResult = compareGraph.getElementsByClassName("compareResult")[0];
  var barPlotLoc = compareGraph.getElementsByClassName("barPlotLoc")[0];
  var matchPlotLoc = barPlotLoc.getElementsByClassName("matchPlotLoc")[0];
  var timePlotLoc = barPlotLoc.getElementsByClassName("timePlotLoc")[0];
  // clear the plot before making new one
  matchPlotLoc.innerHTML = "";
  timePlotLoc.innerHTML = "";

  var exchangerNameList = []
  var numOfMatchedPairsList = []
  var timeElapsedList = []
  for (let i=1; i < compareResult.rows.length; i++) {
    // skip rows[0] because it's header
    exchangerNameList.push(compareResult.rows[i].cells[0].innerHTML);
    numOfMatchedPairsList.push(compareResult.rows[i].cells[2].innerHTML);
    timeElapsedList.push(compareResult.rows[i].cells[3].innerHTML);
  }
  
  var matchedPairPlot = document.createElement("canvas");
  matchedPairPlot.className = "barPlotCanvas";
  
  var matchedPairChart = new Chart(
    matchedPairPlot, {
    type: "bar",
    data: {
      labels: exchangerNameList,
      datasets: [{
        label: "Number of Matched Pairs List",
        data: numOfMatchedPairsList,
        backgroundColor: 'rgba(0, 255, 255, 0.2)',
        borderColor: 'rgba(0, 139, 139, 1)',
        borderWidth: 1,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      scales: {
          y: {
              beginAtZero: true
          },
      },
      plugins: {
        legend: {
          labels: {
            font: {
              family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', \
              'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', \
              sans-serif",
            }
          }
        }
      }
    }
  });
  matchPlotLoc.appendChild(matchedPairPlot);

  var timeElapsedPlot = document.createElement("canvas");
  timeElapsedPlot.className = "barPlotCanvas";
  
  var timeElapsedChart = new Chart(
    timeElapsedPlot, {
    type: "bar",
    data: {
      labels: exchangerNameList,
      datasets: [{
        label: "Time Elapsed (ms)",
        data: timeElapsedList,
        backgroundColor: 'rgba(255, 0, 255, 0.2)',
        borderColor: 'rgba(139, 0, 139, 1)',
        borderWidth: 1,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      scales: {
          y: {
              beginAtZero: true
          },
      },
      plugins: {
        legend: {
          labels: {
            font: {
              family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', \
              'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', \
              sans-serif",
            }
          }
        }
      }
    }
  });
  timePlotLoc.appendChild(timeElapsedPlot);
}
