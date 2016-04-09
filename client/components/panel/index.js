import element from 'magic-virtual-element';
import Pane from '../pane';

module.exports = {
  render: ({ props: { panes } }) => {
    return (
      <div class='panel'>
        {panes.map((pane) => {
          return <Pane {...pane}/>;
        })}
      </div>
    );
  }
};
