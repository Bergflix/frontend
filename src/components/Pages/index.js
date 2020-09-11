import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom';
import {CSSTransition, TransitionGroup} from "react-transition-group";

import Home from "../../pages/Home";
import SignUp from "../../pages/SignUp";
import Search from "../../pages/Search";
import Watch from "../../pages/Watch";
import SinglePage from "../../pages/SinglePage";
import NotFound from "../../pages/NotFound";

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
                            <Route path={"/signup"} component={() => <SignUp />} />

                            <Route path={"/search"} component={() => <Search setBackground={setBackground} />} />
                            <Route path={"/movies"} component={() => <Search type={"movie"} setBackground={setBackground}/>} />
                            <Route path={"/series"} component={() => <Search type={"series"} setBackground={setBackground}/>} />
                            <Route path={"/media"} component={() => <Search setBackground={setBackground}/>} />

                            <Route path={"/watch/:key"} component={() => <Watch setBackground={setBackground}/>} />
                            <Route path={"/watch"} component={() => <Redirect to={"/home"}/>} />

                            <Route path={["/upload", "/upload/:ytid"]} component={() => <Redirect to={"/"} />} />

                            <Route path={"/download"} component={() => <SinglePage page={{title: "Herunterladen", text: "App installieren"}} />} />
                            <Route path={"/about"} component={() => <SinglePage page={{title: "Über Bergflix", text: "Informativer Text folgt hier"}} />} />

                            <Route path={"/"} component={() => <NotFound setBackground={setBackground} />} />
                        </Switch>
                    </div>
                </CSSTransition>
            </TransitionGroup>
        );
    }
}

export default Pages;
