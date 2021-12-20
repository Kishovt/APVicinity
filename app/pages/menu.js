import document from 'document';
import { switchPage } from '../navigation';

let $button = null;
let $favoriet = null;
let $overons = null;



function doSomething() {
  console.log('hallo menu');
}



export function destroy() {
  console.log('destroy menu page');
  $button = null;
  $overons = null;
  $favoriet = null;
}

export function init() {
  console.log('init menu page');
  $button = document.getElementById('back-button');
  $overons = document.getElementById('overons');
  $favoriet = document.getElementById('favoriet');

  $button.onclick = () => {
    switchPage('slider', true);
  };

  $overons.onclick = () => {
    switchPage('over');
  }; 
  
  $favoriet.onclick = () => {
    switchPage('favorieten');
  };

  doSomething();
}

