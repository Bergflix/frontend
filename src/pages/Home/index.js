import React from 'react';
import "./style.scss";
import Loading from "../../components/Loading";
import {Link} from "react-router-dom";
import Backend from "../../classes/Backend";
import Icon from "../../components/Elements/Icon";

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

    replaceLogo(element) {
        element.outerHTML = `<p class="logo" style="font-size: 5rem;">${this.state.featured.title}</p>`;
    }

    render() {
        if(!this.state.list.length) return (<Loading />);

        let date = new Date(this.state.featured.date.created);
        let year = date.getFullYear();
        let {age, genre} = this.state.featured;

        return (
            <div id={"home-container"}>
                <img className={"logo"} src={this.state.featured.logo} alt={"Element Logo"} onError={e => this.replaceLogo(e.target)}/>
                <div className={"info"}>
                    <span>{year}</span>
                    <span>{age}+</span>
                    <span>{genre}</span>
                </div>
                <div className={"description"}>{this.state.featured.description}</div>
                <div className={"controls"}>
                    <Link to={`/watch/${this.state.featured.key}`}><Icon type={"play"} /><span>Jetzt anschauen</span></Link>
                </div>
            </div>
        );
    }
}

export default Home;
