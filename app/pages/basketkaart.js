import document from 'document';
import { getLocationName } from '../commands';
import { switchPage } from '../navigation';
import { getStateItem, setStateCallback } from '../state';

let $profilebutton = null;
let $mapBasket = null;
let $locationName = null;



function doSomething() {
  console.log('hallo basket');
}

function draw(){
  $locationName.text = getStateItem('location');
  if (getStateItem('map')){
    $mapBasket.href = getStateItem('map');
  }
}

export function destroy() {
  console.log('destroy basket page');
  $profilebutton = null;
  $mapBasket = null;
  $locationName = null;

}

export function init() {
  console.log('init basket page');
  $profilebutton = document.getElementById('profile-button');
  $mapBasket = document.getElementById('map');
  $locationName = document.getElementById('location');

  $profilebutton.onclick = () => {
    switchPage('slider', true);
  };


  doSomething();
  getLocationName('basket');
  setStateCallback('slider', draw);
}

