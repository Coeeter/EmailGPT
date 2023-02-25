chrome.tabs.onActivated.addListener(async activeInfo => {
    checkCurrentTab()
})

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status !== "complete") return
    checkCurrentTab()
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "enhanceEmail") {
        composeEmail(request.subject, request.content, request.path).then(
            response => sendResponse(response),
        )
    } else if (request.type === "generateEmail") {
        generateEmail(request.userPrompt).then(response =>
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
        files: ["content.js", "composeContent.js"],
    })
}

const getCurrentTab = async () => {
    let queryOptions = { active: true, lastFocusedWindow: true }
    let [tab] = await chrome.tabs.query(queryOptions)
    return tab
}

const composeEmail = async (subject: string, content: string, path: string) => {
    try {
        const response = await fetch(`http://localhost:8080${path}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ subject, content }),
        })

        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

const generateEmail = async (userPrompt: string) => {
    try {
        const response = await fetch("http://localhost:8080/compose-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userPrompt }),
        })

        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}
