/** This is script is injected on the active user tab on firefox */

(function () {
    // flag to only load once this inject script
    if (window.hasRun) {
        return
    }
    window.hasRun = true

    browser.runtime.onMessage.addListener((msg) => {
        if (msg.msg_type == 'checkVideo') {
            if (document.getElementsByTagName('video').length ==  0) { // if there is no video on the page
                throw 'NO_VIDEO'
            }
        }

        if (msg.msg_type == 'alterSpeed') {
            if (document.getElementsByTagName('video').length >  0) { // if there is any video on the page
                document.querySelector('video').playbackRate = Number(msg.newSpeed)
            }
        }
    })

})()