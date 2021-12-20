import document from 'document';
import { getLocationName } from '../commands';
import { switchPage } from '../navigation';
import { getStateItem, setStateCallback } from '../state';

let $profilebutton = null;
let $map = null;
let $locationName = null;



function doSomething() {
  console.log('hallo badminton');
}

function draw(){
  $locationName.text = getStateItem('location');
  if (getStateItem('map')){
    $map.href = getStateItem('map');
  }
}

export function destroy() {
  console.log('destroy badminton page');
  $profilebutton = null;
  $map = null;
  $locationName = null;

}

export function init() {
  console.log('init badminton page');
  $profilebutton = document.getElementById('profile-button');
  $map = document.getElementById('map');
  $locationName = document.getElementById('location');

  $profilebutton.onclick = () => {
    switchPage('slider', true);
  };


  doSomething();
  getLocationName('badminton');
  setStateCallback('slider', draw);
}

