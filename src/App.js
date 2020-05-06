import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {CSSTransition, TransitionGroup} from "react-transition-group";

import Home from "./pages/Home";
import SinglePage from "./pages/SinglePage";
import ElementList from "./components/ElementList";
import NotFound from "./pages/NotFound";
import StreamHub from "./pages/StreamHub";

import Header from "./components/Header";
import Footer from "./components/Footer";
import BackgroundImage from "./components/BackgroundImage";
import Loading from "./components/Loading";

import config from "./config.json";
import {getFilmList, getLatestList, getSeriesList} from "./misc";

import {v4 as uuid} from "uuid";

import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";
PouchDB.plugin(PouchDBFind);



class App extends React.Component {
    // Load the Database for the Video-Elements
    state = {
        loading: true,
        background: "",
        featured: {},
        listNew: []
    };

    componentDidMount() {
        // set loading to false, if database is loaded
        let newState = {loading: false};
        //Init local database
        let db = new PouchDB("videos");

        let loadLists = () => {
            getLatestList(db).then(data => {
                newState.listNew = data;
                newState.featured = data.splice(0, 1)[0];
                return getFilmList(db);
            }).then(data => {
                newState.listFilms = data;
                return getSeriesList(db);
            }).then(data => {
                newState.listSeries = data;
                // set the new state
                this.setState(newState);
            }).catch(e => {
                console.log(e);
            });
        };

        if(navigator.onLine){
            // Init database-Replication from remote
            db.replicate.from(config.db + "videos").on("complete", () => {
                loadLists(db);
            });
        }else{
            // Load all the different lists
            loadLists(db);
        }

    }

    render() {
        if(this.state.loading){
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
                                    <Switch location={location}>
                                        <Route path={"/"} exact component={() => <Home setBackground={this.setBackground} featured={this.state.featured} list={this.state.listNew}/>} />

                                        <Route path={"/filme"} component={() => <ElementList type={"filme"} setBackground={this.setBackground} title={"Filme"} list={this.state.listFilms}/>} />
                                        <Route path={"/serien"} component={() => <ElementList type={"serien"} setBackground={this.setBackground} title={"Serien"} list={this.state.listSeries}/>} />

                                        <Route path={"/search"} component={() => <SinglePage page={{title: "Suche", text: "Was suchst du?"}} />} />

                                        <Route path={"/download"} component={() => <SinglePage page={{title: "Herunterladen", text: "App installieren"}} />} />
                                        <Route path={"/about"} component={() => <SinglePage page={{title: "Über Bergflix", text: "Informativer Text folgt hier"}} />} />

                                        <Route path={"/upload"} component={() => <Redirect to={"/"} />} />
                                        <Route path={["/party/:room", "/party"]} component={() => <StreamHub setBackground={this.setBackground} />} />

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

    setBackground = (src) => {
        if(this.state.background !== src) {
            this.setState({background: src});
        }
    };
}

export default App;
