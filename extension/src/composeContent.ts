;(() => {
    injectAICompose()

    function injectAICompose() {
        const composeButton = document.querySelector(
            ".T-I.T-I-KE.L3",
        ) as HTMLButtonElement
        const composeRow = composeButton.parentElement
        if (composeRow.querySelector(".gpt-ai-compose")) return
        composeRow.style.display = "flex"
        composeRow.style.gap = "4px"
        const AIComposeButton = `<button class="gpt-ai-compose" style="height: 100%">AI Compose</button>`
        composeRow.insertAdjacentHTML("beforeend", AIComposeButton)

        const AIComposeButtonElement = document.querySelector(
            ".gpt-ai-compose",
        ) as HTMLButtonElement

        AIComposeButtonElement.addEventListener("click", () => {
            composeButton.click()
        })
    }
})()
