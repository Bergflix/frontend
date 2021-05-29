import { Fragment } from 'react';
import "./style.scss";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { v4 as uuid } from "uuid";

const BackgroundImage = (props) => {
  return (
    <TransitionGroup id={"background-container"}>
      <CSSTransition appear={true} key={uuid()} timeout={450} classNames={"background"}>
        <Fragment>
          <span className={"background"} style={{ backgroundImage: `url(${props.image})` }} />
          <span className={"background"} />
        </Fragment>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default BackgroundImage;
