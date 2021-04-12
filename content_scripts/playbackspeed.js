/** This is script is injected on the active user tab on firefox */

(function () {
    // flag to only load once this inject script
    if (window.hasRun) {
        return
    }
    window.hasRun = true

    let speeds = [0.25, 0.5, 1, 1.25, 1.5, 2, 2.5, 5]
    let iSpeeds = 2

    let pressedKeys = [0, 0, 0, 0, 0]
    let key_map = {
        ControlRight: 0,
        ShiftRight: 1,
        Comma: 2,
        Period: 3,
        KeyL: 4,
    }

    function keydownHandler(e) {
        if (e.code == 'ControlRight') {
            pressedKeys[key_map.ControlRight] = 1
        }
        else if (e.code == 'ShiftRight') {
            pressedKeys[key_map.ShiftRight] = 1
        }
        else if (e.code == 'Comma') {
            pressedKeys[key_map.Comma] = 1
        }
        else if (e.code == 'Period') {
            pressedKeys[key_map.Period] = 1
        }
        else if (e.code == 'KeyL') {
            pressedKeys[key_map.KeyL] = 1
        }
    }

    function keyupHandler(e) {
        if (e.code == 'ControlRight') {
            pressedKeys[key_map.ControlRight] = 0
        }
        else if (e.code == 'ShiftRight') {
            pressedKeys[key_map.ShiftRight] = 0
        }
        else if (e.code == 'Comma') {
            pressedKeys[key_map.Comma] = 0

            if (pressedKeys[key_map.ControlRight] == 1 && pressedKeys[key_map.ShiftRight] == 1 ) {
                iSpeeds = Math.max(0, iSpeeds - 1)
                document.querySelector('video').playbackRate = speeds[iSpeeds]

                console.log('changed playback speed to: ', speeds[iSpeeds])
            }
        }
        else if (e.code == 'Period') {
            pressedKeys[key_map.Period] = 0

            if (pressedKeys[key_map.ControlRight] == 1 && pressedKeys[key_map.ShiftRight] == 1 ) {
                iSpeeds = Math.min(speeds.length - 1, iSpeeds + 1)
                document.querySelector('video').playbackRate = speeds[iSpeeds]

                console.log('changed playback speed to: ', speeds[iSpeeds])
            }
        }
        else if (e.code == 'KeyL') {
            pressedKeys[key_map.KeyL] = 0

            if (pressedKeys[key_map.ControlRight] == 1 && pressedKeys[key_map.ShiftRight] == 1 ) {
                iSpeeds = 2
                document.querySelector('video').playbackRate = speeds[iSpeeds]

                console.log('changed playback speed to: ', speeds[iSpeeds])
            }
        }
    }

    if (document.getElementsByTagName('video').length >  0) { // if there is any video on the page
        window.addEventListener('keydown', keydownHandler.bind(this))
        window.addEventListener('keyup', keyupHandler.bind(this))
        console.log('add key event listeneres')
    }

    browser.runtime.onMessage.addListener((msg) => {
        if (msg.msg_type == 'checkVideo') {
            if (document.getElementsByTagName('video').length ==  0) { // if there is no video on the page
                browser.runtime.sendMessage({noVideo: true})
            }
        }

        if (msg.msg_type == 'alterSpeed') {
            if (document.getElementsByTagName('video').length >  0) { // if there is any video on the page
                document.querySelector('video').playbackRate = Number(msg.newSpeed)
            }
        }
    })

})()