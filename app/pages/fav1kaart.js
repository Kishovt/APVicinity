import document from 'document';
import { getLocationName } from '../commands';
import { switchPage } from '../navigation';
import { getStateItem, setStateCallback } from '../state';

let $button = null;
let $profilebutton = null;
let $locationName = null;
let $map = null;




function doSomething() {
  console.log('hallo fav 1');
}


function draw(){
  $locationName.text = getStateItem('location');
  if (getStateItem('map')){
    $map.href = getStateItem('map');
  }
}

export function destroy() {
  console.log('destroy fav1 page');
  $button = null;
  $profilebutton = null;
  $locationName = null;
  $map = null;


}

export function init() {
  console.log('init fav1 page');
  $button = document.getElementById('back-button');
  $profilebutton = document.getElementById('profile-button');
  $locationName = document.getElementById('location');
  $map = document.getElementById('map');



  $button.onclick = () => {
    switchPage('menu', true);
  };
  $profilebutton.onclick = () => {
    switchPage('menu', true);
  };

  doSomething();
  getLocationName('fav1');
  setStateCallback('slider', draw);
}
