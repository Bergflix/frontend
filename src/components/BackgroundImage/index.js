import React from 'react';
import "./style.scss";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import {v4 as uuid} from "uuid";

class BackgroundImage extends React.Component {
    render() {
        return (
            <TransitionGroup id={"background-container"}>
                <CSSTransition appear={true} key={uuid()} timeout={450} classNames={"background"}>
                    <span id={"background"} style={{
                        backgroundImage:  `linear-gradient(100deg, rgba(0,0,0, 0.95) 0, transparent 14rem),`
                                        + `linear-gradient(-80deg, rgba(0,0,0, 0.95) 0, transparent 14rem),`
                                        // + `linear-gradient(180deg, rgba(0,0,0, 0.6) 0, transparent 6rem),`
                                        // + `linear-gradient(10deg, #f40f3a 1rem, transparent 7rem),`
                                        // + `linear-gradient(-5deg, #f40f3a 1rem, transparent 8rem),`
                                        + `url(${this.props.image})`
                    }} />
                </CSSTransition>
            </TransitionGroup>
        );
    }
}

export default BackgroundImage;
