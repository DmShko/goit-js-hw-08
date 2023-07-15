import Player from "@vimeo/player";
import throttle from "lodash";

// get "iframe" selector link
const myIframe = document.querySelector('iframe');

// get "iframe" selector link
const backLink = document.querySelector('a');
console.log(backLink);
// new prototype of Player
const player = new Player(myIframe);

// get time from storage
const storageTime = JSON.parse(localStorage.getItem('videoplayer-current-time'));

player.setCurrentTime(storageTime).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video's duration
            alert("the time was less than 0 or greater than the video's duration!");
            break;

        default:
            // some other error occurred
            break;
    }
});

const getTime = function() {
    player.getCurrentTime().then(function(timeSec) {
        // seconds = the current playback position
        localStorage.setItem('videoplayer-current-time', JSON.stringify(timeSec))
    }).catch(function(error) {
        // an error occurred
        alert(error);
    });
}

// 'timeupdate' event handler every 1 sec (with 'throttle' option 'leading')
player.on('timeupdate', throttle._.throttle(getTime, 1000, {'leading': true}));

// clear storage and 
// delete 'timeupdate' event handler if time video end
backLink.addEventListener('click', () => {
        localStorage.clear();
        player.on('timeupdate', throttle._.throttle(getTime, 1000, {'leading': true}));
});
