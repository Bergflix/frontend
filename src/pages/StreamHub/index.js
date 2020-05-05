import React from "react";
import {withRouter} from "react-router-dom";
import $ from "jquery";
import crypto from "crypto";
import RoomPage from "./RoomPage";

class StreamHub extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            room: props.match.params.room
        };
    }

    componentDidMount() {
        this.props.setBackground("");

        $("#createRoomBtn").on("click", () => {
            let id = crypto.randomBytes(6).toString("hex");
            this.props.history.push("/party/" + id);
        });
        $("#leaveRoomBtn").on("click", () => {
            this.props.history.push("/party");
        });
    }

    render() {
        if(this.state.room){
            return (
                <RoomPage room={this.state.room} />
            );
        }else {
            return (
                <div>
                    STREAM SITE
                    <button id={"createRoomBtn"} type={"button"}>Create ROOM</button>
                </div>
            );
        }
    }
}

export default withRouter(StreamHub);