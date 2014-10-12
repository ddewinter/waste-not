function onNavigatingToFacebook(details) {
  console.log("onBeforeNavigate: " + details.url);
  
  var tabUpdate = { url: chrome.extension.getURL("replacement.html") };
  console.log("jsRunner: " + tabUpdate.url);
  chrome.tabs.update(details.tabId, tabUpdate);
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
