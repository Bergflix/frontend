import React from "react";
import "./style.scss";
import {Link} from "react-router-dom";

class ElementList extends React.Component {

    render() {
        if(!this.props.list) return;

        return (
            <div id={"list-container"}>
                <div id={"list"}>
                    {this.props.list.map(item => (
                        <Link key={item.key} className={"list-item"} to={`/watch/${item.key}`}>
                            <img className={"item-image"} alt={"Thumbnail"} src={item.thumbnail} />
                            <span className={"item-title"}>{item.title}</span>
                        </Link>)
                    )}
                </div>
            </div>
        );
    }
}

export default ElementList;
