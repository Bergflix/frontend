import React from "react";
import "./style.scss";
import {withRouter, Link} from "react-router-dom";
import Loading from "../Loading";
import DB from "../../classes/DB";

class ElementList extends React.Component {
    state = {
        loading: true,
        empty: true,
        list: []
    }

    constructor(props) {
        super(props);

        let promise;
        switch(props.type){
            case "series": promise = DB.getSeriesList(); break;
            case "movies": promise = DB.getMovieList(); break;
            case "search": promise = DB.getElementsByTitle(props.match.params.query); break;
            default: promise = DB.getLatestList(8);
        }

        promise.then(data => {
            this.setState({loading: false, empty: !data.length, list: data});
        });
    }

    componentDidMount() {
        this.props.setBackground && this.props.setBackground("");
    }

    render() {
        if(this.state.loading){
            return (
                <Loading />
            );
        }

        if(this.state.empty){
            return (
                <div id={"no-result"}>
                    <div className={"dialog"}>
                        <h3>Kein Ergebnis</h3>
                        <Link to={"/search"}>Erneut suchen</Link>
                    </div>
                </div>
            );
        }

        let list = this.state.list;
        return (
            <div id={"list-container"}>
                <div id={"list"}>
                    {list.map(item => {
                        let urlPart;
                        switch(item.type){
                            case "series": urlPart = "series"; break;
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

export default withRouter(ElementList);
