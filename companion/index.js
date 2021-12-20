import * as cbor from 'cbor';
import { outbox } from 'file-transfer';
import { settingsStorage } from 'settings';
import * as messaging from 'messaging';
import { geolocation } from 'geolocation';
import { API_KEY } from './keys';
import { Image } from "image";

/* Settings */
function sendSettings() {
  const settings = {
    items: settingsStorage.getItem('items')
      ? JSON.parse(settingsStorage.getItem('items')).map((item) => ({
          name: item.name ? JSON.parse(item.name).name : '',
          letter: item.letter ? JSON.parse(item.letter).value : '',
          color: item.color ? JSON.parse(item.color) : '',
        }))
      : [],
    list: settingsStorage.getItem('list')
      ? JSON.parse(settingsStorage.getItem('list')).map((item) => item.value)
      : [],
    letter: settingsStorage.getItem('letter')
      ? JSON.parse(settingsStorage.getItem('letter')).values[0].value
      : '',
  };

  outbox
    .enqueue('settings.cbor', cbor.encode(settings))
    .then(() => console.log('settings sent'))
    .catch((error) => console.log(`send error: ${error}`));
}


settingsStorage.addEventListener('change', sendSettings);

/* Sending short messages */
function sendShortMessage() {
  const data = {
    companionTimestamp: new Date().getTime(),
  };

  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  }
}

messaging.peerSocket.addEventListener('open', () => {
  setInterval(sendShortMessage, 10000);
});

messaging.peerSocket.addEventListener('error', (err) => {
  console.error(`Connection error: ${err.code} - ${err.message}`);
});

/* API Fetch */
let currentSport = null;
async function fetchLocationName(coords) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords.longitude},${coords.latitude}.json?access_token=${API_KEY}`;

  const response = await fetch(url);
  const json = await response.json();

  let location = '';
  json.features.forEach((feature) => {
    if (
      !location &&
      (feature.place_type[0] === 'locality' ||
        feature.place_type[0] === 'place')
    ) {
      location = feature.text;
    }
  });

  outbox
    .enqueue('location.cbor', cbor.encode({ location }))
    .then(() => console.log(location + ' as location sent'))
    .catch((error) => console.log(`send error: ${error}`));
}


/*GET MAP*/
async function getMap(coords){

  const basketUrl = `https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/pin-l+cf0039(${coords.longitude},${coords.latitude}
  ),pin-l-3+ff6400(4.42961,51.226774),pin-l-1+ff6400(4.425007,51.232213),pin-l-2+ff6400(4.429142,51.228369)/auto/336x336@2x?padding=30,30,30,30&access_token=${API_KEY}`;

  const voetbalUrl = `https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/pin-l+cf0039(${coords.longitude},${coords.latitude}
    ),pin-l-1+ff6400(4.427287,51.229005)/auto/336x336@2x?padding=30,30,30,30&access_token=${API_KEY}`;

    const skateUrl = `https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/pin-l+cf0039(${coords.longitude},${coords.latitude}
    ),pin-l-1+ff6400(4.425769,51.230451),pin-l-2+ff6400(4.419499,51.231511)/auto/336x336@2x?padding=30,30,30,30&access_token=${API_KEY}`;
  
  const trainUrl = `https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/pin-l+cf0039(${coords.longitude},${coords.latitude}
    ),pin-l-1+ff6400(4.438304,51.228906)/auto/336x336@2x?padding=30,30,30,30&access_token=${API_KEY}`;
  
  const badmintonUrl = `https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/pin-l+cf0039(${coords.longitude},${coords.latitude}
    ),pin-l-1+ff6400(4.429373,51.228286)/auto/336x336@2x?padding=30,30,30,30&access_token=${API_KEY}`;
    
  const fav1Url = `https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/pin-l+cf0039(${coords.longitude},${coords.latitude}
    ),pin-l-1+ff6400(4.425007,51.232213)/auto/336x336@2x?padding=30,30,30,30&access_token=${API_KEY}`;
  
  const fav2Url = `https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/pin-l+cf0039(${coords.longitude},${coords.latitude}
    ),pin-l-1+ff6400(4.429142,51.228369)/auto/336x336@2x?padding=30,30,30,30&access_token=${API_KEY}`;
  

    let url = `https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/pin-l+cf0039(${coords.longitude},${coords.latitude}
    ),pin-l-3+ff6400(4.42961,51.226774),pin-l-1+ff6400(4.425007,51.232213),pin-l-2+ff6400(4.429142,51.228369),pin-l-1+ff6400(4.427287,51.229005),pin-l-1+ff6400(4.425769,51.230451),pin-l-2+ff6400(4.419499,51.231511),pin-l-1+ff6400(4.438304,51.228906),pin-l-1+ff6400(4.429373,51.228286),pin-l-1+ff6400(4.425007,51.232213),pin-l-1+ff6400(4.429142,51.228369)/auto/336x336@2x?padding=30,30,30,30&access_token=${API_KEY}`; // idealiter hier toch een url in zetten met àlle sport locaties in


  if (currentSport === 'basket') url = basketUrl;

  if (currentSport === 'voetbal') url = voetbalUrl;
  
  if (currentSport === 'skate') url = skateUrl;
  
  if (currentSport === 'train') url = trainUrl;

  if (currentSport === 'badminton') url = badmintonUrl;

  if (currentSport === 'fav1') url = fav1Url;

  if (currentSport === 'fav2') url = fav2Url;


      /*
  const skateUrl = `https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/pin-l+cf0039(${coords.longitude},${coords.latitude}
    ),pin-l-1+ff6400(4.425769,51.230451),,pin-l-2+ff6400(4.419499,51.231511)/auto/336x336@2x?padding=30,30,30,30&access_token=${API_KEY}`;
  
  const trainUrl = `https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/pin-l+cf0039(${coords.longitude},${coords.latitude}
    ),pin-l-1+ff6400(4.438304,51.228906)/auto/336x336@2x?padding=30,30,30,30&access_token=${API_KEY}`;
  
  const badmintonUrl = `https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/pin-l+cf0039(${coords.longitude},${coords.latitude}
    ),pin-l-1+ff6400(4.429373,51.228286)/auto/336x336@2x?padding=30,30,30,30&access_token=${API_KEY}`;
    
  const fav1Url = `https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/pin-l+cf0039(${coords.longitude},${coords.latitude}
    ),pin-l-1+ff6400(4.425007,51.232213)/auto/336x336@2x?padding=30,30,30,30&access_token=${API_KEY}`;
  
  const fav2Url = `https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/pin-l+cf0039(${coords.longitude},${coords.latitude}
    ),pin-l-1+ff6400(4.429142,51.228369)/auto/336x336@2x?padding=30,30,30,30&access_token=${API_KEY}`;
  */
 /*
  if (currentSport === 'skate') url = skateUrl;
  
  if (currentSport === 'train') url = trainUrl;

  if (currentSport === 'badminton') url = badmintonUrl;

  if (currentSport === 'fav1') url = fav1Url;

  if (currentSport === 'fav2') url = fav2Url;
  */
  fetch(url)
  .then((response) => response.arrayBuffer())
  .then((buffer) => Image.from(buffer, 'image/png'))
  .then ((image) =>
  image.export('image/jpeg', {
    background: '#000000',
    quality: 40,
    }),
  )
  .then((buffer) => outbox.enqueue(`map-${Date.now()}.jpg`, buffer))
  .then((fileTransfer) => {
    console.log(`Enqueued ${fileTransfer.name}`);
  });
}



/* Location functions */
function locationSuccess(location) {
  fetchLocationName(location.coords);
  getMap(location.coords);

}

function locationError(error) {
  console.log(`Error: ${error.code}`, `Message: ${error.message}`);
  // Handle location error (send message to device to show error)
}

/* Handle messages coming from device */
function processMessaging(evt) {
  console.log(evt.data);
  switch (evt.data.command) {
    case 'location':
      currentSport = evt.data.sport;
      geolocation.getCurrentPosition(locationSuccess, locationError);
      break;
    default:
      //
      break;
  }
}

messaging.peerSocket.addEventListener('message', processMessaging);

/*async function getMap(coords){

  const basketUrl = `https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/pin-l+cf0039(${coords.longitude},${coords.latitude}
  ),pin-l-3+ff6400(4.42961,51.226774),pin-l-1+ff6400(4.425007,51.232213),pin-l-2+ff6400(4.429142,51.228369)/auto/336x336@2x?padding=30,30,30,30&access_token=${API_KEY}`;

  const voetbalUrl = `https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/pin-l+cf0039(${coords.longitude},${coords.latitude}
    )pin-l-1+ff6400(4.427287,51.229005)/auto/336x336@2x?padding=30,30,30,30&access_token=${API_KEY}`;
    
  const skateUrl = `https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/pin-l+cf0039(${coords.longitude},${coords.latitude}
    ),pin-l-1+ff6400(4.425769,51.230451),,pin-l-2+ff6400(4.419499,51.231511)/auto/336x336@2x?padding=30,30,30,30&access_token=${API_KEY}`;
  
  const trainUrl = `https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/pin-l+cf0039(${coords.longitude},${coords.latitude}
    )pin-l-1+ff6400(4.438304,51.228906)/auto/336x336@2x?padding=30,30,30,30&access_token=${API_KEY}`;
  
  const badmintonUrl = `https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/pin-l+cf0039(${coords.longitude},${coords.latitude}
    ),pin-l-1+ff6400(4.429373,51.228286)/auto/336x336@2x?padding=30,30,30,30&access_token=${API_KEY}`;
    
  const fav1Url = `https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/pin-l+cf0039(${coords.longitude},${coords.latitude}
    ),pin-l-1+ff6400(4.425007,51.232213)/auto/336x336@2x?padding=30,30,30,30&access_token=${API_KEY}`;
  
  const fav2Url = `https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/pin-l+cf0039(${coords.longitude},${coords.latitude}
    ),pin-l-1+ff6400(4.429142,51.228369)/auto/336x336@2x?padding=30,30,30,30&access_token=${API_KEY}`;
  
  let url = null; // idealiter hier toch een url in zetten met àlle sport locaties in

  if (currentSport === 'basket') {
    url = basketUrl;
  
  if (currentSport === 'voetbal') {
    url = voetbalUrl;

  if (currentSport === 'skate') {
    url = skateUrl;
  
  if (currentSport === 'train') {
    url = trainUrl;

  if (currentSport === 'badminton') {
    url = badmintonUrl;

  if (currentSport === 'fav1') {
    url = fav1Url;

  if (currentSport === 'fav2') {
    url = fav2Url;
    
  }*/