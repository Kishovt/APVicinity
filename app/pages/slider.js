import document from 'document';
import { switchPage } from '../navigation';

let $profilebutton = null;
let $slider = null;
let $handlebasket1 = null;
let $button = null;
let $button1 = null;
let $button3 = null;
let $button4 = null;
let $button5 = null;



function doSomething() {
  console.log('hallo slider');
}



export function destroy() {
  console.log('destroy slider page');
  $profilebutton = null;
  $slider = null;
  $handlebasket1 = null;
  $button = null;
  $button1 = null;
  $button3 = null;
  $button4 = null;
  $button5 = null;
}

export function init() {
  console.log('init slider page');
  $profilebutton = document.getElementById('profile-button');
  $slider = document.getElementById('slider');
  $handlebasket1 = document.getElementById('handlebasket1');
  $button = document.getElementById('back-button');
  $button1 = document.getElementById('back-button1');
  $button3 = document.getElementById('back-button3');
  $button4 = document.getElementById('back-button4');
  $button5 = document.getElementById('back-button5');

  $profilebutton.onclick = () => {
    switchPage('menu', true);
  };
  $button.onclick = () => {
    switchPage('basketkaart', true);
  };
  $button1.onclick = () => {
    switchPage('voetbalkaart', true);
  };
  $button3.onclick = () => {
    switchPage('trainkaart', true);
  };
 
  $button4.onclick = () => {
    switchPage('skatekaart', true);
  };
  $button5.onclick = () => {
    switchPage('badmintonkaart', true);
  };
  $slider.onclick = () => {
    switchPage('menu', true);
  };
  $handlebasket1.onclick = () => {
    switchPage('basketkaart', true);
  };

  doSomething();
}

