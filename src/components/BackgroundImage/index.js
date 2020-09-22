import React from 'react';
import "./style.scss";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import {v4 as uuid} from "uuid";

class BackgroundImage extends React.Component {
    render() {
        return (
            <TransitionGroup id={"background-container"}>
                <CSSTransition appear={true} key={uuid()} timeout={450} classNames={"background"}>
                    <React.Fragment>
                        <span className={"background"} style={{backgroundImage:  `url(${this.props.image})`}} />
                        <span className={"background"} />
                    </React.Fragment>
                </CSSTransition>
            </TransitionGroup>
        );
    }
}

export default BackgroundImage;
