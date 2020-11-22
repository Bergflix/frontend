import React from 'react';
import { withRouter, Redirect, NavLink } from 'react-router-dom';
import YouTube from 'react-youtube';

import './style.scss';

import Backend from '../../classes/Backend';
import Loading from '../../components/Loading';

import Icon from '../../components/Elements/Icon';
import BergflixLogo from '../../components/Elements/Logo';

class Watch extends React.Component {
    state = {
        loading: true,
        error: false,
        key: '',
        type: '',
        ytid: '',
        title: '',
        date: {},
        producer: '',
        thumbnail: '',
        description: '',
        tags: [],
        logo: '',
        seasons: [],
    };

    constructor(props) {
        super(props);
        Backend.get(props.match.params.key).then((data) => this.setState({ loading: false, error: !!data.error, ...data.response }));
    }

    componentDidMount() {
        this.props.setBackground && this.props.setBackground('');
    }

    render() {
        if (this.state.loading) return <Loading />;
        if (this.state.error) return <Redirect to={'/home'} />;

        return (
            <div id={'watch-container'}>
                <div className={'tools-container'}>
                    <span className={'tools-left'}>
                        <BergflixLogo />
                    </span>
                    <span className={'tools-right'}>
                        <NavLink className={'back-button'} to={`/media/${this.props.match.params.key}`}>
                            <Icon type={'back'} className={'back-icon'} />
                            <span className={'back-text'}>Zurück zu Bergflix</span>
                        </NavLink>
                    </span>
                </div>
                <YouTube
                    containerClassName={'video-container'}
                    id={'video'}
                    videoId={this.state.ytid}
                    opts={{
                        enablejsapi: 1,
                        width: '100%',
                        height: '100%',
                        iv_load_policy: 3,
                        modestbranding: 1,
                        origin: 'bergflix.de',
                        rel: 0,
                        showinfo: 0,
                        playerVars: {
                            autoplay: 1,
                        },
                    }}
                />
            </div>
        );
    }
}

export default withRouter(Watch);
