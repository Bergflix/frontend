import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Home from './Home';
import SignUp from './SignUp';
import Media from './Media';
import Info from './Info';
import Watch from './Watch';
import PartySoon from './PartySoon';
import SinglePage from './SinglePage';
import NotFound from './NotFound';
import LinkOut from '../components/Elements/LinkOut';
import Impressum from './static/Impressum';
import PrivacyPolicy from './static/PrivacyPolicy';

class Pages extends React.Component {
    render() {
        let { location, setBackground } = this.props;

        return (
            <TransitionGroup id={'page-container'}>
                <CSSTransition appear={true} key={location.key} timeout={450} classNames={'fade'}>
                    <div className={'page'}>
                        <Switch className={'switch'} location={location}>
                            <Route path={'/'} exact component={() => <Redirect from={'*'} to={'/home'} />} />
                            <Route path={'/home'} component={() => <Home setBackground={setBackground} />} />
                            <Route path={'/signup'} component={() => <SignUp setBackground={setBackground} />} />

                            <Route path={'/movies'} component={() => <Media type={'movies'} browserTitle={'Bergflix - Filme'} setBackground={setBackground} />} />
                            <Route path={'/series'} component={() => <Media type={'series'} browserTitle={'Bergflix - Serien'} setBackground={setBackground} />} />
                            <Route path={'/media/:key'} component={() => <Info setBackground={setBackground} />} />
                            <Route path={'/media'} component={() => <Media setBackground={setBackground} />} />

                            <Route path={['/watch/:key/:part', '/watch/:key']} component={() => <Watch setBackground={setBackground} />} />
                            <Route path={'/watch'} component={() => <Redirect from={'*'} to={'/home'} />} />

                            <Route path={['/upload', '/upload/:ytid']} component={() => <Redirect from={'*'} to={'/'} />} />

                            <Route path={'/party'} component={() => <PartySoon setBackground={setBackground} />} />

                            <Route path={'/download'} component={() => <SinglePage page={{ title: 'Herunterladen', text: 'App installieren' }} />} />
                            <Route path={'/about'} component={() => <SinglePage page={{ title: 'Über Bergflix', text: 'Informativer Text folgt hier' }} />} />
                            {/*
                            <Route path={'/impressum'} component={() => <Impressum setBackground={setBackground} />} />
                            <Route path={'/privacypolicy'} component={() => <PrivacyPolicy setBackground={setBackground} />} />
                            */}

                            <Route path={'/discord'} component={() => <LinkOut to={'https://discord.gg/JP9UKrW'} />} />
                            <Route path={'/patreon'} component={() => <LinkOut to={'https://www.patreon.com/bergflix'} />} />
                            <Route path={'/twitter'} component={() => <LinkOut to={'https://twitter.com/BergflixToGo'} />} />
                            <Route path={'/spreadshirt'} component={() => <LinkOut to={'https://shop.spreadshirt.de/bergflix'} />} />

                            <Route path={'/'} component={() => <NotFound setBackground={setBackground} />} />
                        </Switch>
                    </div>
                </CSSTransition>
            </TransitionGroup>
        );
    }
}

export default Pages;
