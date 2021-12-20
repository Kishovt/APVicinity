import document from 'document';
import { getLocationName } from '../commands';
import { switchPage } from '../navigation';
import { getStateItem, setStateCallback } from '../state';

let $button = null;
let $profilebutton = null;
let $locationName = null;
let $mapFav2 = null;




function doSomething() {
  console.log('hallo fav 2');
}


function draw(){
  $locationName.text = getStateItem('location');
  if (getStateItem('map')){
    $mapFav2.href = getStateItem('map');
  }
}

export function destroy() {
  console.log('destroy fav2 page');
  $button = null;
  $profilebutton = null;
  $locationName = null;
  $mapFav2 = null;


}

export function init() {
  console.log('init fav2 page');
  $button = document.getElementById('back-button');
  $profilebutton = document.getElementById('profile-button');
  $locationName = document.getElementById('location');
  $mapFav2 = document.getElementById('map');



  $button.onclick = () => {
    switchPage('menu', true);
  };
  $profilebutton.onclick = () => {
    switchPage('menu', true);
  };

  doSomething();
  getLocationName('fav2');
  setStateCallback('slider', draw);
}
