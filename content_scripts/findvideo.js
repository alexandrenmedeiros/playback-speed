/** This is script is injected on the active user tab on firefox 
 *  It runs on all frames trying to find a video and messages the id of the frames with videos
*/


(function () {
    // console.log('executando isvideo')
    let video = document.querySelector('video')
    
    if (video != null) {
		browser.runtime.sendMessage({foundVideo: true});
    }
})()