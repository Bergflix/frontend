import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

import Icon from '../Elements/Icon';

let changeToMobile = 800;

class NavigationList extends Component {
    state = {
        page: this.props.page || 0,
        mobileView: window.innerWidth < changeToMobile + 1,
    };

    /*
    componentDidMount() {
        window.addEventListener('resize', () => this.handleResize());
    }

    handleResize() {
        let nowView = window.innerWidth < changeToMobile + 1;
        console.log(this.state.mobileView + ' ' + nowView);
        if (this.state.mobileView !== nowView) {
            console.log('resize');
            this.setState({ mobileView: nowView });
        }
    }
    */

    onNext() {
        this.setState({ page: this.state.page + 1 });
    }

    onBack() {
        this.setState({ page: this.state.page - 1 });
    }

    render() {
        let serieId = this.props.serieId;
        let content = [];
        let renderNav = false;

        let partIndex = this.state.page * 5;
        let renderBackButton = this.state.page * 5 > 0;
        let renderNextButton = this.state.page * 5 + 5 < this.props.content.length;

        if (this.state.mobileView) {
            partIndex = 0;
            renderBackButton = false;
            renderNextButton = false;
            content = this.props.content;
        } else {
            if (this.props.content.length > 5) {
                for (let i = partIndex; i < this.state.page * 5 + 5; i++) {
                    content.push(this.props.content[i]);
                }
                renderNav = true;
            } else {
                content = this.props.content;
            }
        }

        return (
            <div className={'season-container'}>
                {renderNav ? <Icon type={'back'} className={renderBackButton ? 'nav-button' : 'nav-button-deactivated'} onClick={() => this.onBack()} /> : undefined}
                <div className={'nav-list'}>
                    {content.map((part) => {
                        return (
                            <Link key={part.ytid} className={'part'} to={`/watch/${serieId}/${part.ytid}`}>
                                <img className={'thumbnail'} src={part.thumbnail} alt={'Thumbnail'} />
                                <span className={'watch-indicator'} style={{ width: `${65}%` } /*TODO: Add length calculation*/} />
                                <span className={'title'}>
                                    {++partIndex}. {part.title}
                                </span>
                            </Link>
                        );
                    })}
                </div>
                {renderNav ? <Icon type={'next'} className={renderNextButton ? 'nav-button' : 'nav-button-deactivated'} onClick={() => this.onNext()} /> : undefined}
            </div>
        );
    }
}

export default NavigationList;
