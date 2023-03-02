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
				<div id="gpt-ai-loading">
					<div class="indeterminate-progress-bar">
						<div class="indeterminate-progress-bar__progress"></div>
					</div>
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
                <div class="gpt-ai-compose-footer">
                    <button class="gpt-modal-btn gpt-cancel" data-gpt-ai-close>
                        Cancel
                    </button>
                    <button class="gpt-modal-btn gpt-ai-compose-save">Save</button>
                </div>
            </div>
        </dialog>
		`
document.body.insertAdjacentHTML("beforeend", modal)

const aiComposeModal = document.getElementById(
    "gpt-ai-compose-modal",
) as HTMLDialogElement

const loading = aiComposeModal.querySelector("#gpt-ai-loading")
loading.setAttribute("style", "opacity: 0;")

const aiComposeSaveBtn = aiComposeModal.querySelector(".gpt-ai-compose-save")

aiComposeSaveBtn.addEventListener("click", () => {
    const promptInput = document.querySelector(
        '[name="gpt-ai-compose-input"]',
    ) as HTMLTextAreaElement
    loading.setAttribute("style", "opacity: 1;")
    chrome.runtime.sendMessage(
        {
            type: "generateEmail",
            userPrompt: promptInput.value,
        },
        response => {
            const contentInput = document
                .querySelector(".aoI")
                .querySelector('div[role="textbox"]') as HTMLDivElement
            loading.setAttribute("style", "opacity: 0;")
            promptInput.value = ""
            closeModal(aiComposeModal)
            if (response && response?.content) {
                contentInput.innerHTML = response.content
            } else {
                alert("Something went wrong. Please try again.")
            }
        },
    )
})

aiComposeModal.querySelectorAll("[data-gpt-ai-close]").forEach(el => {
    el.addEventListener("click", () => {
        closeModal(aiComposeModal)
    })
})

function checkForComposeButton() {
    if (!document.querySelector(".T-I-KE")) return
    if (document.querySelector(".gpt-ai-compose")) return
    injectAiCompose()
}

function injectAiCompose() {
    const composeButton = document.querySelector(".T-I-KE") as HTMLButtonElement
    if (!composeButton) return
    const composeRow = composeButton.parentElement
    composeRow.style.display = "flex"
    composeRow.style.gap = "4px"
    const AIComposeButton = `<button class="gpt-ai-compose" style="height: 100%">AI Compose</button>`
    composeRow.insertAdjacentHTML("beforeend", AIComposeButton)
    const AIComposeButtonElement = document.querySelector(
        ".gpt-ai-compose",
    ) as HTMLButtonElement
    AIComposeButtonElement.addEventListener("click", () => {
        if (
            !document.querySelector(".dw") ||
            !document.querySelector(".dw").querySelector(".Ha")
        )
            composeButton.click()
        aiComposeModal.showModal()
    })
}

function closeModal(gptModal: HTMLDialogElement) {
    gptModal.querySelector(".gpt-ai-compose-content").innerHTML = ""
    gptModal.close()
}
