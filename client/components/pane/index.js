import element from 'magic-virtual-element';

module.exports = {
  render: ({ props: { name, image, supporters, capacity, pledged, url, platform } }) => {
    const type = (() => {
      switch (platform) {
        case 'changeorg': return 'petition';
        case 'eventbrite': return 'event';
        case 'kickstarter': return 'fund';
      }
    })();

    const nicePlatform = (() => {
      switch (platform) {
        case 'changeorg': return 'Change.org';
        case 'eventbrite': return 'Eventbrite';
        case 'kickstarter': return 'Kickstarter';
      }
    })();

    const defaultImage = (() => {
      switch (platform) {
        case 'changeorg': return 'http://www.caelusgreenroom.com/wp-content/uploads/2015/04/change.org_.logo_.png';
        case 'eventbrite': return 'http://www.britainforevents.co.uk/wp-content/uploads/2014/03/eventbrite_1.jpg';
        case 'kickstarter': return 'http://cdn.foliomag.com/wp-content/uploads/2016/03/kickstarter.jpeg';
      }
    })();

    return (
      <div class='pane'>
        <div class={'pane__command pane__command--' + type}/>
        <div class='pane__image' style={'background-image: url(' + (image || defaultImage) + ')'}></div>
        <div class='pane__info'>
          <div class='pane__platform'>{nicePlatform}</div>
          <div class='pane__name'>{name}</div>
          <a class={'pane__link pane__link--' + type} href={url} target='_blank' />
          <div class={'pane__number pane__number--' + type}>{supporters || capacity || pledged || 0}</div>
        </div>
      </div>
    );
  }
};
