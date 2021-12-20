import document from 'document';
import { switchPage } from '../navigation';

let $button = null;



function doSomething() {
  console.log('hallo profile');
}



export function destroy() {
  console.log('destroy profile page');
  $button = null;

}

export function init() {
  console.log('init menu page');
  $button = document.getElementById('back-button');
  

  $button.onclick = () => {
    switchPage('menu', true);
  };
 

  doSomething();
}

