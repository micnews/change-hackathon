import { render, tree } from 'deku';
import element from 'magic-virtual-element';
import Panel from './components/panel';

const paneData = window.paneData;

const app = tree(<Panel panes={paneData}/>);
render(app, document.querySelector('.main'));

// navigator.geolocation.getCurrentPosition(function(location) {
//
// });
