'use strict';

import { render, tree } from 'deku';
import element from 'magic-virtual-element';
import Section from './components/section';

const paneData = window.paneData;

const app = tree(<Section panes={paneData.eventbrite}/>);
render(app, document.querySelector('.main'));

// navigator.geolocation.getCurrentPosition(function(location) {
//
// });
