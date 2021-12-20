import document from 'document';
import { switchPage } from '../navigation';

let $buttonMenu = null;
let $buttonProfile = null;

function doSomething() {
  console.log('hallo index');
}

export function destroy() {
  console.log('destroy index page');
  $buttonMenu = null;
  $buttonProfile = null;
}

export function init() {
  console.log('init index page');
  $buttonMenu = document.getElementById('menu-button');
  $buttonMenu.onclick = () => {
    switchPage('slider', true);
  };
 
  doSomething();
}
