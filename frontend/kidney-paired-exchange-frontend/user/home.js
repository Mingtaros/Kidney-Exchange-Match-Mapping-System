function setButtonRoutes(doc) {
  var userHome = doc.getElementsByClassName("UserHome")[0];
  // go to registration page
  var registerButton = userHome.getElementsByClassName("RegisterDonorRecipient")[0]
                               .getElementsByClassName("HomeButton")[0];

  registerButton.onclick = () => {
    location.href = "register.html";
  };

  // go to see match result
  var seeMatchingResult = userHome.getElementsByClassName("SeeMatchingResult")[0]
                                  .getElementsByClassName("HomeButton")[0];
  
  seeMatchingResult.onclick = () => {
    location.href = "inputPairDate.html";
  };
}