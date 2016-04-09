import element from 'magic-virtual-element';
import serialize from '../../utils/serialize';

module.exports = {
  render: ({ props: { state, platforms, iframeSrc, onChange, onInput, onGenerate } }) => {
    const handleOnChange = (idx) => {
      return (e) => {
        onChange(idx, e.target.value);
      };
    };

    const handleOnInput = (idx, platform, type) => {
      return (e) => {
        onInput(idx, platform, type, e.target.value);
      };
    };

    const handleOnGenerate = () => {
      return onGenerate('//' + window.location.host + '/?' + serialize(state));
    };

    return (
      <div>
        <div class='option-panes'>
          {[0, 1, 2].map((idx) => {
            return (
              <div class='option-pane'>
                <select class='platform-options' onChange={handleOnChange(idx)}>
                  <option value={'select'}>Pick a platform</option>
                  {Object.keys(platforms).map((platform) => {
                    return <option selected={state[idx] && Object.keys(state[idx])[0] === platform ? 'selected' : false}
                      value={platform}>{platforms[platform].name}</option>;
                  })}
                </select>
                {typeof (state[idx]) === 'object' && (
                  <div>
                    <input placeholder='URL' onInput={handleOnInput(idx, Object.keys(state[idx])[0], 'url')}></input>
                    OR
                    <input placeholder='Automatically generate by keyword' onInput={handleOnInput(idx, Object.keys(state[idx])[0], 'keyword')}></input>
                  </div>
                )}
              </div>
            )
          })}
        </div>
        Here's your embed code:
        <input class='final-display' value={'<iframe width="750" src="//' + window.location.host + '/?' + serialize(state) + '"/>'}/>
        <div class='generate-iframe' onClick={handleOnGenerate}>See what it'll look like</div>
        {iframeSrc && <iframe width="750" class='sample-iframe' src={iframeSrc}/>}
      </div>
    );
  }
};
