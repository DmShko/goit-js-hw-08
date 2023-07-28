import Player from "@vimeo/player";
import throttle from "lodash.throttle";

// get "iframe" selector link
const myIframe = document.querySelector('iframe');

// get "Go back" selector link
const backLink = document.querySelector('a');
// console.log(backLink);

// new prototype of Player
const player = new Player(myIframe);

// get time from storage
const storageTime = JSON.parse(localStorage.getItem('videoplayer-current-time'));
player.setCurrentTime(storageTime || 0);

// set current time to storage
const getTime = function(time) {
    localStorage.setItem('videoplayer-current-time', time.seconds);
}

// 'timeupdate' event handler every 1 sec (with 'throttle' option 'leading')
player.on('timeupdate', throttle(getTime, 1000));
