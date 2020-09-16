import React from "react";
import TextField from "../../components/Controls/TextField";

class SignUp extends React.Component {

    state = {
        name: "",
        email: "",
        password: ""
    }

    componentDidMount() {
        this.props.setBackground && this.props.setBackground("");
    }

    render() {
        return (
            <div className={"dialog"}>
                <h1>Registrieren</h1>
                <form>
                    <TextField label={"Name"} autoComplete={"username"} value={this.state.name} onChange={({target}) => this.setState({name: target.value})} />
                    <TextField label={"Email Adresse"} value={this.state.email} onChange={({target}) => this.setState({email: target.value})} type={"email"} />
                    <TextField label={"Passwort"} autoComplete={"new-password"} value={this.state.password} onChange={({target}) => this.setState({password: target.value})} type={"password"} />
                    <button type={"button"}>Registrieren</button>
                </form>
            </div>
        );
    }
}

export default SignUp;
