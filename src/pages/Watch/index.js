import React from 'react';
import { withRouter, Redirect, NavLink } from 'react-router-dom';
import Helmet from 'react-helmet';
import YouTube from 'react-youtube';
import './style.scss';

import Playlist from '../../components/Playlist';
import Backend from '../../classes/Backend';
import Loading from '../../components/Loading';

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

        return (
            <div id={'watch-container'}>
                <Helmet>
                    <title>Bergflix - Videoplayer - {data.title}</title>
                </Helmet>
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
                        playerVars: {
                          autoplay: 1,
                          controls: 0
                        },
                      }}
                      onPlay={this._onPlay}
                    />
                </div>
                <div className={'controls'}>
                    <span className={'buttons'}>
                        <NavLink className={'button'} to={`/media/${data._id}`}>
                            <span>Zurück zur Übersicht</span>
                        </NavLink>
                    </span>
                </div>
            </div>
        );
    }

    _onPlay(e) {
      const element = document.getElementById('video');
      element.requestFullscreen && !document.fullscreenEnabled && element.requestFullscreen();

      requestAnimationFrame(() => {
        document.addEventListener('fullscreenchange', e => {
          console.log(this);
        }, false);
      });
    }
}

export default withRouter(Watch);
