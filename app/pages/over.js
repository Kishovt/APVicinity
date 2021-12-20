import document from 'document';
import { switchPage } from '../navigation';
import { gettext } from "i18n";
import { locale } from 'user-settings';
let $button = null;



function doSomething() {
  console.log('hallo over');
  console.log(gettext("favorieten"));
  console.log(locale.language);
}



export function destroy() {
  console.log('destroy over page');
  $button = null;
  $profilebutton = null;
  $overons = null;
}

export function init() {
  console.log('init menu page');
  $button = document.getElementById('back-button');
  

  $button.onclick = () => {
    switchPage('menu', true);
  };
 

  doSomething();
}

