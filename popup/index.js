const rangeSpeed = document.getElementById('rangeSpeed')
const numSpeed = document.getElementById('numSpeed')

const b1x = document.getElementById('b1x')
const b125x = document.getElementById('b125x')
const b150x = document.getElementById('b150x')
const b175x = document.getElementById('b175x')
const b2x = document.getElementById('b2x')

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

b125x.onclick = function() {
    numSpeed.value = 1.25
    rangeSpeed.value = 1.25
}

b150x.onclick = function() {
    numSpeed.value = 1.5
    rangeSpeed.value = 1.5
}

b175x.onclick = function() {
    numSpeed.value = 1.75
    rangeSpeed.value = 1.75
}

b2x.onclick = function() {
    numSpeed.value = 2.0
    rangeSpeed.value = 2.0
}

function connectPopup() {
    /* popup javascript that communicates with currently tab open in the browser
       using the injected javascript (.../playbackspeed.js) 
    */

    function checkVideo(tabs) {
        // check if there is any video on the currently tab
        browser.tabs.sendMessage(tabs[0].id, {
            msg_type: "checkVideo"
        })
    }
    
    function alterSpeed(tabs) {
        browser.tabs.sendMessage(tabs[0].id, {
            msg_type: "alterSpeed",
            newSpeed: numSpeed.value
        })
    }
    
    browser.tabs.query({active: true, currentWindow: true})
    .then(checkVideo)
    .catch(execError)

    // add click listener to start altering the playback speed
    document.addEventListener("click", (e) => {
        browser.tabs.query({active: true, currentWindow: true})
        .then(alterSpeed)
        .catch(execError)
    })
}

function execError(err) {
    // function to handle script execution errors
    console.log(err)

    document.getElementById('default').classList.add('hidden')
    document.getElementById('noVideo').classList.remove('hidden')
    console.log('Failed to alter video playback speed')
}

browser.tabs.executeScript({file: '/content_scripts/playbackspeed.js'})
.then(connectPopup) // popupClicks
.catch(execError) // error handler function
