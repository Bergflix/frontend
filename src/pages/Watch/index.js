import React from 'react';
import { withRouter, Redirect, NavLink } from 'react-router-dom';
import Helmet from 'react-helmet';
import YouTube from 'react-youtube';
import './style.scss';

import Backend from '../../classes/Backend';
import Loading from '../../components/Loading';
import Icon from '../../components/Elements/Icon';

class Watch extends React.Component {
    state = {
        loading: true,
        error: false,
        data: null,
    };

    constructor(props) {
        super(props);
        const { key } = props.match.params;
        Backend.get(key)
            .then((data) => {
                // Instead of just loading the ytid we get the whole data because of playlists
                this.setState({ loading: false, error: false, data });
            })
            .catch(() => this.setState({ loading: false, error: true }));
    }

    componentDidMount() {
        this.props.setBackground && this.props.setBackground('');
    }

    render() {
        if (this.state.loading) return <Loading />;

        const { season, part } = this.props.match.params;
        const data = this.state.data;

        let ytid;
        let renderPlaylist = false; // Toggles whether the playlist should be displayed

        if (data) {
            /**
             * This block graps the ytid of a movie or an episode of a series.
             * If the ytid of an episode is not available then it redirects us to
             * the first episode of an series.
             */
            switch (data.type) {
                default: {
                    break;
                }
                case 'movies': {
                    ytid = data.ytid;
                    break;
                }
                case 'series': {
                    // TODO: Implement Check for out of bounce
                    if (season && part) {
                        ytid = data.seasons[season].parts[part].ytid;
                        renderPlaylist = true;
                    } else {
                        // Fallback to the first episode
                        return <Redirect to={`/watch/${data._id}/0/0`} />;
                    }
                    break;
                }
            }
        }

        // If there isn't a fallback then we just redirect to home
        if (this.state.error) return <Redirect to={'/home'} />;

        let partIndex = 0;

        return (
            <div id={'watch-container'}>
                <Helmet>
                    <title>Bergflix - Videoplayer - {data.title}</title>
                </Helmet>
                <div className={'controls'}>
                    <span className={'buttons'}>
                        <NavLink className={'button'} to={`/media/${data._id}`}>
                            <span>Zurück zur Übersicht</span>
                        </NavLink>
                    </span>
                </div>
                <div className={'view'}>
                    <YouTube
                        containerClassName={'video-container'}
                        id={'video'}
                        videoId={ytid}
                        opts={{
                            enablejsapi: 1,
                            width: '100%',
                            height: '100%',
                            iv_load_policy: 3,
                            modestbranding: 1,
                            origin: 'bergflix.de',
                            rel: 0,
                            showinfo: 0,
                        }}
                    />
                    {renderPlaylist && (
                        <span className={'playlist'}>
                            <span className={'info'}>
                                <span className={'head'}>
                                    <Icon className={'icon'} type={'video'} />
                                    <div className={'title'}>{data.title}</div>
                                </span>
                                <div className={'tags'}>
                                    <span className={'left'}>
                                        <span>{new Date(data.date).getFullYear()}</span>
                                        <span>{data.age}+</span>
                                        <span>{data.genre}</span>
                                    </span>
                                    <span className={'right'}>
                                        <span>
                                            {Number(part) + 1}/{data.seasons[0].parts.length}
                                        </span>
                                    </span>
                                </div>
                            </span>
                            <span className={'list'}>
                                {data.seasons[0].parts.map((part) => (
                                    <NavLink key={part.ytid} className={'part'} to={`/watch/${data._id}/${season}/${partIndex++}`}>
                                        <img className={'part-thumbnail'} src={part.thumbnail} alt={'Thumbnail'} />
                                    </NavLink>
                                ))}
                            </span>
                        </span>
                    )}
                </div>
            </div>
        );
    }
}

export default withRouter(Watch);
