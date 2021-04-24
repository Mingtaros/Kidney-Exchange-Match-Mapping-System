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


function findPairsInMatchMap(pairNumber, matchedPairs) {
  for (let i=0; i<matchedPairs.length; i++) {
    if (matchedPairs[i].includes(pairNumber)) {
      return matchedPairs[i];
    }
  }
}


function requestTableElements(doc, registrationDate, pairNumber, pairsInMatchMap) {
  var xmlhttp = new XMLHttpRequest();
  var url = DJANGO_URL + "/getDataOnPairNumbers?";
  url += "dataDate=" + registrationDate;
  url += "&pairNumbers=" + JSON.stringify(pairsInMatchMap);
  xmlhttp.open("GET", url, true);
  xmlhttp.send();

  xmlhttp.onload = function () {
    addTableElements(doc, pairNumber, JSON.parse(xmlhttp.responseText));
  }
}

function addTableElements(doc, pairNumber, result) {
  var dataTableDiv = doc.getElementsByClassName("MatchingResult")[0]
                        .getElementsByClassName("goodNews")[0]
                        .getElementsByClassName("dataTableDiv")[0];

  result.data.forEach((pair_data) => {
    // create table element with grid
    var childDataTable = document.createElement("div");
    
    // create components
    const pair_num = pair_data[0];
    var pairNum = document.createElement("div");
    pairNum.className = "pairNum";
    
    var paragraphPairNum = document.createElement("p");
    paragraphPairNum.className = "pairNum";
    paragraphPairNum.innerHTML = "<b>" + pair_num + "</b>";
    pairNum.appendChild(paragraphPairNum)
    
    if (pairNumber === pair_num) {
      childDataTable.className = "YOUchildDataTable";
      paragraphPairNum.innerHTML += "(This is You)";
    } else {
      childDataTable.className = "divChildDataTable";
    }

    var donor = document.createElement("div");
    donor.className = "donorRecipient";
    donor.innerHTML = "<b>Donor</b>";
    var recipient = document.createElement("div");
    recipient.className = "donorRecipient";
    recipient.innerHTML = "<b>Recipient</b>";

    const donor_name = pair_data[1];
    var donorName = document.createElement("div");
    donorName.className = "childElement";
    donorName.innerHTML = donor_name;

    const donor_bloodtype = pair_data[2];
    var donorBloodtype = document.createElement("div");
    donorBloodtype.className = "childElement";
    donorBloodtype.innerHTML = donor_bloodtype;

    const recipient_name = pair_data[3];
    var recipientName = document.createElement("div");
    recipientName.className = "childElement";
    recipientName.innerHTML = recipient_name;

    const recipient_bloodtype = pair_data[4];
    var recipientBloodtype = document.createElement("div");
    recipientBloodtype.className = "childElement";
    recipientBloodtype.innerHTML = recipient_bloodtype;

    const pra = pair_data[5];
    var praValue = document.createElement("div");
    praValue.className = "pra";
    var paragraphPRA = document.createElement("p");
    paragraphPRA.className = "pra";
    paragraphPRA.innerHTML = pra + " %";
    praValue.appendChild(paragraphPRA);

    const email = pair_data[6];
    var eMail = document.createElement("div");
    eMail.className = "email";
    var paragraphEmail = document.createElement("p");
    paragraphEmail.innerHTML = email;
    paragraphEmail.className = "email";
    eMail.appendChild(paragraphEmail);

    // insert to child data table
    childDataTable.appendChild(pairNum);
    childDataTable.appendChild(donor);
    childDataTable.appendChild(donorName);
    childDataTable.appendChild(donorBloodtype);
    childDataTable.appendChild(recipient);
    childDataTable.appendChild(recipientName);
    childDataTable.appendChild(recipientBloodtype);
    childDataTable.appendChild(praValue);
    childDataTable.appendChild(eMail);

    // insert child data to master data
    dataTableDiv.appendChild(childDataTable);
  })
}


function assignedPage(doc, pairNumber, matchedPairs) {
  var pairsInMatchMap = findPairsInMatchMap(pairNumber, matchedPairs);
  var thisPage = doc.getElementsByClassName("MatchingResult")[0];
  var goodNews = doc.createElement("div");
  goodNews.className = "goodNews";

  var assignedNewsDiv = document.createElement("div");
  assignedNewsDiv.className = "assignedNewsDiv";
  var assignedNews = document.createElement("p");
  assignedNews.className = "assignedNews";
  assignedNews.innerHTML = pairNumber + ", You have been Assigned to an Operation!";
  assignedNewsDiv.appendChild(assignedNews);
  goodNews.appendChild(assignedNewsDiv);

  var detailDiv = document.createElement("div");
  detailDiv.className = "detailDiv";
  var detailText = document.createElement("p");
  detailText.className = "detailText";
  detailText.innerHTML = "Your Matching Pairs are as follows: " + pairsInMatchMap.join(" --> ")
  detailDiv.appendChild(detailText);
  goodNews.appendChild(detailDiv);

  // create data table of cycle
  var dataTableDiv = document.createElement("div");
  dataTableDiv.className = "dataTableDiv";
  // add table header
  var dataTableHeader = document.createElement("div");
  dataTableHeader.className = "dataTableHeader";
  var headerPairNum = document.createElement("div");
  headerPairNum.className = "headerColumn";
  headerPairNum.innerHTML = "Pair Number";
  var headerDonorRecipient = document.createElement("div");
  headerDonorRecipient.className = "headerColumn";
  headerDonorRecipient.innerHTML = "Donor / Recipient";
  var headerName = document.createElement("div");
  headerName.className = "headerColumn";
  headerName.innerHTML = "Name";
  var headerBloodtype = document.createElement("div");
  headerBloodtype.className = "headerColumn";
  headerBloodtype.innerHTML = "Blood Type";
  var headerPRA = document.createElement("div");
  headerPRA.className = "headerColumn";
  headerPRA.innerHTML = "PRA";
  var headerEmail = document.createElement("div");
  headerEmail.className = "headerColumn";
  headerEmail.innerHTML = "Email Address";

  dataTableHeader.appendChild(headerPairNum);
  dataTableHeader.appendChild(headerDonorRecipient);
  dataTableHeader.appendChild(headerName);
  dataTableHeader.appendChild(headerBloodtype);
  dataTableHeader.appendChild(headerPRA);
  dataTableHeader.appendChild(headerEmail);
  dataTableDiv.appendChild(dataTableHeader);

  goodNews.append(dataTableDiv);
  
  // add operation details
  var operationDetailDiv = document.createElement("div");
  operationDetailDiv.className = "operationDetailDiv";

  var numOfExchangeDiv = document.createElement("div");
  var numOfExchange = document.createElement("p");
  numOfExchange.innerHTML = pairsInMatchMap.length + "-way Exchange Operation will be Performed in:";
  numOfExchangeDiv.appendChild(numOfExchange);
  operationDetailDiv.appendChild(numOfExchangeDiv);

  var operationLocationDiv = document.createElement("div");
  operationLocationDiv.className = "operationDetailLocTime";
  var locationName = document.createElement("p");
  locationName.className = "loctimeBoldRight";
  locationName.innerHTML = "<b>Location:</b>";
  operationLocationDiv.appendChild(locationName);
  var locationDetail = document.createElement("p");
  locationDetail.className = "loctimeNormalLeft";
  locationDetail.innerHTML = "RSUD Not An Actual Hospital";
  operationLocationDiv.appendChild(locationDetail);
  operationDetailDiv.appendChild(operationLocationDiv);

  var operationTimeDiv = document.createElement("div");
  operationTimeDiv.className = "operationDetailLocTime";
  var timeName = document.createElement("p");
  timeName.className = "loctimeBoldRight";
  timeName.innerHTML = "<b>Time:</b>";
  operationTimeDiv.appendChild(timeName);
  var timeDetail = document.createElement("p");
  timeDetail.className = "loctimeNormalLeft";
  timeDetail.innerHTML = "February 31st, 2021; 11.00 GMT + 07.00";
  operationTimeDiv.appendChild(timeDetail);
  operationDetailDiv.appendChild(operationTimeDiv);

  goodNews.append(operationDetailDiv);

  // add back to home button
  var backToHome = document.createElement("div");
  var backToHomeButton = document.createElement("button");
  backToHomeButton.className = "backToHomeButton";
  backToHomeButton.innerHTML = "Back to Home Page";
  backToHomeButton.onclick = () => {
    location.href = "home.html";
  }
  backToHome.appendChild(backToHomeButton);
  goodNews.appendChild(backToHome);
  thisPage.appendChild(goodNews);
  
  // add table elements
  requestTableElements(doc, registrationDate, pairNumber, pairsInMatchMap);
  

}

function notAssignedPage(doc, pairNumber) {
  console.log("tidak hadir")
}
