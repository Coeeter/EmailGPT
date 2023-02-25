;(() => {
    let isShown: Boolean = false
    let contentInput: HTMLElement
    let output: HTMLTextAreaElement
    const modal = `
        <dialog id="gpt-modal">
            <div class="gpt-modal-content">
                <div class="gpt-modal-header">
                    <h2 class="gpt-modal-title">Review your changes</h2>
                    <button class="gpt-modal-btn" data-gpt-close>
                        &times;
                    </button>
                </div>
                <div class="gpt-modal-body">
                    <div class="gpt-body-item">
						<label for="gpt-email-input">Original</label>	
						<textarea
							name="gpt-email-input"
							class="gpt-email-content"
							readonly
							rows="20"
						></textarea>
					</div>
                    <div class="gpt-body-item">
						<label for="gpt-email-output">✨ Enhanced ✨</label>	
						<textarea
							name="gpt-email-output"
							class="gpt-email-content"
							rows="20"
							placeholder="Loading..."
						></textarea>
					</div>
                </div>
                <div class="gpt-modal-footer">
                    <button class="gpt-modal-btn gpt-cancel" data-gpt-close>
                        Cancel
                    </button>
                    <button class="gpt-modal-btn gpt-save">Save</button>
                </div>
            </div>
        </dialog>
		`
    injectAICompose()
    document.body.insertAdjacentHTML("beforeend", modal)
    const gptModal = document.getElementById("gpt-modal") as HTMLDialogElement
    document.querySelectorAll("[data-gpt-close]").forEach(el => {
        el.addEventListener("click", () => {
            closeModal(gptModal)
        })
    })

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
                contentInput = contentParent.querySelector(
                    'div[role="textbox"]',
                )
                output = document.querySelector(
                    '[name="gpt-email-output"]',
                ) as HTMLTextAreaElement
                document
                    .querySelector(".gpt-save")
                    .addEventListener("click", saveEmail)

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
                console.log(data)

                const input = document.querySelector(
                    '[name="gpt-email-input"]',
                ) as HTMLTextAreaElement
                input.value = data.content

                gptModal.showModal()
                isShown = true
                chrome.runtime.sendMessage(data, response => {
                    console.log(response)
                    if (response && response?.content) {
                        if (!isShown) return
                        output.value = response.content.trim()
                        return
                    }
                    alert("Something went wrong")
                })
            })
        })
    }

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

    function closeModal(gptModal: HTMLDialogElement) {
        gptModal.close()
        gptModal.querySelectorAll("textarea").forEach(el => {
            el.value = ""
        })
        isShown = false
        document
            .querySelector(".gpt-save")
            .removeEventListener("click", saveEmail)
    }

    const saveEmail = () => {
        contentInput.innerText = output.value.trim()
        closeModal(gptModal)
    }

    mutationObserver.observe(document, { childList: true, subtree: true })
})()
