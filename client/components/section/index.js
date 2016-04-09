'use strict';

import element from 'magic-virtual-element';
import Pane from '../pane';

module.exports = {
  render: ({ props: { panes } }) => {
    return (
      <div class='section'>
        <div class='section__panes'>
          {panes.map((pane) => {
            return <Pane {...pane}/>;
          })}
        </div>
      </div>
    );
  }
};
