const speed = document.getElementById('inSpeed')

if (document.getElementsByTagName('video').length > 0) { // if there is any video on the page

    // change divs visibility to show proper html
    document.getElementById('default').classList.add('hidden')
    document.getElementById('avaliable').classList.remove('hidden')
    
    // document.querySelector('video').playbackRate = speed.value;
}
