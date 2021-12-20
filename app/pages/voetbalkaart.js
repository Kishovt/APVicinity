import document from 'document';
import { getLocationName } from '../commands';
import { switchPage } from '../navigation';
import { getStateItem, setStateCallback } from '../state';

let $profilebutton = null;
let $mapVoetbal = null;
let $locationName = null;



function doSomething() {
  console.log('hallo voetbal');
}

function draw(){
  $locationName.text = getStateItem('location');
  if (getStateItem('map')){
    $mapVoetbal.href = getStateItem('map');
  }
}

export function destroy() {
  console.log('destroy voetbal page');
  $profilebutton = null;
  $mapVoetbal = null;
  $locationName = null;

}

export function init() {
  console.log('init voetbal page');
  $profilebutton = document.getElementById('profile-button');
  $mapVoetbal = document.getElementById('map');
  $locationName = document.getElementById('location');

  $profilebutton.onclick = () => {
    switchPage('slider', true);
  };


  doSomething();
  getLocationName('voetbal');
  setStateCallback('slider', draw);
}

