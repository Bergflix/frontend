import React from "react";
import {Link} from "react-router-dom";
import "./style.scss";

class Logo extends React.Component {
    render() {
        return (
            <Link className={"logo-wrapper"} to={"/"}>
                <span>Bergflix</span>
                <span id={"logoDot"}>.</span>
            </Link>
        );
    }
}

export default Logo;
