import React from 'react';
import "./style.scss";
import Loading from "../../components/Loading";
//import ElementList from "../../components/ElementList";
import {Link} from "react-router-dom";
import {v4 as uuid} from "uuid";

class Home extends React.Component {
    componentDidMount() {
        this.props.setBackground(this.props.featured.thumbnail);
    }

    render() {
        if(this.props.list === []){
            return (
                <Loading />
            );
        }

        let item = this.props.featured;
        let date = new Date(item.date.created);

        let info, len;
        switch(item.type){
            case "serien":
                info = `Serie - ${date.getFullYear()} - ${len = item.seasons.length} Staffel ${len !== 1 ? "n" : ""}`;
                break;
            case "filme":
            default:
                info = `Film - ${date.getFullYear()}`;
        }

        return (
            <div id={"home-container"}>
                <div id={"featured-details"}>
                    <img className={"logo"} src={item.logo || "https://via.placeholder.com/430x200"} alt={"Element Logo"}/><br />
                    <div className={"info"}>{info}</div>
                    <ul className={"tag-list"}>
                        {this.props.featured.tags.map(tag => (
                            <li key={uuid()} className={"tag-list-item"}><Link to={`/suche/${tag}`}>{tag}</Link></li>
                        ))}
                    </ul>
                    <div className={"description"}>{this.props.featured.description}</div>
                    <div className={"controls"}>
                        <Link to={`/${this.props.featured.type}/${this.props.featured.hash}`}>Jetzt anschauen</Link>
                        <Link to={`/${this.props.featured.type}/${this.props.featured.hash}`}>Details</Link>
                    </div>
                </div>
                {/* <ElementList title={"Neuerscheinungen"} list={this.props.list} /> */}
            </div>
        );
    }
}

export default Home;