import React, { Component } from 'react';

import './style.scss';

import Icon from '../Elements/Icon';

class TabContainer extends Component {
    state = {
        activeChild: this.props.children[0],
    };

    onTabClick(tab) {
        this.setState({ activeChild: tab });
    }

    render() {
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
                    <select className={'tab-header-select'}>
                        {this.props.children.map((child) => {
                            return (
                                <option key={child.props.label} onClick={() => this.onTabClick(child)}>
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
