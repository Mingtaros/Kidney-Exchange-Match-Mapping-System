// IMPORTED FROM ../Utils/constants.js
//    - DJANGO_URL

function getAllDate(doc) {
  // get all dates and put them in date selector
  var xmlhttp = new XMLHttpRequest();
  const url = DJANGO_URL + "/getAllDate";
  xmlhttp.open("GET", url, true);
  xmlhttp.send();

  xmlhttp.onload = function () {
    putDatesInRegistrationSelection(doc, JSON.parse(xmlhttp.responseText));
  }
}


function putDatesInRegistrationSelection(doc, result) {
  var dataDates = result.data;
  dataDates.sort()
  var registrationDateSelector = doc.getElementsByClassName("InputPairDate")[0]
                                    .getElementsByClassName("RegistrationData")[0]
                                    .getElementsByClassName("RegistrationDate")[0]
                                    .getElementsByClassName("RegistrationDateSelector")[0];

  dataDates.forEach((date) => {
    var opt = document.createElement('option');
    opt.value = date;
    opt.innerHTML = date;
    registrationDateSelector.appendChild(opt);
  });
}


function implementSeeButtonOnClick(doc) {
  // implement onclick to "See Matching Result" button
  var seeMatchingResult = doc.getElementsByClassName("InputPairDate")[0]
                             .getElementsByClassName("SeeMatchingResult")[0]
                             .getElementsByClassName("SeeMatchingResultButton")[0];

  seeMatchingResult.onclick = () => {
    var registrationData = document.getElementsByClassName("InputPairDate")[0]
                                   .getElementsByClassName("RegistrationData")[0];

    var registrationDateSelector = registrationData.getElementsByClassName("RegistrationDate")[0]
                                   .getElementsByClassName("RegistrationDateSelector")[0];
    var pairNumberInput = registrationData.getElementsByClassName("RegistrationPairNumber")[0]
                                   .getElementsByClassName("PairNumber")[0];
    // relocate to result onclick (with registration date and pair number as parameters)
    var relocate = "result.html?" + "pairNum=" + pairNumberInput.value;
    relocate += "&registrationDate=" + registrationDateSelector.value;

    location.href = relocate;
  }
}
