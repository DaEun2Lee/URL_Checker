let blacklist = [];

// Function to load JSON file
function loadJsonFile(filePath) {
  return fetch(browser.runtime.getURL(filePath))
    .then(response => response.json());
}

// Load blacklist from JSON file
loadJsonFile("lists/blacklist.json")
  .then(data => {
    blacklist = data;
    console.log("Blacklist loaded successfully");
  })
  .catch(error => console.error("Error loading blacklist:", error));

// Check if URL contains any string from a list
function checkUrl(url, list) {
  // Extract domain from URL
  const domain = url.split('/')[2]; // Assuming URLs are standard and start with http:// or https://

  return list.some(item => {
    if (domain.includes(item.domain)) {
      return true;
    }
    return false;
  });
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

// Show warning message
function showWarning(url) {
  browser.notifications.create({
    "type": "basic",
    "iconUrl": browser.runtime.getURL("icons/icon-48.png"),
    "title": "Warning",
    "message": `The URL ${url} is in the blacklist!`
  });

    // Handle button click event
    browser.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
      if (notificationId && buttonIndex === 0) { // 'Continue' button clicked
        browser.tabs.update(tabId, { url: url });
        browser.notifications.clear(notificationId);
      }
    });
}

// Handle web requests
browser.webRequest.onBeforeRequest.addListener(
  async (details) => {
    const url = details.url;
    const tabId = details.tabId;

    if (checkUrl(url, blacklist)) {
      console.log("URL is in the blacklist.");
      showWarning(url);
      return { cancel: true };
    } else {
      console.log("URL is not in the blacklist.");
      storeInGrayList(url);
      return { cancel: false };
    }
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);