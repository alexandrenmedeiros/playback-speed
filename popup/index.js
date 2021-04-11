const rangeSpeed = document.getElementById('rangeSpeed')
const numSpeed = document.getElementById('numSpeed')

const b1x = document.getElementById('b1x')
const b125x = document.getElementById('b125x')
const b150x = document.getElementById('b150x')
const b175x = document.getElementById('b175x')
const b2x = document.getElementById('b2x')

numSpeed.oninput = function() {
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

// if (document.getElementsByTagName('video').length > 0) { // if there is any video on the page

//     // change divs visibility to show proper html
//     document.getElementById('default').classList.add('hidden')
//     document.getElementById('avaliable').classList.remove('hidden')
    
//     // document.querySelector('video').playbackRate = speed.value;
// }
