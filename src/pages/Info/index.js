import { Fragment, useRef, useState } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import Helmet from 'react-helmet';
import Backend from '../../classes/Backend';

import './style.scss';

import Loading from '../../components/Loading';
import TabContainer from '../../components/TabContainer';
import SeasonList from '../../components/SeasonList';
import BOLogo from '../../components/Elements/BOLogo';
import Icon from '../../components/Elements/Icon';
import { useEffect } from 'react';

const Info = (props) => {
  const [{ loading, error, media }, setState] = useState({ loading: true, error: false, media: null });

  const m = useRef(true); // Mounted
  useEffect(() => () => m.current = false); // Unmounted

  useEffect(() => Backend.get(props.match.params.key).then((data) => {
    if (!m.current) return;
    setState({
      loading: false,
      media: data
    });
    props.setBackground && props.setBackground(data.background || data.thumbnail);
  }).catch(() => {
    if (!m.current) return;
    setState({
      loading: false,
      error: true
    });
  }));

  if (loading) return <Loading />;
  if (error) return <Redirect to={'/home'} />;

  let date = new Date(media.date);
  let year = date.getFullYear();
  let { _id, title, description, logo, age, type, genre, seasons } = media;

  let renderedType;
  let seasonIndex = 0;
  let hasBegun = false; // Toggles whether the rewind button should be displayed
  let renderSeasons = false; // Toggles whether the seasonlist should be rendered

  switch (type) {
    case 'movies':
      renderedType = 'Film';
      break;
    case 'series':
      renderedType = 'Serie';
      renderSeasons = true;
      break;
    default:
      renderedType = 'NaN';
  }

  return (
    <div id={'info-container'}>
      <div className={'info-sector'}>
        <Helmet>
          <title>
            Bergflix - {renderedType} - {title}
          </title>
          <meta
            name={'description'}
            content={`Bergflix Startseite. Neuerscheinung: ${title}`}
          />
        </Helmet>
        <img
          className={'logo'}
          src={logo}
          alt={'Element Logo'}
          onError={(e) => (e.target.outerHTML = `<p class="logo">${title}</p>`)}
        />
        <div className={'info'}>
          <span>{year}</span>
          <span>{age}+</span>
          <span>{renderedType}</span>
          <span />
          <span>{genre}</span>
        </div>
        <div className={'info-2'}>
          <BOLogo />
          {/* TODO: Make an if statement */}
        </div>
        <div className={'description'}>{description}</div>
        {!renderSeasons && (
          <div className={'timeline'}>
            <span />
            <span>150min</span>
          </div>
        )}
        <div className={'controls'}>
          {hasBegun ? (
            <Fragment>
              <Link to={`/watch/${_id}`}>
                <Icon type={'play'} />
                <span>Weiterschauen</span>
              </Link>
              <Link to={`/watch/${_id}`}>
                <Icon type={'refresh'} />
                <span>Neustarten</span>
              </Link>
            </Fragment>
          ) : (
            <Link to={`/watch/${_id}`}>
              <Icon type={'play'} />
              <span>Abspielen</span>
            </Link>
          )}
        </div>
      </div>
      {renderSeasons && (
        <TabContainer className={'seasons'}>
          {seasons.map((season) => {
            return (
              <div key={season.name} label={season.name}>
                <SeasonList season={seasonIndex++} serie={media} />
              </div>
            );
          })}
        </TabContainer>
      )}
    </div>
  );
};

export default withRouter(Info);
