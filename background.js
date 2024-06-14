let blacklist = [];
let whitelist = [];

// Load blacklist and whitelist from JSON files
fetch(browser.runtime.getURL("lists/blacklist.json"))
  .then(response => response.json())
  .then(data => {
    blacklist = data;
  })
  .catch(error => console.error("Error loading blacklist:", error));

fetch(browser.runtime.getURL("lists/whitelist.json"))
  .then(response => response.json())
  .then(data => {
    whitelist = data;
  })
  .catch(error => console.error("Error loading whitelist:", error));

// Check if URL is in a list
function checkUrl(url, list) {
  return list.includes(url);
}

// Store URL in gray list
function storeInGrayList(url) {
  browser.storage.local.get("graylist", (result) => {
    let graylist = result.graylist || [];
    if (!graylist.includes(url)) {
      graylist.push(url);
      browser.storage.local.set({ graylist: graylist });
    }
  });
}

// Handle tab updates
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.active) {
    const url = tab.url;

    if (checkUrl(url, blacklist)) {
      console.log("URL is in the blacklist.");
    } else if (checkUrl(url, whitelist)) {
      console.log("URL is in the whitelist.");
    } else {
      console.log("URL is not in any list. Adding to gray list.");
      storeInGrayList(url);
    }
  }
});
