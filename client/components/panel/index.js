import element from 'magic-virtual-element';
import Pane from '../pane';

module.exports = {
  render: ({ props: { panes } }) => {
    return (
      <div class='panel'>
        <div class='panel__panes'>
          {panes.map((pane) => {
            return <Pane {...pane}/>;
          })}
        </div>
        <div class='panel__logo'>
          <div class='panel__logo--image'/>
        </div>
      </div>
    );
  }
};
