import { useState } from 'react';
import './style.scss';

const TabContainer = (props) => {
  const [activeChild, setActiveChild] = useState(props.children[0]);

  /*
  So you might think that we could just do a onClick on the options of the select menu. But that for some reason doesn't work
  on mobile phones and tablets so I have come up with this rather interesting solution and it works. Please don't touch it. Thanks.
   - LG LeXonJe
  */
  let tabIndex = 0;

  return (
    <div className={'tab-container' + ((props.className && ' ' + props.className) || '')}>
      <div className={'tab-header'}>
        <span className={'tab-header-list'}>
          {props.children.map((child) => {
            return (
              <span key={child.props.label} className={'tab' + (child === activeChild ? ' tab-active' : '')} onClick={() => setActiveChild(child)}>
                {child.props.label}
              </span>
            );
          })}
        </span>
        <select className={'tab-header-select'} onChange={(event) => setActiveChild(props.children[event.target.selectedOptions[0].value])}>
          {props.children.map((child) => {
            return (
              <option key={child.props.label} value={tabIndex++}>
                {child.props.label}
              </option>
            );
          })}
        </select>
      </div>
      <div className={'tab-content'}>
        {props.children.map((child) => child === activeChild ? child.props.children : undefined)}
      </div>
    </div>
  );
};

export default TabContainer;
