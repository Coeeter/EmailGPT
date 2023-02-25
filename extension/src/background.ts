chrome.tabs.onActivated.addListener(async activeInfo => {
    checkCurrentTab()
})

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status !== "complete") return
    checkCurrentTab()
})

async function checkCurrentTab() {
    const currentTab = await getCurrentTab()
    const url = currentTab.url
    if (!url.includes("mail.google.com")) return
    chrome.scripting.executeScript({
        target: { tabId: currentTab.id, allFrames: true },
        files: ["content.js"],
    })
}

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true }
    let [tab] = await chrome.tabs.query(queryOptions)
    return tab
}
