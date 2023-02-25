;(() => {
    let composeButton: HTMLButtonElement
    const modal = `
		<dialog id="gpt-ai-compose-modal">
            <div class="gpt-modal-content">
                <div class="gpt-modal-header">
                    <h2 class="gpt-modal-title">
                        Compose a new email using AI
                    </h2>
                    <button class="gpt-modal-btn" data-gpt-ai-close>
                        &times;
                    </button>
                </div>
                <div class="gpt-ai-compose-modal-body">
                    <label for="gpt-ai-compose-input"
                        >What is the email about?</label
                    >
                    <textarea
                        name="gpt-ai-compose-input"
                        class="gpt-ai-compose-content"
                        rows="3"
                    ></textarea>
                </div>
                <div class="gpt-modal-footer">
                    <button class="gpt-modal-btn gpt-cancel" data-gpt-ai-close>
                        Cancel
                    </button>
                    <button class="gpt-modal-btn gpt-ai-compose-save">Save</button>
                </div>
            </div>
        </dialog>
		`
    if (!document.querySelector(".gpt-ai-compose")) {
        document.body.insertAdjacentHTML("beforeend", modal)
    }

    if (!composeButton) {
        composeButton = document.querySelector(
            ".T-I.T-I-KE.L3",
        ) as HTMLButtonElement
    }

    const aiComposeModal = document.getElementById(
        "gpt-ai-compose-modal",
    ) as HTMLDialogElement

    const aiComposeSaveBtn = aiComposeModal.querySelector(
        ".gpt-ai-compose-save",
    )

    aiComposeSaveBtn.addEventListener("click", generateEmail)

    aiComposeModal.querySelectorAll("[data-gpt-ai-close]").forEach(el => {
        el.addEventListener("click", () => {
            closeModal(aiComposeModal)
        })
    })

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
        aiComposeModal.showModal()
    })

    function closeModal(gptModal: HTMLDialogElement) {
        gptModal.querySelector("gpt-ai-compose-content").innerHTML = ""
        gptModal.close()
        aiComposeSaveBtn.removeEventListener("click", generateEmail)
    }

    function generateEmail() {
        const promptInput = document.querySelector(
            '[name="gpt-ai-compose-input"]',
        ) as HTMLTextAreaElement

        setTimeout(() => {
            const contentInput = document
                .querySelector(".aoI")
                .querySelector('div[role="textbox"]') as HTMLDivElement

            contentInput.innerHTML = promptInput.value
        }, 500)

        closeModal(aiComposeModal)
    }
})()
