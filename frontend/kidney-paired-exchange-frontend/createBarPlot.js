function createBarPlot(doc) {
  var panelGraph = doc.getElementsByClassName("Comparator")[0]
                      .getElementsByClassName("panelGraph")[0];
  var compareGraph = panelGraph.getElementsByClassName("compareGraph")[0];
  
  // get data from the compareResult table and then plot it
  var compareResult = compareGraph.getElementsByClassName("compareResult")[0];
  var barPlotLoc = compareGraph.getElementsByClassName("barPlotLoc")[0];
  // clear the plot before making new one
  barPlotLoc.innerHTML = "";

  var exchangerNameList = []
  var numOfMatchedPairsList = []
  var timeElapsedList = []
  for (let i=1; i < compareResult.rows.length; i++) {
    // skip rows[0] because it's header
    exchangerNameList.push(compareResult.rows[i].cells[0].innerHTML);
    numOfMatchedPairsList.push(compareResult.rows[i].cells[2].innerHTML);
    timeElapsedList.push(compareResult.rows[i].cells[3].innerHTML);
  }
  
  var barPlot = document.createElement("canvas");
  barPlot.className = "barPlotCanvas";
  
  var chart = new Chart(
    barPlot, {
    type: "bar",
    data: {
      labels: exchangerNameList,
      datasets: [{
        label: "Number of Matched Pairs List",
        data: numOfMatchedPairsList,
        backgroundColor: 'rgba(0, 255, 255, 0.2)',
        borderColor: 'rgba(0, 139, 139, 1)',
        borderWidth: 1,
      }, {
        label: "Time Elapsed (ms)",
        data: timeElapsedList,
        backgroundColor: 'rgba(255, 0, 255, 0.2)',
        borderColor: 'rgba(139, 0, 139, 1)',
        borderWidth: 1,
      }]
    },
    options: {
      indexAxis: 'y',
      scales: {
          y: {
              beginAtZero: true
          }
      },
    }
  });

  barPlotLoc.appendChild(barPlot);
}
