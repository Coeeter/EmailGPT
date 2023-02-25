let mutationObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.type === "childList") {
            mutation.addedNodes.forEach(node => {
                if (!node.parentElement.querySelector(".aoI")) return
                const element = node.parentElement.querySelector(".aoI")
                injectButton()
                // element.setAttribute("style", "background-color: blue;")
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
            console.log('Clicked')
        })
    })
}

mutationObserver.observe(document, { childList: true, subtree: true })
