const rangeSpeed = document.getElementById('rangeSpeed')
const numSpeed = document.getElementById('numSpeed')

const b025x = document.getElementById('b025x')
const b1x = document.getElementById('b1x')
const b150x = document.getElementById('b150x')
const b2x = document.getElementById('b2x')
const b5x = document.getElementById('b5x')

numSpeed.oninput = function() {
    // validation on number input
    if (Number(numSpeed.value) == 0) {
        numSpeed.value = 1
    }
    else if (Number(numSpeed.value) > Number(numSpeed.max)) {
        numSpeed.value = numSpeed.max
    }
    else if (Number(numSpeed.value) < Number(numSpeed.min)) {
        numSpeed.value = numSpeed.min
    }
    else if (Number(numSpeed.value) * 100 % 100 > 0) {
        numSpeed.value = Number(numSpeed.value).toFixed(2)
    }

    rangeSpeed.value = numSpeed.value
}

rangeSpeed.oninput = function() {
    numSpeed.value = rangeSpeed.value
}

b1x.onclick = function() {
    numSpeed.value = 1.0
    rangeSpeed.value = 1.0
}

b150x.onclick = function() {
    numSpeed.value = 1.5
    rangeSpeed.value = 1.5
}

b2x.onclick = function() {
    numSpeed.value = 2.0
    rangeSpeed.value = 2.0
}

b025x.onclick = function() {
    numSpeed.value = 0.25
    rangeSpeed.value = 0.25
}

b5x.onclick = function() {
    numSpeed.value = 5.0
    rangeSpeed.value = 5.0
}

function connectPopup() {
    /* popup javascript that communicates with currently tab open in the browser
       using the injected javascript (.../playbackspeed.js) 
    */

    // add click listener to start sending alter playback speed message
    function alterSpeed(tabs) {
        browser.tabs.sendMessage(tabs[0].id, {
            msg_type: "alterSpeed",
            newSpeed: numSpeed.value
        })
    }
    document.addEventListener("click", (e) => {
        browser.tabs.query({active: true, currentWindow: true})
        .then(alterSpeed)
        .catch(execError)
    })
}

function execError(err) {
    // function to handle script execution errors
    console.log(err)
    console.log('Failed to alter video playback speed')
}


// start to listen to findvideo.js to see if any video is found
let found = false
function searchVideos(req, sender, sendR) {
    if (req.foundVideo = true && !found) {
        found = true
        console.log('found first video')

        document.getElementById('default').classList.add('hidden')
        document.getElementById('videoFound').classList.remove('hidden')

        // run alter speed script on video frame
        browser.tabs.executeScript({
            frameId: sender.frameId,
            file: '/content_scripts/playbackspeed.js',
            runAt: "document_end"
        })
        .then(connectPopup) // popupClicks
        .catch(execError) // error handler function
    }
}
browser.runtime.onMessage.addListener(searchVideos)

// search for videos on all frames
browser.tabs.executeScript(null, {
    allFrames: true,
    matchAboutBlank: true,
    file: '/content_scripts/findvideo.js',
    runAt: "document_end"
}).then(()=>{},e=>{console.error(e);});
