console.log("script running")

document.getElementById('search-go').addEventListener('click', () => {
    const observer = new MutationObserver((_, observer) => {
        const resultTable = document.getElementById('table1')
        
        if (resultTable) {
            resultTable.addEventListener('click', (e) => {
                e.preventDefault()
                const clickedCell = e.target.closest('td')
                if (!clickedCell) return

                const parentRow = clickedCell.closest('tr')
                if (!parentRow) {
                    console.log("Could not find parent row.")
                    return
                }

                const profCell = parentRow.children[8]
                if (!profCell) {
                    console.log("Cant't find prof row data.")
                    return
                }

                const profName = profCell.textContent.trim().replace("(Primary)", "")
                console.log("Professor name:", profName)
            })
            observer.disconnect()
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    })
})