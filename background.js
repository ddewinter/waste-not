function onNavigatingToFacebook(details) {
  chrome.tabs.get(
    details.tabId,
    function (tab) {
      console.log("onBeforeNavigate: %s. Tab URL: %s", details.url, tab.url);
      
      // http://facebook.com is normalized to http://www.facebook.com by the tab's URL property.
      if (details.url !== tab.url && details.url !== "http://facebook.com") {
        // If this is a Connect request or other background FB request, don't take any action.
        return;
      }
      
      // Ideas:
      //   1. Shouldn't stay up too late or waste time early in the day: Block at certain times of day.
      //   2. Should discourage one-off distractions:
      //       a. Delay before access (30s).
      //       b. Limit total amount of time per day - put a timer on the page.
      //       c. Large amount of time in between accesses - e.g. 25 minutes
      
      chrome.storage.sync.get(
        "lastSession",
        function (items) {
          var lastSession = items.lastSession || {};
          console.log("Last Session Info. Tab Id: %d. Time: %d", lastSession.tabId, lastSession.time);
          
          // Same session; ignore.
          if (details.tabId === lastSession.tabId) {
            return;
          }
          
          // If we're not in the same tab and it hasn't been 25 minutes since the last session started.
          if (details.tabId !== lastSession.tabId && (new Date().getTime() - lastSession.time) < (1000 * 60 * 25)) {
            var tabUpdate = { url: chrome.extension.getURL("replacement.html") };
            chrome.tabs.update(details.tabId, tabUpdate);
            return;
          }
          
          lastSession = { tabId: details.tabId, time: new Date().getTime() };
          chrome.storage.sync.set({ lastSession: lastSession });
          console.log("New session detected. Saving info. Tab Id: %d. Time: %d", lastSession.tabId, lastSession.time);
        });
    }
  );
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

chrome.storage.sync.set({ lastSession: null });
console.log("Reset last session.");