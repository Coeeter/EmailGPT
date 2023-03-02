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
