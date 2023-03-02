let isShown: Boolean = false
let contentInput: HTMLElement
let output: HTMLTextAreaElement
let data
const gptModalHtml = `
    <dialog id="gpt-modal">
        <div class="gpt-modal-content">
            <div class="gpt-modal-header">
                <h2 class="gpt-modal-title">Review your changes</h2>
                <button class="gpt-modal-btn" data-gpt-close>
                    &times;
                </button>
            </div>
            <div id="gpt-loading">
                <div class="indeterminate-progress-bar">
                    <div class="indeterminate-progress-bar__progress"></div>
                </div>
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
                <select
                    name="options"
                    id="options"
                    class="gpt-email-content"
                >
                    <option value="/enhance-email" selected>Default</option>
                    <option value="/enhance-corporate">Corporate</option>
                    <option value="/enhance-casual">Casual</option>
                    <option value="/enhance-quirky">Quirky</option>
                </select>
                <div class="gpt-modal-footer-btns">
                    <button class="gpt-modal-btn gpt-cancel" data-gpt-close>
                        Cancel
                    </button>
                    <button class="gpt-modal-btn gpt-save">Save</button>
                </div>
            </div>
        </div>
    </dialog>
    `
document.body.insertAdjacentHTML("beforeend", gptModalHtml)
const gptModal = document.getElementById("gpt-modal") as HTMLDialogElement
const select = gptModal.querySelector("select")
const gptLoading = gptModal.querySelector("#gpt-loading") as HTMLElement
select.addEventListener("change", e => {
    const target = e.target as HTMLSelectElement
    data = {
        ...data,
        path: target.value,
    }
    makeRequest()
})
document.querySelectorAll("[data-gpt-close]").forEach(el => {
    el.addEventListener("click", () => {
        closeGTPModel(gptModal)
    })
})

let mutationObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.type !== "childList") return
        checkForComposeButton()
        if (document.querySelector(".aoI")) injectButton()
    })
})

const injectButton = () => {
    const buttonRow = document.querySelectorAll(".btC")

    const button = `
        <td>
            <button 
                class="email-gpt wG J-Z-I" 
                style="margin-left: 12px;z-index:1 font-size: 20px"
            >
            ✨
            </button>
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
            contentInput = contentParent.querySelector('div[role="textbox"]')
            output = document.querySelector(
                '[name="gpt-email-output"]',
            ) as HTMLTextAreaElement
            document
                .querySelector(".gpt-save")
                .addEventListener("click", saveEmail)

            let subjectParent = contentInput.parentElement
            while (true) {
                subjectParent = subjectParent.parentElement
                if (subjectParent.querySelector('form[method="POST"]')) break
            }
            const subjectInput = subjectParent.querySelector(
                'input[name="subjectbox"]',
            ) as HTMLInputElement

            data = {
                type: "enhanceEmail",
                subject: subjectInput.value,
                content: contentInput.innerText,
                path: "/enhance-email",
            }
            console.log(data)

            const input = document.querySelector(
                '[name="gpt-email-input"]',
            ) as HTMLTextAreaElement
            input.value = data.content

            gptModal.showModal()
            isShown = true
            makeRequest()
        })
    })
}

function makeRequest() {
    select.disabled = true
    gptLoading.setAttribute("style", "opacity: 1")
    chrome.runtime.sendMessage(data, responseHandler)
}

function responseHandler(response: any) {
    console.log(response)
    select.disabled = false
    gptLoading.setAttribute("style", "opacity: 0")
    if (response && response?.content) {
        if (!isShown) return
        output.value = response.content.trim()
        return
    }
    alert("Something went wrong")
}

function closeGTPModel(gptModal: HTMLDialogElement) {
    gptModal.close()
    gptModal.querySelectorAll("textarea").forEach(el => {
        el.value = ""
    })
    select.value = "/enhance-email"
    isShown = false
    document.querySelector(".gpt-save").removeEventListener("click", saveEmail)
}

const saveEmail = () => {
    contentInput.innerText = output.value.trim()
    closeGTPModel(gptModal)
}

mutationObserver.observe(document, { childList: true, subtree: true })
