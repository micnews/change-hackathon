import { render, tree } from 'deku';
import element from 'magic-virtual-element';
import Builder from './components/builder';

let state = [];
const platforms = {
  changeorg: {
    name: 'Change.org',
    searchOpts: {
      keyword: ''
    }
  },
  eventbrite: {
    name: 'Eventbrite',
    searchOpts: {
      keyword: ''
    }
  },
  kickstarter: {
    name: 'Kickstarter',
    searchOpts: {
      keyword: ''
    }
  }
};
let generate = false;

let app;

const onChange = (idx, value) => {
  if (value === 'select') {
    opts.state[idx] = undefined;
  } else {
    opts.state[idx] = {};
    opts.state[idx][value] = {url: '', keyword: ''};
  }
  app.mount(<Builder {...opts}/>);
};

const onInput = (idx, platform, type, value) => {
  opts.state[idx][platform][type] = value;
  app.mount(<Builder {...opts}/>);
};

const onGenerate = (url) => {
  opts.generate = true;
  app.mount(<Builder {...opts}/>);
};

let opts = {
  state,
  platforms,
  generate,
  onChange,
  onInput,
  onGenerate
};

app = tree(<Builder {...opts}/>);
render(app, document.querySelector('.main'));
