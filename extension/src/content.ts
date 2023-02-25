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
                let contentParent = row.parentElement
                while (true) {
                    contentParent = contentParent.parentElement
                    if (contentParent.nodeName == "TBODY") break
                }
                const contentInput = contentParent.querySelector(
                    'div[role="textbox"]',
                ) as HTMLElement

                let subjectParent = contentInput.parentElement
                while (true) {
                    subjectParent = subjectParent.parentElement
                    if (subjectParent.querySelector('form[method="POST"]'))
                        break
                }
                const subjectInput = subjectParent.querySelector(
                    'input[name="subjectbox"]',
                ) as HTMLInputElement

                const data = {
                    type: "enhanceEmail",
                    subject: subjectInput.value,
                    content: contentInput.innerText,
                }
                console.log(data);
                chrome.runtime.sendMessage(data, response => {
                    console.log(response)
                    if (response && response?.content) {
                        contentInput.innerText = response.content.trim()
                        return
                    }
                    alert("Something went wrong")
                })
            })
        })
    }

    mutationObserver.observe(document, { childList: true, subtree: true })
})()
