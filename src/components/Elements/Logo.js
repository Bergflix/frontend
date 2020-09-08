import React from "react";
import {Link} from "react-router-dom";

class Logo extends React.Component {
    render() {
        return (
            <Link to={"/"} style={{
                display: "flex",
                height: "100%",
                float: "left",
                fontSize: "2rem",
                fontWeight: "800",
                color: "#fff",
                width: "100%",
                alignItems: "center",
                paddingRight: "1rem"
            }}>
                <span>Bergflix</span>
                <span id={"logoDot"} style={{
                    color: "#f40f3a"
                }}>.</span>
            </Link>
        );
    }
}

export default Logo;
