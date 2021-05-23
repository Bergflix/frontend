import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import Backend from '../../classes/Backend';

import Loading from '../../components/Loading';
import Icon from '../../components/Elements/Icon';
import BOLogo from '../../components/Elements/BOLogo';
import './style.scss';
import { useState } from 'react';
import { useEffect } from 'react';

const Home = (props) => {

  const [featured, setFeatured] = useState(null);

  useEffect(() => {
    Backend.getList('all', 'date', 1).then((data) => {
      let featured = data[0];
      setFeatured(featured);
      props.setBackground && props.setBackground(featured.background || featured.thumbnail);
    });
  });

  if (!featured) return <Loading />;

  let date = new Date(featured.date);
  let year = date.getFullYear();
  let { _id, title, description, logo, age, type, genre } = featured;

  let renderedType;
  switch (type) {
    case 'movies':
      renderedType = 'Film';
      break;
    case 'series':
      renderedType = 'Serie';
      break;
    default:
      renderedType = 'NaN';
  }

  return (
    <div id={'home-container'}>
      <Helmet>
        <title>Bergflix - Home</title>
        <meta name={'description'} content={`Bergflix Startseite. Neuerscheinung: ${title}`} />
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
        <span>{renderedType}</span> {/* TODO: Implement length of video into the src? */}
        <span />
        <span>{genre}</span>
      </div>
      <div className={'info-2'}>
        <BOLogo />
        {/*TODO: Make an if statement*/}
      </div>
      <div className={'description'}>{description}</div>
      <div className={'controls'}>
        <Link to={`/watch/${_id}`}>
          <Icon type={'play'} />
          <span>Jetzt anschauen</span>
        </Link>
        <Link to={`/media/${_id}`}>
          <Icon type={'arrow'} />
          <span>Weitere Infos</span>
        </Link>
      </div>
    </div>
  );
};

export default Home;
