import React from "react";
import "./style.scss";
import {Link} from "react-router-dom";
import Loading from "../Loading";

class ElementList extends React.Component {
    componentDidMount(){
        this.props.setBackground && this.props.setBackground("");
    }

    render() {
        if(this.props.list === []){
            return (
                <Loading />
            );
        }

        return (
            <div id={"list-container"}>
                <div id={"list-title"}>
                    <span>{this.props.title}</span>
                </div>
                <div id={"list"}>
                    {this.props.list.map(item => (
                        <Link key={item._id} className={"list-item"} to={`/${this.props.type}/${item.hash}`}>
                            <img className={"item-image"} alt={"Thumbnail"} src={item.thumbnail} />
                            <span className={"item-title"}>{item.title}</span>
                        </Link>
                    ))}
                </div>
            </div>
        );
    }
}

export default ElementList;