import React from "react";
import {withRouter} from "react-router-dom";
import "./style.scss";

class Search extends React.Component {

    componentDidMount() {
        this.props.setBackground && this.props.setBackground("");
    }

    render() {
        let urlParams = new URLSearchParams(this.props.location.search);
        let query = urlParams.get("q");
        console.log(query);

        return (
            <p>{query}</p>
        );
    }
}

export default withRouter(Search);
