let mutationObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.type === "childList") {
            mutation.addedNodes.forEach(node => {
                if (!node.parentElement.querySelector(".aoI")) return
                const element = node.parentElement.querySelector(".aoI")
                element.setAttribute("style", "background-color: blue;")
                
            })
        }
    })
})

mutationObserver.observe(document, { childList: true, subtree: true })
