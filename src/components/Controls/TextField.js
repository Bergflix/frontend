import React from 'react';
import "./controls.scss";

class TextField extends React.Component {

    render() {
        return (
            <label className={"control"}>
                <span>{this.props.label || "Textfeld"}</span>
                <input id={this.props.id || ""}
                       className={this.props.className || ""}
                       name={this.props.name || ""}
                       onChange={this.props.onChange || (()=>{})}
                       value={this.props.value || ""} />
            </label>
        );
    }
}

export default TextField;
