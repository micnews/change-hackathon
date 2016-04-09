import element from 'magic-virtual-element';

module.exports = {
  render: ({ props: { name, image, supporters, capacity, url, platform } }) => {
    return (
      <div class='pane'>
        {image && <div class='pane__image' style={'background-image: url(' + image + ')'}></div>}
        <div class='pane__name'>{name}</div>
        <a class='pane__link' href={url}>{supporters ? 'Sign this petition' : 'Attend this event'}</a>
        <div class={'pane__' + (supporters ? 'supporters' : 'capacity')}>{supporters || capacity}</div>
      </div>
    );
  }
};
