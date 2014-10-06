function onNavigatingToFacebook(event) {
  console.log(event.url);
}

if (chrome.webNavigation && chrome.webNavigation.onBeforeNavigate) {
  chrome.webNavigation.onBeforeNavigate.addListener(
    onNavigatingToFacebook,
    {
      url: [ { hostContains: "facebook.com" } ]
    }
  );
}
else {
  console.error("Waste Not: WebNavigation not enabled.");
}
