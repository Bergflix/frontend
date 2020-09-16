import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom';
import {CSSTransition, TransitionGroup} from "react-transition-group";

import Home from "./Home";
import SignUp from "./SignUp";
import Search from "./Search";
import Watch from "./Watch";
import SinglePage from "./SinglePage";
import NotFound from "./NotFound";
import LinkOut from "../components/Elements/LinkOut";
import Impressum from "./static/Impressum";
import PrivacyPolicy from "./static/PrivacyPolicy";

class Pages extends React.Component {

    render() {
        let {location, setBackground} = this.props;

        return (
            <TransitionGroup id={"page-container"}>
                <CSSTransition appear={true} key={location.key} timeout={450} classNames={"fade"}>
                    <div className={"page"}>
                        <Switch className={"switch"} location={location}>
                            <Route path={"/"} exact component={() => <Redirect to={"/home"}/>} />
                            <Route path={"/home"} component={() => <Home setBackground={setBackground}/>} />
                            <Route path={"/signup"} component={() => <SignUp setBackground={setBackground} />} />

                            <Route path={"/search"} component={() => <Search setBackground={setBackground} />} />
                            <Route path={"/movies"} component={() => <Search type={"movie"} setBackground={setBackground}/>} />
                            <Route path={"/series"} component={() => <Search type={"series"} setBackground={setBackground}/>} />
                            <Route path={"/media"} component={() => <Search setBackground={setBackground}/>} />

                            <Route path={"/watch/:key"} component={() => <Watch setBackground={setBackground}/>} />
                            <Route path={"/watch"} component={() => <Redirect to={"/home"}/>} />

                            <Route path={["/upload", "/upload/:ytid"]} component={() => <Redirect to={"/"} />} />

                            <Route path={"/download"} component={() => <SinglePage page={{title: "Herunterladen", text: "App installieren"}} />} />
                            <Route path={"/about"} component={() => <SinglePage page={{title: "Über Bergflix", text: "Informativer Text folgt hier"}} />} />
                            <Route path={"/impressum"} component={() => <Impressum setBackground={setBackground} />} />
                            <Route path={"/privacypolicy"} component={() => <PrivacyPolicy setBackground={setBackground} />} />

                            <Route path={"/discord"} component={() => <LinkOut to={"https://discord.gg/JP9UKrW"} />}/>
                            <Route path={"/patreon"} component={() => <LinkOut to={"https://www.patreon.com/bergflix"} />}/>
                            <Route path={"/twitter"} component={() => <LinkOut to={"https://twitter.com/BergflixToGo"} />}/>
                            <Route path={"/spreadshirt"} component={() => <LinkOut to={"https://shop.spreadshirt.de/bergflix"} />}/>

                            <Route path={"/"} component={() => <NotFound setBackground={setBackground} />} />
                        </Switch>
                    </div>
                </CSSTransition>
            </TransitionGroup>
        );
    }
}

export default Pages;
