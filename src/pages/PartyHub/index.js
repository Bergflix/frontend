import React from "react";
import {withRouter, Link} from "react-router-dom";
import crypto from "crypto";
import PartyRoom from "./PartyRoom";

class PartyHub extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            room: props.match.params.room
        };
    }

    componentDidMount() {
        this.props.setBackground("");
    }

    render() {
        if(this.state.room){
            return (
                <PartyRoom room={this.state.room} />
            );
        }

        return (
            <div id={"party-container"}>
                <span id={"party-title"}>Bergflix Party</span>
                <Link to={"/party/"+crypto.randomBytes(6).toString("hex")} >Party erstellen</Link>
            </div>
        );
    }
}

export default withRouter(PartyHub);