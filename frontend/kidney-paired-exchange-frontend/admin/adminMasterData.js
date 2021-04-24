// IMPORTED FROM Utils/constants.js
//    - DJANGO_URL

// get all Dates
function getAllDate(doc){
  var xmlhttp = new XMLHttpRequest();
  const url = DJANGO_URL + "/getAllDate";
  xmlhttp.open("GET", url, true);
  xmlhttp.send();

  xmlhttp.onload = function () {
    putDatesInSelection(doc, JSON.parse(xmlhttp.responseText))
  }
}


function putDatesInSelection(doc, result) {
  var admin = doc.getElementsByClassName("Admin")[0];
  var divDatePicker = admin.getElementsByClassName("divDatePicker")[0]
  var datePicker = divDatePicker.getElementsByClassName("datePicker")[0];

  var dataDates = result.data;
  dataDates.sort()
  // append datePicker with options
  dataDates.forEach((date) => {
    var opt = document.createElement('option');
    opt.value = date;
    opt.innerHTML = date;
    datePicker.appendChild(opt);
  });

  // add onchange listener to datePicker
  datePicker.addEventListener("change", () => {
    var date = datePicker.value;
    getDataDate(date, doc);
  });
}


// get Data from given Date
function getDataDate(date, doc) {
  var admin = doc.getElementsByClassName("Admin")[0];
  var divDatePicker = admin.getElementsByClassName("divDatePicker")[0]
  var datePicker = divDatePicker.getElementsByClassName("datePicker")[0];

  if (datePicker.value !== "--Pick a Date") {
    let xmlhttp = new XMLHttpRequest();
    const url = DJANGO_URL + "/getData?dataDate=" + date;
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    xmlhttp.onload = function () {
      showDonorRecipientData(date, doc, JSON.parse(xmlhttp.responseText))
    }
  } else {
    // do nothing before datePicker use value
  }
}


function showDonorRecipientData(date, doc, result) {
  var admin = doc.getElementsByClassName("Admin")[0];
  var masterDataTable = admin.getElementsByClassName("divMasterDataTable")[0];
  masterDataTable.innerHTML = ''; // clear the table after date change

  // add table header
  var masterDataHeader = document.createElement("div");
  masterDataHeader.className = "masterDataHeader";
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
  
  masterDataHeader.appendChild(headerPairNum);
  masterDataHeader.appendChild(headerDonorRecipient);
  masterDataHeader.appendChild(headerName);
  masterDataHeader.appendChild(headerBloodtype);
  masterDataHeader.appendChild(headerPRA);
  masterDataHeader.appendChild(headerEmail);
  masterDataTable.appendChild(masterDataHeader);

  result.data.forEach((pair_data) => {
    // create table element with grid
    var childDataTable = document.createElement("div");
    childDataTable.className = "divChildDataTable";

    // create components
    const pair_num = pair_data[0];
    var pairNum = document.createElement("div");
    pairNum.className = "pairNum";

    var paragraphPairNum = document.createElement("p");
    paragraphPairNum.className = "pairNum";
    paragraphPairNum.innerHTML = "<b>" + pair_num + "</b>";
    pairNum.appendChild(paragraphPairNum)

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
    masterDataTable.appendChild(childDataTable);
  })

  // show number of pairs
  var divNumCalculate = admin.getElementsByClassName("divNumCalculate")[0];
  var divNumberOfPairs = divNumCalculate.getElementsByClassName("divNumberOfPairs")[0];
  var numberOfPairs = divNumberOfPairs.getElementsByClassName("numberOfPairs")[0];
  numberOfPairs.innerHTML = "Number of Pairs: <b>" + result.data.length + "</b> pairs";

  // create calculate exchange for this data button
  var divCalculateExchange = divNumCalculate.getElementsByClassName("calculateExchangeButton")[0];
  divCalculateExchange.innerHTML = "";
  var exchangeButton = document.createElement("button");
  exchangeButton.className = "goToComparator";
  exchangeButton.onclick = () => {
    location.href = "comparator.html"
  }
  exchangeButton.innerHTML = "Compare Performances for Data";
  divCalculateExchange.appendChild(exchangeButton);
}
