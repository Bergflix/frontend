import React from "react";
import {withRouter} from "react-router-dom";

import ElementList from "../../components/ElementList";

import "./style.scss";
import DB from "../../classes/db";
import NotFound from "../NotFound";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: props.match.params.query || "",
            list: []
        };

        DB.getElementsByTitle(this.state.query).then(data => {
            this.setState({list: data});
        });
    }

    componentDidMount(){
        this.props.setBackground && this.props.setBackground("");
    }

    render() {
        return (
            <div id={"search-container"}>
                <div id={"search-bar"}>
                    <input type={"text"} value={this.state.query} placeholder={"Suchen..."}
                           autoComplete={"off"} spellCheck={"false"} autoCorrect={"off"}
                           onChange={e => this.search(e.target.value)}/>
                </div>
                <div id={"result-list"}>
                    <ElementList title={""} list={this.state.list}/>
                </div>
            </div>
        );
    }

    search(str){
        this.setState({query: str});
        DB.getElementsByTitle(str).then(data => {
            this.setState({list: data});
        });
    }
}

export default withRouter(Search);