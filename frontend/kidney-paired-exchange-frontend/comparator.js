// IMPORTED FROM Utils/constants.js
//    - DJANGO_URL
// IMPORTED FROM createTableComparison.js
//    - getAllExchangeResult

// get all Comparable Data Dates
function initializePanel(doc){
  var xmlhttp = new XMLHttpRequest();
  const url = DJANGO_URL + "/getAllDate";
  xmlhttp.open("GET", url, true);
  xmlhttp.send();

  xmlhttp.onload = function () {
    putDatesOptions(doc, JSON.parse(xmlhttp.responseText));
    setCombinations(doc);
  }
}


function putDatesOptions(doc, result) {
  var datePicker = doc.getElementsByClassName("Comparator")[0]
                      .getElementsByClassName("panelGraph")[0]
                      .getElementsByClassName("dashPanel")[0]
                      .getElementsByClassName("divDateSelector")[0]
                      .getElementsByClassName("datePicker")[0];

  var dataDates = result.data;
  dataDates.sort()
  // append datePicker with options
  dataDates.forEach((date) => {
    var opt = document.createElement('option');
    opt.value = date;
    opt.innerHTML = date;
    datePicker.appendChild(opt);
  });
}


function setCombinations(doc) {
  var dashPanel = doc.getElementsByClassName("Comparator")[0]
                     .getElementsByClassName("panelGraph")[0]
                     .getElementsByClassName("dashPanel")[0];

  var templateString = "combination";
  for (var i=1; i<6; i++) {
    var classname = templateString + i.toString();
    var comparator = dashPanel.getElementsByClassName(classname)[0];

    var exchangerName = document.createElement("p");
    exchangerName.className = "exchangerName";
    exchangerName.innerHTML = "Exchanger " + i.toString();
    comparator.appendChild(exchangerName);

    // add exchanger Type (Algoprithm)
    var exchangerType = document.createElement("div");
    exchangerType.className = "exchangerType" + i.toString();
    
    var exchangerTypeName = document.createElement("p");
    exchangerTypeName.className = "pExchanger";
    exchangerTypeName.innerHTML = "Algorithm";
    exchangerType.appendChild(exchangerTypeName);

    var exchangerTypeSelector = document.createElement("select");
    exchangerTypeSelector.className = "exchangerTypeSelector" + i.toString()
    var placeholderOption = document.createElement("option");
    placeholderOption.value = "--Pick an Algorithm";
    placeholderOption.innerHTML = "--Pick an Algorithm";
    exchangerTypeSelector.appendChild(placeholderOption);

    // append exchanger types
    EXCHANGER_TYPES.forEach((currentType) => {
      var exchangerOption = document.createElement("option");
      exchangerOption.value = currentType[1];
      exchangerOption.innerHTML = currentType[0];
      exchangerTypeSelector.appendChild(exchangerOption);
    });
    exchangerType.appendChild(exchangerTypeSelector);

    var algorithmDiv = document.createElement("div");
    algorithmDiv.className = "algorithmDiv" + i.toString();
    exchangerType.appendChild(algorithmDiv);
    comparator.appendChild(exchangerType);

  }
  // add comparison submitter
  var submitDiv = dashPanel.getElementsByClassName("submitComparison")[0];

  var submitComparisonButton = document.createElement("button");
  submitComparisonButton.className = "buttonSubmitComparison";
  submitComparisonButton.innerHTML = "Show Comparison";
  submitComparisonButton.onclick = () => {
    getAllExchangeResult(doc);
  }
  submitDiv.appendChild(submitComparisonButton);

  var sendEmailPostBestResult = document.createElement("button");
  sendEmailPostBestResult.className = "buttonSubmitComparison";
  sendEmailPostBestResult.innerHTML = "Publish Matching with Best Result";
  sendEmailPostBestResult.onclick = () => {
    var dashPanel = doc.getElementsByClassName("Comparator")[0]
                       .getElementsByClassName("panelGraph")[0]
                       .getElementsByClassName("dashPanel")[0];
    
    var exchangeResultLocator = dashPanel.getElementsByClassName("submitComparison")[0]
                                         .getElementsByClassName("exchangeResultLocator")[0];

    var datePicker = dashPanel.getElementsByClassName("divDateSelector")[0]
                              .getElementsByClassName("datePicker")[0];
    
    if (exchangeResultLocator.value !== "") {
      // send email and post best matching result into db
      var dataDate = datePicker.value;
      sendEmailRequest(dataDate);
      postBestResult(dataDate, exchangeResultLocator);
    } // if still empty, not doing anything
  }
  submitDiv.appendChild(sendEmailPostBestResult);

  onChangeSelectExchangeType(doc);
}


function onChangeSelectExchangeType(doc) {
  var dashPanel = doc.getElementsByClassName("Comparator")[0]
                     .getElementsByClassName("panelGraph")[0]
                     .getElementsByClassName("dashPanel")[0];

  var templateString = "combination";
  for (var i=1; i<6; i++) {
    var classname = templateString + i.toString();
    var comparator = dashPanel.getElementsByClassName(classname)[0];
    var exchangerType = comparator
                    .getElementsByClassName("exchangerType"+i.toString())[0];
    var exchangerTypeSelector = exchangerType
                    .getElementsByClassName("exchangerTypeSelector"+i.toString())[0];

    // add onchange event listener for exchanger types
    exchangerTypeSelector.addEventListener("change", (event) => {
      // get algorithmDiv
      var num = event.target.className.slice(-1);
      var algoDiv = event.target.parentNode
                    .getElementsByClassName("algorithmDiv"+num)[0];
      algoDiv.innerHTML = "";

      // adding parameter based on algorithm
      var typeSelected = event.target.value;
      if (typeSelected === "edmond") {
        edmondsFillDiv(algoDiv);
      } else if (typeSelected === "firstaccept") {
        firstAcceptFillDiv(algoDiv);
      } else if (typeSelected === "priority") {
        priorityBasedFillDiv(algoDiv);
      }
    });
  }
}


function edmondsFillDiv(algoDiv) {
  // input priority threshold
  var thresholdName = document.createElement("p");
  thresholdName.className = "pExchanger";
  thresholdName.innerHTML = "Priority Threshold";
  algoDiv.appendChild(thresholdName);

  var thresholdInput = document.createElement("input");
  thresholdInput.className = "thresholdInput";
  thresholdInput.placeholder = "Input priority threshold";
  algoDiv.appendChild(thresholdInput);
}


function firstAcceptFillDiv(algoDiv) {
  // input N
  var nChooserName = document.createElement("p");
  nChooserName.className = "pExchanger";
  nChooserName.innerHTML = "N";
  algoDiv.appendChild(nChooserName);

  var nChooserInput = document.createElement("input");
  nChooserInput.className = "nChooserInput";
  nChooserInput.placeholder = "Input number of N";
  algoDiv.appendChild(nChooserInput);

  // select method
  var nMethodName = document.createElement("p");
  nMethodName.className = "pExchanger";
  nMethodName.innerHTML = "Method";
  algoDiv.appendChild(nMethodName);

  var nMethodSelector = document.createElement("select");
  nMethodSelector.className = "methodSelector";
  N_METHODS.forEach((methodType) => {
    var methodOption = document.createElement("option");
    methodOption.value = methodType[1];
    methodOption.innerHTML = methodType[0];
    nMethodSelector.appendChild(methodOption);
  });
  algoDiv.appendChild(nMethodSelector);
}


function priorityBasedFillDiv(algoDiv) {
  // input N
  var nChooserName = document.createElement("p");
  nChooserName.className = "pExchanger";
  nChooserName.innerHTML = "N";
  algoDiv.appendChild(nChooserName);

  var nChooserInput = document.createElement("input");
  nChooserInput.className = "nChooserInput";
  nChooserInput.placeholder = "Input number of N";
  algoDiv.appendChild(nChooserInput);

  // select method
  var nMethodName = document.createElement("p");
  nMethodName.className = "pExchanger";
  nMethodName.innerHTML = "Method";
  algoDiv.appendChild(nMethodName);

  var nMethodSelector = document.createElement("select");
  nMethodSelector.className = "methodSelector";
  N_METHODS.forEach((methodType) => {
    var methodOption = document.createElement("option");
    methodOption.value = methodType[1];
    methodOption.innerHTML = methodType[0];
    nMethodSelector.appendChild(methodOption);
  });
  algoDiv.appendChild(nMethodSelector);

  // select priority calculating method
  var priorityMethodName = document.createElement("p");
  priorityMethodName.className = "pExchanger";
  priorityMethodName.innerHTML = "Priority";
  algoDiv.appendChild(priorityMethodName);

  var prioritySelector = document.createElement("select");
  prioritySelector.className = "prioritySelector";
  PRIORITY_TYPES.forEach((priorityType) => {
    var priorityOption = document.createElement("option");
    priorityOption.value = priorityType[1];
    priorityOption.innerHTML = priorityType[0];
    prioritySelector.appendChild(priorityOption);
  });
  algoDiv.appendChild(prioritySelector);
}


function sendEmailRequest(dataDate) {
  var xmlhttp = new XMLHttpRequest();
  const url = DJANGO_URL + "/sendEmail";
  xmlhttp.open("POST", url, true);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  var requestBody = {
    "dataDate": dataDate,
  }
  xmlhttp.send(JSON.stringify(requestBody));
}


function postBestResult(dataDate, resultLocator) {
  var exchangerResult = JSON.parse(resultLocator.value)["exchanges"];
  var exchanges = exchangerResult.toString();

  var xmlhttp = new XMLHttpRequest();
  const url = DJANGO_URL + "/saveBestResult";
  xmlhttp.open("POST", url, true);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  var requestBody = {
    "dataDate": dataDate,
    "cycles": exchanges,
  }
  xmlhttp.send(JSON.stringify(requestBody));
}
