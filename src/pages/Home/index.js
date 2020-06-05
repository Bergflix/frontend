import React from 'react';
import "./style.scss";
import Loading from "../../components/Loading";
import {Link} from "react-router-dom";
import {v4 as uuid} from "uuid";
import DB from "../../classes/DB";

class Home extends React.Component {
    state = {
        list: []
    }

    constructor(props) {
        super(props);

        DB.getLatestList(5).then(data => {
            this.setState({list: data});
            props.setBackground && props.setBackground(this.state.list[0].thumbnail);
        })
    }

    render() {
        if(!this.state.list.length){
            return (
                <Loading />
            );
        }

        let featured = this.state.list[0];
        let date = new Date(featured.date.created);

        let info, len;
        switch(featured.type){
            case "series":
                info = `Serie - ${date.getFullYear()} - ${len = featured.seasons.length} Staffel ${len !== 1 ? "n" : ""}`;
                break;
            case "movies":
            default:
                info = `Film - ${date.getFullYear()}`;
        }

        return (
            <div id={"home-container"}>
                <div id={"featured-details"}>
                    <img className={"logo"} src={featured.logo} alt={"Element Logo"}/><br />
                    <div className={"info"}>{info}</div>
                    <ul className={"tag-list"}>
                        {featured.tags.map(tag => (
                            <li key={uuid()} className={"tag-list-item"}><Link to={`/search/${tag}`}>{tag}</Link></li>
                        ))}
                    </ul>
                    <div className={"description"}>{featured.description}</div>
                    <div className={"controls"}>
                        <Link to={`/${featured.type}/${featured.key}`}>Jetzt anschauen</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
