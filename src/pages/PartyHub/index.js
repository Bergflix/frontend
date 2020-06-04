import React from "react";
import {withRouter, Link} from "react-router-dom";
import "./style.scss";

class PartyHub extends React.Component {
    componentDidMount() {
        this.props.setBackground && this.props.setBackground("https://share.bergflix.de/imgs/captain_pineapple.png");
    }

    render() {
        let dialogContainer = content => (
            <div id={"party-container"}>
                <div id={"dialog"}>
                    {content}
                </div>
            </div>
        );

        return dialogContainer(
            <div id={"welcome-dialog"}>
                <div className={"title"}>
                    <p className={"welcome"}>Willkommen beim</p>
                    <p className={"logo"}>Bergflix<span className={"red"}>. Partymodus</span></p>
                </div>
                <div className={"buttons"}>
                    <div className={"btn-bar"}>
                        <Link to={"/party/create"} >Party erstellen</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(PartyHub);
