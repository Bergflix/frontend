import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import Backend from '../../classes/Backend';

import Loading from '../../components/Loading';
import Icon from '../../components/Elements/Icon';
import BOLogo from '../../components/Elements/BOLogo';
import './style.scss';

class Home extends React.Component {
  state = {
    featured: null,
  };

  constructor(props) {
    super(props);

    Backend.getList('media', 5).then((data) => {
      let featured = data.response[0];
      this.setState({featured});
      props.setBackground && props.setBackground(featured.thumbnail);
    });
  }

  render() {
    let featured = this.state.featured;
    if (!featured) return <Loading />;

    let date = new Date(featured.date);
    let year = date.getFullYear();
    let { title, age, type, genre } = featured;

    let renderedType;
    switch(type) {
        case "movies": renderedType = "Film"; break;
        case "series": renderedType = "Serie"; break;
        default: renderedType = "NaN";
    }

    return (
      <div id={'home-container'}>
        <Helmet>
            <title>Bergflix - Home</title>
            <meta name={"description"} content={`Bergflix Startseite. Neuerscheinung: ${title}`} />
        </Helmet>
        <img
          className={'logo'}
          src={this.state.featured.logo}
          alt={'Element Logo'}
          onError={(e) => e.target.outerHTML = `<p class="logo">${this.state.featured.title}</p>`}
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
        <div className={'description'}>{this.state.featured.description}</div>
        <div className={'controls'}>
          <Link to={`/watch/${this.state.featured.id}`}>
            <Icon type={'play'} />
            <span>Jetzt anschauen</span>
          </Link>
          <Link to={`/media/${this.state.featured.id}`}>
            <Icon type={'arrow'} />
            <span>Weitere Infos</span>
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
