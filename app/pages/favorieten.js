import document from 'document';
import { switchPage } from '../navigation';
import { gettext } from "i18n";
import { locale } from 'user-settings';

let $button = null;
let $bol1 = null;
let $bol2 = null;
let $bol3 = null;



function doSomething() {
  console.log('hallo favoriet');
  console.log(gettext("favorieten"));
  console.log(locale.language);


}



export function destroy() {
  console.log('destroy favoriet page');
  $button = null;
  $bol1 = null;
  $bol2 = null;
  $bol3 = null;

}

export function init() {
  console.log('init menu page');
  $button = document.getElementById('back-button');
  $bol1 = document.getElementById('bol1-button');
  $bol2 = document.getElementById('bol2-button');
  $bol3 = document.getElementById('bol3-button');

  $button.onclick = () => {
    switchPage('menu', true);
  };
  $bol1.onclick = () => {
    switchPage('fav1kaart', true);
  };
  $bol2.onclick = () => {
    switchPage('fav2kaart', true);
  };
  $bol3.onclick = () => {
    switchPage('slider', true);
  };
  doSomething();
}

