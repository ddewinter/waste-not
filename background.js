function onNavigatingToFacebook(details) {
  console.log("onBeforeNavigate: %s", details.url);
  
  // Ideas:
  //   1. Shouldn't stay up too late or waste time early in the day: Block at certain times of day.
  //   2. Should discourage one-off distractions:
  //       a. Delay before access (30s).
  //       b. Limit total amount of time per day - put a timer on the page.
  //       c. Large amount of time in between accesses - e.g. 25 minutes
  
  
  
  var tabUpdate = { url: chrome.extension.getURL("replacement.html") };
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
