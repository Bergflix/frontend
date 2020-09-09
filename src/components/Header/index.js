import React from 'react';
import {v4 as uuid} from 'uuid';
import "./style.scss";
import {NavLink} from "react-router-dom";
import TextField from "../../components/Controls/TextField";
import Logo from "../Elements/Logo";
import Icon from "../Elements/Icon";

class Header extends React.Component {
    navItems = [{
        title: "Home",
        href: "/home",
        icon: ""
    },{
        title: "Filme",
        href: "/movies"
    },{
        title: "Serien",
        href: "/series"
    },{
        title: "Party",
        href: "/party"
    }];

    state = {
        search: ""
    }

    render() {
        return (
            <div id={"header-container"}>
                <ul id={"head-nav"}>
                    <li className={"nav-logo nav-item"}>
                        <Logo />
                    </li>
                    {this.navItems.map(item => (
                        <li key={uuid()} className={"nav-item"}>
                            <NavLink className={"nav-link"} to={item.href}>{item.title}</NavLink>
                        </li>
                    ))}
                    <li className={"nav-search nav-item"} style={{marginLeft: "auto"}}>
                        <TextField label={"Durchsuchen"} value={this.state.search} onChange={({target}) => this.setState({search: target.value})} />
                    </li>
                    <li className={"nav-profile nav-item"}>
                        <Icon type={"profile"} />
                    </li>
                </ul>
            </div>
        );
    }
}

export default Header;
