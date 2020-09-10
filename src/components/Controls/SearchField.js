import React from 'react';
import "./controls.scss";
import TextField from "./TextField";

class SearchField extends React.Component {

    state = {
        query: ""
    }

    componentDidMount() {
        this.props.value && this.setState({query: this.props.value});
    }

    submit(e) {
        e.preventDefault();
        this.props.onSubmit && this.props.onSubmit.call(null, this.state);
    }

    render() {
        return (
            <form className={"search-field"} onSubmit={e => this.submit(e)}>
                <TextField
                    label={"Durchsuchen"}
                    type={"search"}
                    name={"query"}
                    value={this.state.query}
                    onChange={({target}) => this.setState({query: target.value})}
                />
            </form>
        );
    }
}

export default SearchField;
