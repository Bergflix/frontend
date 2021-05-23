import React, { useState } from 'react';
import { withRouter, Redirect, NavLink } from 'react-router-dom';
import Helmet from 'react-helmet';
import YouTube from 'react-youtube';
import './style.scss';

import Playlist from '../../components/Playlist';
import Backend from '../../classes/Backend';
import Loading from '../../components/Loading';
import { useEffect } from 'react';

const Watch = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    Backend.get(props.match.params.key).then((data) => {
      // Instead of just loading the ytid we get the whole data because of playlists
      this.setState({ loading: false, error: false, data });
      setLoading(false);
      setData(data);
    }).catch(() => {
      setLoading(false);
      setError(false);
    });
  });

  useEffect(() => props.setBackground && props.setBackground(''));

  if (loading) return <Loading />;

  const { season, part } = props.match.params;
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
  if (error) return <Redirect to={'/home'} />;

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
            playerVars: {
              autoplay: 1,
            },
          }}
        />
        {renderPlaylist && <Playlist series={data} season={season} part={part} />}
      </div>
    </div>
  );
};

export default withRouter(Watch);
