import React from "react";
import {withRouter, Redirect} from "react-router-dom";
import "./style.scss";
import Socket from "../../classes/User";

class PartyCreate extends React.Component {
    state = {
        step: 1,
        name: "",
        password: "",
        room: ""
    }

    componentDidMount() {
        this.props.setBackground && this.props.setBackground("https://share.bergflix.de/imgs/captain_pineapple.png");
    }

    nextStep = () => {
        const {step} = this.state;
        this.setState({step: step + 1});
    }
    prevStep = () => {
        const {step} = this.state;
        this.setState({step: step - 1});
    }
    handleChange = input => event => {
        this.setState({[input] : event.target.value});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.step === 3 && !this.state.room){
            let room = Socket.partySocket.createRoom(this.state.name, this.state.password);
            this.setState({room});
        }
    }

    render() {
        let dialogContainer = content => (
            <div id={"party-container"}>
                <div className={"dialog"}>
                    {content}
                </div>
            </div>
        );

        switch(this.state.step){
            case 1: return dialogContainer(<PartyNameForm nextStep={this.nextStep} handleChange={this.handleChange} values={this.state} />);
            case 2: return dialogContainer(<PartyPasswordForm prevStep={this.prevStep} nextStep={this.nextStep} handleChange={this.handleChange} values={this.state} />);
            case 3: return dialogContainer(<Invite prevStep={this.prevStep} nextStep={this.nextStep} room={this.state.room}/>);
            default: return <Redirect to={`/party/room/${this.state.room}`}/>;
        }
    }

    updateRoom(room){
        !this.state.room && this.setState({room});
    }
}

export default PartyCreate;


class PartyNameForm extends React.Component {
    next = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }
    prev = (e) => {
        e.preventDefault();
        this.props.history.push("/party");
    }

    render() {
        return (
            <form onSubmit={this.next}>
                <h3>Party erstellen</h3>
                <label>Name:</label>
                <input type={"text"} value={this.props.values.name} name={"partyName"}
                       autoComplete={"off"} spellCheck={"false"} autoCorrect={"off"} autoFocus={true}
                       required={true} onChange={this.props.handleChange("name")}/>
                <div className={"btn-bar"}>
                    <button onClick={this.prev}>Zurück</button>
                    <button type={"submit"}>Weiter</button>
                </div>
            </form>
        );
    }
}
PartyNameForm = withRouter(PartyNameForm);

class PartyPasswordForm extends React.Component {
    next = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }
    prev = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {
        return (
            <form onSubmit={this.next}>
                <h3>Party erstellen</h3>
                <label>Passwort (optional):</label>
                <input type={"password"} value={this.props.values.password}
                       autoComplete={"off"} spellCheck={"false"} autoCorrect={"off"} autoFocus={true}
                       onChange={this.props.handleChange("password")}/>
                <div className={"btn-bar"}>
                    <button onClick={this.prev}>Zurück</button>
                    <button type={"submit"}>Weiter</button>
                </div>
            </form>
        );
    }
}
PartyPasswordForm = withRouter(PartyPasswordForm);

class Invite extends React.Component {
    next = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }
    prev = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    copyLink(e){
        e.preventDefault();
        let input = document.getElementById("invite-link");
        input.select();
        document.execCommand("copy");
    }

    render() {
        return (
            <form onSubmit={this.next}>
                <h3>Party erstellen</h3>
                <label>Einladungslink:</label>
                <div className={"btn-bar"}>
                    <input id={"invite-link"} readOnly={true} value={`${window.location.origin}/party/join/${this.props.room}`}/>
                    <button id={"copy-btn"} onClick={this.copyLink} autoFocus={true}><i className={"fas fa-copy"}/></button>
                </div>
                <div className={"btn-bar"}>
                    <button onClick={this.prev}>Zurück</button>
                    <button type={"submit"}>Weiter</button>
                </div>
            </form>
        );
    }
}
Invite = withRouter(Invite);

