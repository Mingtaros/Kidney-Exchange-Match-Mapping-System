// IMPORTED FROM Utils/constants.js
//    - DJANGO_URL
// IMPORTED FROM assignedPage.js
//    - assignedPage
// IMPORTED FROM notAssignedPage.js
//    - notAssignedPage

function assignOrNot(pairNumber, registrationDate) {
  var xmlhttp = new XMLHttpRequest();
  var url = DJANGO_URL + "/getMatchedPairs?";
  url += "dataDate=" + registrationDate;
  xmlhttp.open("GET", url, true);
  xmlhttp.send();

  xmlhttp.onload = function () {
    const result = JSON.parse(xmlhttp.responseText);
    const flatMatchedPairs = result["matchedPairs"].flat();
    if (flatMatchedPairs.includes(pairNumber)) {
      // create "You have been assigned" page
      assignedPage(document, pairNumber, result["matchedPairs"], registrationDate);
    } else {
      // dreate "Unfortunately" page
      notAssignedPage(document, pairNumber);
    }
  }
}
