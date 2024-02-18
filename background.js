// background.js

// This file is optional if your extension doesn't need background functionality

// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === "injectContentScript") {
        // Inject your content script into the current tab
        chrome.tabs.executeScript({
            file: "content.js"
        });
    }
});
