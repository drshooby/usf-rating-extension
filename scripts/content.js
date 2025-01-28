console.log("script running")

/**
 * SCHEDULE/CALENDAR PANEL
 */

let storedNodes = []

function storeNodes() {
    const times = document.querySelectorAll('a.section-details-link')
    storedNodes = []
    times.forEach((link) => {
        const span = link.querySelector('span.section-time-details')
        const textNode = link.childNodes[link.childNodes.length - 1]

        if (span && textNode && textNode.nodeType === Node.TEXT_NODE) {
            storedNodes.push({
                courseName: textNode.nodeValue.trim(),
                timeDetails: span.textContent.trim()
            })
        }
    })
}

function updateNodes() {
    const times = document.querySelectorAll('a.section-details-link')
    let index = 0
    times.forEach((link) => {
        const span = link.querySelector('span.section-time-details')
        const textNode = link.childNodes[link.childNodes.length - 1]

        if (span && textNode && textNode.nodeType === Node.TEXT_NODE && storedNodes[index]) {
            textNode.nodeValue = storedNodes[index].courseName + ": " + storedNodes[index].timeDetails
            index++
        }
    });
}

function addListenersToResizers(resizers) {
    /**
     * For whatever reason, the site refreshes the DOM upon resize events.
     * So have a mutation observer wait for the DOM to settle before applying the updates
     * to the schedule divs.
     */
    resizers.forEach(resizer => {
        resizer.addEventListener('mousedown', (e) => {
            e.preventDefault()

            const handleMouseUp = () => {
                let debounceTimer = null;

                const observer = new MutationObserver(() => {
                    if (debounceTimer) {
                        clearTimeout(debounceTimer)
                    }

                    debounceTimer = setTimeout(() => {
                        observer.disconnect()
                        updateNodes()
                    }, 200)
                })

                observer.observe(document.body, { 
                    childList: true, 
                    subtree: true 
                })

                document.removeEventListener("mouseup", handleMouseUp)
            }

            document.addEventListener('mouseup', handleMouseUp)
        })
    })
}

const checkInterval = setInterval(() => {
    const scheduleCalendar = document.getElementById("scheduleCalendar")
    if (scheduleCalendar) {
        clearInterval(checkInterval)

        storeNodes()
        updateNodes()

        let resizers = []
        const northResizer = document.getElementById('inner-north-resizer')
        const eastResizer = document.querySelector('.ui-layout-resizer.ui-layout-resizer-east')

        if (northResizer) {
            resizers.push(northResizer)
        }
        if (eastResizer) {
            resizers.push(eastResizer)
        }

        addListenersToResizers(resizers)
    }
}, 100)

/**
 * PROFESSORS PANEL (after searching for courses)
 */

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