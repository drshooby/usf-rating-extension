chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch(request.action) {
        case "fetchProf":
            console.log("Fetching data...")
            fetchProfData(sendResponse, request.profName)
            return true
        case "fetchRating":
            console.log("Fetching rating...")
            fetchRatingData(sendResponse, request.profId)
            return true
    }
});

async function fetchProfData(sendResponse, profName) {
    try {
        const encodedName = encodeURIComponent(profName)
        const url = `https://rmp-retriever.onrender.com/professor?name=${encodedName}&id=U2Nob29sLTE2MDA=`

        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()
        sendResponse({ success: true, data })
    } catch (error) {
        console.error("API Fetch Error:", error)
        sendResponse({ success: false, error: error.message })
    }
}

async function fetchRatingData(sendResponse, profId) {
    try {
        const url = `https://rmp-retriever.onrender.com/ratings?id=${profId}`

        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()
        sendResponse({ success: true, data })
    } catch (error) {
        console.error("API Fetch Error:", error)
        sendResponse({ success: false, error: error.message })
    }
}