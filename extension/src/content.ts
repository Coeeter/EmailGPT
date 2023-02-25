;(() => {
    let mutationObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === "childList") {
                mutation.addedNodes.forEach(node => {
                    if (!node.parentElement?.querySelector(".aoI")) return
                    injectButton()
                })
            }
        })
    })

    const injectButton = () => {
        const buttonRow = document.querySelectorAll(".btC")

        const button = `
    <td>
      <button class="email-gpt wG J-Z-I" style="margin-left: 12px;z-index:1 font-size: 20px">✨</button>
    </td>
    `

        buttonRow.forEach(row => {
            if (row.querySelector(".email-gpt")) return
            row.querySelector(".gU.Up").insertAdjacentHTML("afterend", button)
            row.querySelector(".email-gpt").addEventListener("click", () => {
                let parent = row.parentElement
                while (true) {
                    parent = parent.parentElement
                    if (parent.nodeName == "TBODY") break
                }
                const inputElement = parent.querySelector(
                    'div[role="textbox"]',
                ) as HTMLElement
                console.log(inputElement.innerText)
            })
        })
    }

    mutationObserver.observe(document, { childList: true, subtree: true })
})()
