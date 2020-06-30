import React from 'react';
import "./style.scss";
import Loading from "../../components/Loading";
import {Link} from "react-router-dom";
import {v4 as uuid} from "uuid";
import Backend from "../../classes/Backend";

class Home extends React.Component {
    state = {
        list: [],
        featured: {}
    }

    constructor(props) {
        super(props);

        Backend.getList("media", 5).then(data => {
            this.setState({list: data.response, featured: data.response[0]});
            props.setBackground && props.setBackground(this.state.list[0].thumbnail);
        })
    }

    replaceLogo(element){
        element.outerHTML = `<p class="logo" style="font-size: 5rem;">${this.state.featured.title}</p>`;
    }

    render() {
        if(!this.state.list.length){
            return (
                <Loading />
            );
        }

        let date = new Date(this.state.featured.date.created);

        let info, len;
        switch(this.state.featured.type){
            case "series":
                info = `Serie - ${date.getFullYear()} - ${len = this.state.featured.seasons.length} Staffel ${len !== 1 ? "n" : ""}`;
                break;
            case "movies":
            default:
                info = `Film - ${date.getFullYear()}`;
        }

        return (
            <div id={"home-container"}>
                <img className={"logo"} src={this.state.featured.logo} alt={"Element Logo"} onError={e => this.replaceLogo(e.target)}/>
                <div className={"info"}>{info}</div>
                <ul className={"tag-list"}>
                    {this.state.featured.tags.map(tag => (
                        <li key={uuid()} className={"tag-list-item"}><Link to={`/search/${tag}`}>{tag}</Link></li>
                    ))}
                </ul>
                <div className={"description"}>{this.state.featured.description}</div>
                <div className={"controls"}>
                    <Link to={`/${this.state.featured.type}/${this.state.featured.key}`}>Jetzt anschauen</Link>
                </div>
            </div>
        );
    }
}

export default Home;
