import React from "react";
import {withRouter, Link} from "react-router-dom";
import "./style.scss";
import PartyCreate from "./PartyCreate";

class PartyHub extends React.Component {
    componentDidMount() {
        this.props.setBackground && this.props.setBackground("https://share.bergflix.de/imgs/captain_pineapple.png");
    }

    createRoom(e){
        e.preventDefault();

        // Raum eröffnen, falls möglich
    }
    joinRoom(e){
        e.preventDefault();
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
                    <p className={"quest"}>Was möchtest du tun?</p>
                    <div className={"btn-bar"}>
                        <Link to={"/party/create"} >Party erstellen</Link>
                        <Link to={"/party/join"} >Party beitreten</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(PartyHub);
