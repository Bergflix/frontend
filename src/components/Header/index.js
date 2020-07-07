import React from 'react';
import {v4 as uuid} from 'uuid';
import "./style.scss";
import {Link, NavLink} from "react-router-dom";

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
    render() {
        return (
            <div id={"header-container"}>
                <ul id={"head-nav"}>
                    <li className={"nav-logo nav-item"}>
                        <Link id={"logo"} to={"/"}>
                            <span>Bergflix</span>
                            <span id={"logoDot"}>.</span>
                        </Link>
                    </li>
                    {this.navItems.map(item => (
                        <li key={uuid()} className={"nav-item"}>
                            <NavLink className={"nav-link"} to={item.href}>{item.title}</NavLink>
                        </li>
                    ))}
                    <li className={"nav-search nav-item"} style={{marginLeft: "auto"}}>
                        <span>
                            Search bar
                        </span>
                    </li>
                    <li className={"nav-profile nav-item"}>
                        <span>
                            Profile
                        </span>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Header;
