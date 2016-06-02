import { render, tree } from 'deku';
import element from 'magic-virtual-element';
import Panel from './components/panel';
import xhr from 'xhr';

const paneData = window.paneData;

const clientData = (location) => {
  xhr({
    method: 'POST',
    body: JSON.stringify({
      paneData: paneData,
      location: location ? {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      } : undefined
    }),
    uri: '/client-data',
    headers: {
      'Content-Type': 'application/json'
    }
  }, (err, resp, body) => {
    if (err) console.log(err);
    const app = tree(<Panel panes={JSON.parse(body)}/>);
    render(app, document.querySelector('.main'));
  });
};

let locationNeeded = false;
Object.keys(paneData).forEach((pane) => {
  if (Object.keys(paneData[pane])[0] === 'eventbrite') {
    locationNeeded = true;
  }
});

if (locationNeeded) {
  navigator.geolocation.getCurrentPosition((location) => clientData(location), () => clientData());
} else {
  clientData();
}
