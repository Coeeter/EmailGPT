chrome.tabs.onActivated.addListener(async activeInfo => {
    checkCurrentTab()
})

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status !== "complete") return
    checkCurrentTab()
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "enhanceEmail") {
        enhanceEmail(request.subject, request.content).then(response =>
            sendResponse(response),
        )
    }
    return true
})

const checkCurrentTab = async () => {
    const currentTab = await getCurrentTab()
    const url = currentTab.url
    if (!url.includes("mail.google.com")) return
    chrome.scripting.executeScript({
        target: { tabId: currentTab.id, allFrames: true },
        files: ["content.js"],
    })
}

const getCurrentTab = async () => {
    let queryOptions = { active: true, lastFocusedWindow: true }
    let [tab] = await chrome.tabs.query(queryOptions)
    return tab
}

const enhanceEmail = async (subject: string, content: string) => {
    try {
        const response = await fetch(
            "http://localhost:8080/enhance-email",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ subject, content }),
            },
        )

        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}