// IMPORTED FROM ../Utils/constants.js
//    - DJANGO_URL

function addPostNewPairFunctionality(doc) {
  var registerButton = doc.getElementsByClassName("RegistrationPage")[0]
                         .getElementsByClassName("RegisterPair")[0]
                         .getElementsByClassName("RegisterButton")[0];
  registerButton.onclick = () => {
    var registrationPage = doc.getElementsByClassName("RegistrationPage")[0];
    // find parameters
    var donorName = registrationPage.getElementsByClassName("DonorInformations")[0]
                                    .getElementsByClassName("DonorRecipientInput")[0]
                                    .getElementsByClassName("DonorName")[0];
    var donorBloodtype = registrationPage.getElementsByClassName("DonorInformations")[0]
                                    .getElementsByClassName("DonorRecipientInput")[1]
                                    .getElementsByClassName("DonorBloodtype")[0];
    var recipientName = registrationPage.getElementsByClassName("RecipientInformations")[0]
                                    .getElementsByClassName("DonorRecipientInput")[0]
                                    .getElementsByClassName("RecipientName")[0];
    var recipientBloodtype = registrationPage.getElementsByClassName("RecipientInformations")[0]
                                    .getElementsByClassName("DonorRecipientInput")[1]
                                    .getElementsByClassName("RecipientBloodtype")[0];
    var donorRecipientPRA = registrationPage.getElementsByClassName("RecipientInformations")[0]
                                    .getElementsByClassName("PRAInput")[0]
                                    .getElementsByClassName("PairPRA")[0];
    var donorRecipientEmail = registrationPage.getElementsByClassName("PairEmail")[0]
                                    .getElementsByClassName("PairEmailAddress")[0];

    // do a request with parameters got above
    var xmlhttp = new XMLHttpRequest();
    const url = DJANGO_URL + "/postNewPair";
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    var requestBody = {
      "donorName": donorName.value,
      "donorBloodtype": donorBloodtype.value,
      "recipientName": recipientName.value,
      "recipientBloodtype": recipientBloodtype.value,
      "pra": donorRecipientPRA.value,
      "email": donorRecipientEmail.value,
    }
    xmlhttp.send(JSON.stringify(requestBody));

    xmlhttp.onload = function () {
      completeRegistration(JSON.parse(xmlhttp.responseText));
    }
  }
}


function completeRegistration(result) {
  // set new pair number for the "registration complete page"
  var pairNum = result["pairNum"];
  location.href = "registrationComplete.html?" + "pairNum=" + pairNum;
}
