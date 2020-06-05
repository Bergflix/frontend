import React from "react";
import "./style.scss";
import {Link} from "react-router-dom";
import Loading from "../Loading";
import DB from "../../classes/DB";

class ElementList extends React.Component {
    state = {
        list: []
    }

    constructor(props) {
        super(props);

        let promise;
        switch(props.type){
            case "series": promise = DB.getSeriesList(); break;
            case "movies": promise = DB.getMovieList(); break;
            default:promise = DB.getLatestList(8); break;
        }
        this.props.setBackground && this.props.setBackground("");
        promise.then(data => {
            this.setState({list: data});
        });
    }

    render() {
        if(!this.state.list.length){
            return (
                <Loading />
            );
        }

        let list = this.props.list || this.state.list;
        return (
            <div id={"list-container"}>
                <div id={"list-title"}>
                    <span>{this.props.title}</span>
                </div>
                <div id={"list"}>
                    {list.map(item => {
                        let urlPart;
                        switch(item.type){
                            case "series": urlPart = "series"; break;
                            case "movie":
                            default: urlPart = "movies"; break;
                        }
                        return (
                            <Link key={item._id} className={"list-item"} to={`/${urlPart}/${item.key}`}>
                                <img className={"item-image"} alt={"Thumbnail"} src={item.thumbnail} />
                                <span className={"item-title"}>{item.title}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default ElementList;