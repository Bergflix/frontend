import React from 'react';
import "./controls.scss";

class TextField extends React.Component {

    render() {
        return (
            <label className={"control"}>
                <span>{this.props.label || "Text field"}</span>
                <input
                    className={this.props.className || ""}
                    type={this.props.type || "text"}
                    name={this.props.name || ""}
                    onChange={this.props.onChange || (()=>{})}
                    value={this.props.value || ""}
                    autoComplete={this.props.autoComplete || ""}
                />
            </label>
        );
    }
}

export default TextField;
