console.log("script running")

// let storedNodes = [];

// function storeNodes() {
//     const times = document.querySelectorAll('a.section-details-link');
//     storedNodes = [];
//     times.forEach((link) => {
//         const span = link.querySelector('span.section-time-details');
//         const textNode = link.childNodes[link.childNodes.length - 1];

//         if (span && textNode && textNode.nodeType === Node.TEXT_NODE) {
//             storedNodes.push({
//                 courseName: textNode.nodeValue.trim(),
//                 timeDetails: span.textContent.trim()
//             });
//         }
//     });
// }

// function updateNodes() {
//     const times = document.querySelectorAll('a.section-details-link');
//     let index = 0;
//     times.forEach((link) => {
//         const span = link.querySelector('span.section-time-details');
//         const textNode = link.childNodes[link.childNodes.length - 1];

//         if (span && textNode && textNode.nodeType === Node.TEXT_NODE) {
//             textNode.nodeValue = storedNodes[index].courseName + " " + storedNodes[index].timeDetails;
//             index++;
//         }
//     });
// }

// const checkInterval = setInterval(() => {
//     const scheduleCalendar = document.getElementById("scheduleCalendar");
//     if (scheduleCalendar) {
//         clearInterval(checkInterval);

//         storeNodes();
//         updateNodes();

//         const resizer = document.getElementById('inner-north-resizer');
//         if (resizer) {
//             resizer.addEventListener('mousedown', (e) => {
//                 e.preventDefault();
//                 console.log("Mouse down");
//                 storeNodes(); 
//             });

//             resizer.addEventListener('mouseup', (e) => {
//                 e.preventDefault();
//                 console.log("Mouse up");
//                 updateNodes();
//             });
//         }
//     }
// }, 100);

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