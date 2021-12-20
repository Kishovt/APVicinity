import document from 'document';
import { getLocationName } from '../commands';
import { switchPage } from '../navigation';
import { getStateItem, setStateCallback } from '../state';

let $profilebutton = null;
let $mapTrain = null;
let $locationName = null;



function doSomething() {
  console.log('hallo train');
}

function draw(){
  $locationName.text = getStateItem('location');
  if (getStateItem('map')){
    $mapTrain.href = getStateItem('map');
  }
}

export function destroy() {
  console.log('destroy train page');
  $profilebutton = null;
  $mapTrain = null;
  $locationName = null;

}

export function init() {
  console.log('init train page');
  $profilebutton = document.getElementById('profile-button');
  $mapTrain = document.getElementById('map');
  $locationName = document.getElementById('location');

  $profilebutton.onclick = () => {
    switchPage('slider', true);
  };


  doSomething();
  getLocationName('train');
  setStateCallback('slider', draw);
}

