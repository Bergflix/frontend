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
        let tabIndex = 0;

        return (
            <div className={'tab-container' + ((this.props.className && ' ' + this.props.className) || '')}>
                <div className={'tab-header'}>
                    <span className={'tab-header-list'}>
                        {this.props.children.map((child) => {
                            return (
                                <span key={child.props.label} className={'tab' + (child === this.state.activeChild ? ' tab-active' : '')} onClick={() => this.onTabClick(child)}>
                                    {child.props.label}
                                </span>
                            );
                        })}
                    </span>
                    <select className={'tab-header-select'} onChange={(event) => this.onTabClick(this.props.children[event.target.selectedOptions[0].value])}>
                        {this.props.children.map((child) => {
                            return (
                                <option key={child.props.label} value={tabIndex++}>
                                    {child.props.label}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className={'tab-content'}>
                    {this.props.children.map((child) => {
                        if (child === this.state.activeChild) return child.props.children;
                        return undefined;
                    })}
                </div>
            </div>
        );
    }
}

export default TabContainer;
