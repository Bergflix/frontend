import React, { Component } from 'react';

import './style.scss';

class TabContainer extends Component {
  state = {
    activeChild: this.props.children[0],
  };

  onTabClick(tab) {
    this.setState({ activeChild: tab });
  }

  render() {
    /*
    So you might think that we could just do a onClick on the options of the select menu. But that for some reason doesn't work
    on mobile phones and tablets so I have come up with this rather interesting solution and it works. Please don't touch it. Thanks.
      - LG LeXonJe
    */
    let tabIndex = 1;

    return (
      <div className={'tab-container' + ((this.props.className && ' ' + this.props.className) || '')}>
        <div className={'tab-header'}>
          {this.props.children.map((child) => {
            return (
              <span key={child.props.label} className={'tab' + (child === this.state.activeChild ? ' tab-active' : '')} onClick={() => this.onTabClick(child)}>
                {tabIndex++}
              </span>
            );
          })}
        </div>
        <div className={'tab-content'}>
          {this.props.children.map((child) => child === this.state.activeChild ? child.props.children : undefined)}
        </div>
      </div>
    );
  }
}

export default TabContainer;
