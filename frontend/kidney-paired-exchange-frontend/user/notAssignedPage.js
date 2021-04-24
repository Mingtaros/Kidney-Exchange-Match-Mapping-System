function notAssignedPage(doc, pairNumber) {
  var thisPage = doc.getElementsByClassName("MatchingResult")[0];
  var badNews = document.createElement("div");
  badNews.className = "badNews";

  // add not assigned news div
  var notAssignedNewsDiv = document.createElement("div");
  notAssignedNewsDiv.className = "notAssignedNewsDiv";
  var notAssignedNews = document.createElement("p");
  notAssignedNews.className = "notAssignedNews";
  notAssignedNews.innerHTML = pairNumber + ", You haven't Got Any Matching Pair Yet!";
  notAssignedNewsDiv.appendChild(notAssignedNews);
  badNews.appendChild(notAssignedNewsDiv);

  // add not assigned details
  var detailDiv = document.createElement("div");
  detailDiv.className = "detailDiv";
  var detailText = document.createElement("p");
  detailText.className = "detailText";
  detailText.innerHTML = "Don't worry! We will try our best to find a perfect match for you!";
  detailDiv.appendChild(detailText);
  badNews.appendChild(detailDiv);

  // add back to home button
  var backToHome = document.createElement("div");
  var backToHomeButton = document.createElement("button");
  backToHomeButton.className = "backToHomeButton";
  backToHomeButton.innerHTML = "Back to Home Page";
  backToHomeButton.onclick = () => {
    location.href = "home.html";
  }
  backToHome.appendChild(backToHomeButton);
  badNews.appendChild(backToHome);
  thisPage.appendChild(badNews);
}
