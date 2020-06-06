import React from "react";
import {withRouter, Link} from "react-router-dom";
import "./style.scss";

class PartyJoin extends React.Component {
    componentDidMount() {
        this.props.setBackground && this.props.setBackground("https://share.bergflix.de/imgs/captain_pineapple.png");
    }

    join = e => {
        e.preventDefault();
        this.props.history.push(`/party/room/${this.props.match.params.room}`);
    }

    render() {
        let dialogContainer = content => (
            <div id={"party-container"}>
                <div className={"dialog"}>
                    {content}
                </div>
            </div>
        );

        return dialogContainer(
            <form id={"join-form"} onSubmit={this.join}>
                <h3>Party beitreten</h3>
                <label>Passwort (optional):</label>
                <input name={"partyPassword"} autoComplete={"off"} spellCheck={"false"} autoCorrect={"off"}/>
                <div className={"btn-bar"}>
                    <Link to={"/party"}>Zurück</Link>
                    <button type={"submit"}>Los gehts<i className={"fas fa-arrow-right"}/></button>
                </div>
            </form>
        );
    }
}

export default withRouter(PartyJoin);
