import * as messaging from 'messaging';

// get weather
export function getLocationName(sport) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send({
      command: 'location',
      sport,
    });
  }
}

// set up
export function init() {
  messaging.peerSocket.addEventListener('open', () => {
    getLocationName();
  });
}
