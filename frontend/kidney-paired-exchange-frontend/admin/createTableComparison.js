// IMPORTED FROM ../Utils/constants.js
//    - DJANGO_URL
// IMPORTED FROM createBarPlot.js
//    - createBarPlot

function getExchangeResult(doc, exchangerObject, exchangerName) {
  var xmlhttp = new XMLHttpRequest();

  // constructing query parameter from javascript object
  var queryParam = Object.keys(exchangerObject)
          .map(key => `${key}=${exchangerObject[key]}`)
          .join('&');
  
  const url = DJANGO_URL + `/getFinalizedExchange?${queryParam}`;
  xmlhttp.open("GET", url, true);
  xmlhttp.send();

  xmlhttp.onload = function () {
    addToTable(doc, xmlhttp.responseText, exchangerName);
  }
}


function addToTable(doc, rawResult, exchangerName) {
  result = JSON.parse(rawResult);

  var compareResult = doc.getElementsByClassName("Comparator")[0]
                         .getElementsByClassName("panelGraph")[0]
                         .getElementsByClassName("compareGraph")[0]
                         .getElementsByClassName("compareResult")[0];
  
  // make a table row
  var tableRow = document.createElement("tr");
  var exchangerNameColumn = document.createElement("td");
  exchangerNameColumn.className = "compareResult";
  exchangerNameColumn.innerHTML = exchangerName;
  tableRow.appendChild(exchangerNameColumn);
  
  // add matchmaking result in text format
  var exchangerList = [];
  result["exchanges"].forEach((matchMap) => {
    exchangerList.push(matchMap.join(" --> "));
  })
  exchangerList = exchangerList.join("<br>");

  var matchMapping = document.createElement("td");
  matchMapping.className = "matchMap";
  var matchMappingDiv = document.createElement("div");
  matchMappingDiv.className = "matchMap";
  matchMappingDiv.innerHTML = exchangerList;
  matchMapping.appendChild(matchMappingDiv);
  tableRow.appendChild(matchMapping);

  // add maximum length of matchmapping
  var matchmapLength = document.createElement("td");
  matchmapLength.className = "matchmapLength";
  var exchangesLength = result["exchanges"].map(x => x.length);
  const exchangesLengthSum = exchangesLength.reduce((a, b) => a + b, 0);
  const exchangesAvg = (exchangesLengthSum / exchangesLength.length) || 0;
  matchmapLength.innerHTML = Math.max(...exchangesLength) + " / ";
  matchmapLength.innerHTML += exchangesAvg.toFixed(3);
  tableRow.appendChild(matchmapLength);

  // add num of matches
  var numOfMatchedPairs = document.createElement("td");
  numOfMatchedPairs.className = "compareResult";
  numOfMatchedPairs.innerHTML = result["numOfMatchedPairs"];
  tableRow.appendChild(numOfMatchedPairs);

  // add execution time
  var timeElapsed = document.createElement("td");
  timeElapsed.className = "compareResult";
  timeElapsed.innerHTML = result["timeElapsed"].toFixed(3);
  tableRow.appendChild(timeElapsed);

  compareResult.appendChild(tableRow);
  putToExchangeResultLocator(doc, rawResult);
}


function putToExchangeResultLocator(doc, result) {
  var panelGraph = doc.getElementsByClassName("Comparator")[0]
                      .getElementsByClassName("panelGraph")[0];

  var exchangeResultLocator = panelGraph.getElementsByClassName("dashPanel")[0]
                                        .getElementsByClassName("submitComparison")[0]
                                        .getElementsByClassName("exchangeResultLocator")[0];

  exchangeResultLocator.value += result + "<<separator>>";
}


function getAllExchangeResult(doc) {
  var panelGraph = doc.getElementsByClassName("Comparator")[0]
                      .getElementsByClassName("panelGraph")[0];

  // clear out compare result table to make a new one
  var compareGraph = panelGraph.getElementsByClassName("compareGraph")[0];
  var compareResult = compareGraph.getElementsByClassName("compareResult")[0];       
  compareResult.innerHTML = "";
  var exchangeResultLocator = panelGraph.getElementsByClassName("dashPanel")[0]
                                        .getElementsByClassName("submitComparison")[0]
                                        .getElementsByClassName("exchangeResultLocator")[0];
  exchangeResultLocator.value = "";  

  var dashPanel = panelGraph.getElementsByClassName("dashPanel")[0];
  var datePicker = dashPanel
                      .getElementsByClassName("divDateSelector")[0]
                      .getElementsByClassName("datePicker")[0];
  var currentExchangeDate = datePicker.value;

  if (currentExchangeDate !== "--Pick a Date") {
    // add header to compareResult table
    var headerRow = document.createElement("tr");
    var exchangerNameHeader = document.createElement("th");
    exchangerNameHeader.className = "exchanger";
    exchangerNameHeader.innerHTML = "Exchanger Name";
    headerRow.appendChild(exchangerNameHeader);

    var matchMappingHeader = document.createElement("th");
    matchMappingHeader.className = "matchmap";
    matchMappingHeader.innerHTML = "Match Mapping";
    headerRow.appendChild(matchMappingHeader);

    var maxlengthHeader = document.createElement("th");
    maxlengthHeader.className = "maxlength";
    maxlengthHeader.innerHTML = "Match Map Max/Avg Length";
    headerRow.appendChild(maxlengthHeader);

    var numOfMatchedPairsHeader = document.createElement("th");
    numOfMatchedPairsHeader.className = "numofmatchpair";
    numOfMatchedPairsHeader.innerHTML = "Number of Matched Pair";
    headerRow.appendChild(numOfMatchedPairsHeader);

    var timeElapsedHeader = document.createElement("th");
    timeElapsedHeader.className = "timeelapsed";
    timeElapsedHeader.innerHTML = "Time Elapsed (ms)";
    headerRow.appendChild(timeElapsedHeader);

    compareResult.appendChild(headerRow);

    if (!compareGraph.getElementsByClassName("buttonSubmitComparison")[0]) {
      // add visualization button if not exist
      var visualize = document.createElement("button");
      visualize.className = "buttonSubmitComparison";
      visualize.innerHTML = "Visualize and Find Best Result";
      visualize.onclick = () => {
        createBarPlot(document);
        putBestInExchangeResultLocator(document);
      }
      compareGraph.insertBefore(visualize, compareGraph.children[1]);
    }

    var templateString = "combination";
    for (var i=1; i<6; i++) {
      var classname = templateString + i.toString();
      var combination = dashPanel.getElementsByClassName(classname)[0];
      var exchangerType = combination
                      .getElementsByClassName("exchangerType"+i.toString())[0];
      var exchangerTypeSelector = exchangerType
                      .getElementsByClassName("exchangerTypeSelector"+i.toString())[0];

      var algoDiv = combination.getElementsByClassName("algorithmDiv"+i.toString())[0];
      
      var algorithmType = exchangerTypeSelector.value;
      
      if (algorithmType !== "--Pick an Algorithm") {
        var exchangerObject = {
          "exchangeMethod": algorithmType,
          "dataDate": currentExchangeDate,
        };
        // different body for different exchangerType
        if (algorithmType === "edmond") {
          var thresholdInput = algoDiv.getElementsByClassName("thresholdInput")[0];
          exchangerObject["priorityThreshold"] = thresholdInput.value;
        } else if (algorithmType === "firstaccept") {
          var nChooserInput = algoDiv.getElementsByClassName("nChooserInput")[0];
          exchangerObject["n"] = nChooserInput.value;

          var nMethodInput = algoDiv.getElementsByClassName("methodSelector")[0];
          exchangerObject["nMethod"] = nMethodInput.value;
        } else if (algorithmType === "priority") {
          var nChooserInput = algoDiv.getElementsByClassName("nChooserInput")[0];
          exchangerObject["n"] = nChooserInput.value;

          var nMethodInput = algoDiv.getElementsByClassName("methodSelector")[0];
          exchangerObject["nMethod"] = nMethodInput.value;

          var priorityInput = algoDiv.getElementsByClassName("prioritySelector")[0];
          exchangerObject["priority"] = priorityInput.value;
        }

        // for every single one, do a request of finalized exchange
        getExchangeResult(doc, exchangerObject, "Exchanger "+i.toString());

      } // if algorithm is not defined then ignore
    }
  } else {
    // if dataDate is still placeholder than tell it in the compareResult
    compareResult.innerHTML = "Select Date";
  }
}

function putBestInExchangeResultLocator(doc) {
  // get best result in exchangeResultLocator
  var panelGraph = doc.getElementsByClassName("Comparator")[0]
                      .getElementsByClassName("panelGraph")[0];

  var exchangeResultLocator = panelGraph.getElementsByClassName("dashPanel")[0]
                                        .getElementsByClassName("submitComparison")[0]
                                        .getElementsByClassName("exchangeResultLocator")[0];

  // filter which is best
  var results = []
  exchangeResultLocator.value.split("<<separator>>").forEach((result) => {
    if (result !== "") {
      results.push(JSON.parse(result));
    }
  });
  // find best result from results
  var bestResult = results.reduce((a, b) => a["numOfMatchedPairs"] > b["numOfMatchedPairs"] ? a : b)
  exchangeResultLocator.value = JSON.stringify(bestResult);
}
