function onNavigatingToFacebook(details) {
  console.log("onBeforeNavigate: " + details.url);
  
  chrome.tabs.get(
    details.tabId, 
    function (tab) {
      // Not quite fast enough...leaves the page half-loaded
      var jsRunner = { 'code': 'window.stop();' };
      chrome.tabs.executeScript(tab.id, jsRunner);
    });
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
