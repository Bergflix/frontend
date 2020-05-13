import React from "react";
import {withRouter} from "react-router-dom";

import ElementList from "../../components/ElementList";

import "./style.scss";

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: props.match.params.query || ""
        };
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
                           onChange={e => this.setState({query: e.target.value})}
                           onKeyDown={e => e.key === "Enter" && this.search(e.target.value)}/>
                </div>
                <div id={"result-list"}>
                    <ElementList title={""} list={[]}/>
                </div>
            </div>
        );
    }

    search(str){
        this.props.history.push(`/suche/${str}`);
    }
}

export default withRouter(Search);