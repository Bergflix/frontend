import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {v4 as uuid} from "uuid";

import Home from "./pages/Home";
import SinglePage from "./pages/SinglePage";
import NotFound from "./pages/NotFound";

import Header from "./components/Header";
import Footer from "./components/Footer";
import BackgroundImage from "./components/BackgroundImage";
import Loading from "./components/Loading";

import Backend from "./classes/Backend";
import Search from "./pages/Search";
import Watch from "./pages/Watch";


class App extends React.Component {

    state = {
        background: ""
    };

    componentDidMount() {
        let app = this;
        // Load the Database for the Video-Elements
        Backend.onLoad(() => {
            app.forceUpdate();
        });
    }

    render() {
        if(!Backend.loaded){
            return (
                <Loading />
            );
        }

        return (
            <div id={"container"}>
                <TransitionGroup id={"background-container"}>
                    <CSSTransition appear={true} key={uuid()} timeout={450} classNames={"background"}>
                        <BackgroundImage image={this.state.background} />
                    </CSSTransition>
                </TransitionGroup>
                <Router>
                    <Header />
                    <Route render={({location}) => (
                        <TransitionGroup id={"page-container"}>
                            <CSSTransition appear={true} key={location.key} timeout={450} classNames={"fade"}>
                                <div className={"page"}>
                                    <Switch className={"switch"} location={location}>
                                        <Route path={"/"} exact component={() => <Redirect to={"/home"}/>} />
                                        <Route path={"/home"} component={() => <Home setBackground={this.setBackground}/>} />

                                        <Route path={"/search"} component={() => <Search setBackground={this.setBackground} />} />
                                        <Route path={"/movies"} component={() => <Search type={"movie"} setBackground={this.setBackground}/>} />
                                        <Route path={"/series"} component={() => <Search type={"series"} setBackground={this.setBackground}/>} />

                                        <Route path={"/watch/:key"} component={() => <Watch setBackground={this.setBackground}/>} />
                                        <Route path={"/watch"} component={() => <Redirect to={"/home"}/>} />

                                        <Route path={["/upload", "/upload/:ytid"]} component={() => <Redirect to={"/"} />} />

                                        <Route path={"/download"} component={() => <SinglePage page={{title: "Herunterladen", text: "App installieren"}} />} />
                                        <Route path={"/about"} component={() => <SinglePage page={{title: "Über Bergflix", text: "Informativer Text folgt hier"}} />} />

                                        <Route path={"/"} component={() => <NotFound setBackground={this.setBackground} />} />
                                    </Switch>
                                </div>
                            </CSSTransition>
                        </TransitionGroup>
                    )} />
                    <Footer />
                </Router>
            </div>
        );
    }

    setBackground = src => this.state.background !== src && this.setState({background: src});
}

export default App;
