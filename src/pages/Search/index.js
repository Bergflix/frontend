import React from "react";
import {withRouter} from "react-router-dom";
import "./style.scss";

class Search extends React.Component {
    state = {
        query: ""
    }

    componentDidMount() {
        this.props.setBackground && this.props.setBackground("");
    }

    submit(e){
        e.preventDefault();
        this.props.history.push(`/search/${this.state.query}`);
    }

    render() {
        return (
            <div id={"search-container"}>
                <div className={"dialog"}>
                    <form id={"search-form"} onSubmit={e => this.submit(e)}>
                        <h3>Suchbegriff:</h3>
                        <input value={this.state.query} onChange={e => this.setState({query: e.target.value})} />
                        <button type={"submit"}>Suchen</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(Search);
