import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import Backend from '../../classes/Backend';

import './style.scss';

import Loading from '../../components/Loading';
import TabContainer from '../../components/TabContainer';
import BOLogo from '../../components/Elements/BOLogo';
import Icon from '../../components/Elements/Icon';

class Info extends Component {
    state = {
        media: null,
    };

    constructor(props) {
        super(props);

        Backend.get(props.match.params.key).then((data) => {
            this.setState({ media: data.response });
            props.setBackground && props.setBackground(data.response.thumbnail);
        });
    }

    render() {
        let content = this.state.media;
        if (!content) return <Loading />;

        let date = new Date(content.date);
        let year = date.getFullYear();
        let { title, age, type, genre } = content;

        let renderedType;
        let hasBegun = true;
        let renderSeasons = false;
        let seasonIndex = 0;
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
            <div id={'info-container'} className={renderSeasons ? 'serie-align' : 'movie-align'}>
                <Helmet>
                    <title>
                        Bergflix - {renderedType} - {title}
                    </title>
                    <meta name={'description'} content={`Bergflix Startseite. Neuerscheinung: ${title}`} />
                </Helmet>
                <img className={'logo'} src={this.state.media.logo} alt={'Element Logo'} onError={(e) => (e.target.outerHTML = `<p class="logo">${title}</p>`)} />
                <div className={'info'}>
                    <span>{year}</span>
                    <span>{age}+</span>
                    <span>{renderedType}</span>
                    <span />
                    <span>{genre}</span>
                </div>
                <div className={'info-2'}>
                    <BOLogo />
                    {/*TODO: Make an if statement*/}
                </div>
                <div className={'description'}>{this.state.media.description}</div>
                {!renderSeasons && (
                    <div className={'timeline'}>
                        <span />
                        <span>150min</span>
                    </div>
                )}
                <div className={'controls'}>
                    {hasBegun ? (
                        <React.Fragment>
                            <Link to={`/watch/${this.state.media.id}`}>
                                <Icon type={'play'} />
                                <span>Weiterschauen</span>
                            </Link>
                            <Link to={`/watch/${this.state.media.id}`}>
                                <Icon type={'refresh'} />
                                <span>Neustarten</span>
                            </Link>
                        </React.Fragment>
                    ) : (
                        <Link to={`/watch/${this.state.media.id}`}>
                            <Icon type={'play'} />
                            <span>Abspielen</span>
                        </Link>
                    )}
                </div>
                {renderSeasons && (
                    <div className={'seasons'}>
                        <TabContainer>
                            {content.seasons.map((season) => {
                                return (
                                    <div key={season.name} label={season.name}>
                                        <div className={'season-list'}>
                                            {season.parts.map((part) => {
                                                return (
                                                    <Link key={part.ytid} className={'part'} to={`/watch/${content.id}/${part.ytid}`}>
                                                        <img className={'thumbnail'} src={part.thumbnail} alt={'Thumbnail'} />
                                                        <span className={'watch-indicator'} style={{ width: `${65}%` } /*TODO: Add length calculation*/} />
                                                        <span className={'title'}>
                                                            {++seasonIndex}. {part.title}
                                                        </span>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </TabContainer>
                    </div>
                )}
                <div></div>
            </div>
        );
    }
}

export default withRouter(Info);
