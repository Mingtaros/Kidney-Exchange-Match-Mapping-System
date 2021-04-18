// IMPORTED FROM Utils/constants.js
//    - DJANGO_URL

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
    addToBarPlot(doc, JSON.parse(xmlhttp.responseText), exchangerName);
  }
}


// bar plot of comparisons
function addToBarPlot(doc, result, exchangerName) {
  // table representation
  var barPlot = doc.getElementsByClassName("Comparator")[0]
                   .getElementsByClassName("panelGraph")[0]
                   .getElementsByClassName("compareGraph")[0]
                   .getElementsByClassName("barPlot")[0];

  var barLength = result["numOfMatchedPairs"];
  var barLabel = result["numOfMatchedPairs"].toString() + " pairs; "
  barLabel += result["timeElapsed"].toFixed(3) + " ms";

  // make a table row
  var tableRow = document.createElement("tr");

  // create exchanger name
  var exchangerNameColumn = document.createElement("td");
  exchangerNameColumn.innerHTML = exchangerName;
  tableRow.appendChild(exchangerNameColumn);

  // create bar length
  for (var i=0; i<barLength; i++) {
    var tableColumn = document.createElement("td");
    tableColumn.style.backgroundColor = "aqua";
    tableRow.appendChild(tableColumn);
  }

  for (var j=barLength; j<100; j++) {
    var whiteColumn = document.createElement("td");
    tableRow.appendChild(whiteColumn);
  }

  // add label of the corresponding bar
  var labelColumn = document.createElement("td");
  labelColumn.innerHTML = barLabel;
  tableRow.appendChild(labelColumn);

  barPlot.appendChild(tableRow);
}


function getAllExchangeResult(doc) {
  var panelGraph = doc.getElementsByClassName("Comparator")[0]
                      .getElementsByClassName("panelGraph")[0];

  // clear out bar plot and make a new one
  var barPlot = panelGraph.getElementsByClassName("compareGraph")[0]
                          .getElementsByClassName("barPlot")[0];
  barPlot.innerHTML = "";

  var dashPanel = panelGraph.getElementsByClassName("dashPanel")[0];
  var datePicker = dashPanel
                      .getElementsByClassName("divDateSelector")[0]
                      .getElementsByClassName("datePicker")[0];
  var currentExchangeDate = datePicker.value;

  if (currentExchangeDate !== "--Pick a Date") {
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
  } // if dataDate is still placeholder than not doing anything 
}
