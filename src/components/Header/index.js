import React from 'react';
import {v4 as uuid} from 'uuid';
import "./style.scss";
import {Link, NavLink} from "react-router-dom";

class Header extends React.Component {
    navItems = [{
        title: "Filme",
        href: "/filme"
    },{
        title: "Serien",
        href: "/serien"
    },{
        title: "Suche",
        href: "/suche"
    },{
        title: "Party",
        href: "/party"
    }];
    render() {
        return (
            <div id={"header-container"}>
                <Link id={"logo"} to={"/"}>Bergflix<span id={"logoDot"}>.</span></Link>
                <ul id={"head-nav"}>
                    {this.navItems.map(item => (
                        <li key={uuid()} className={"nav-item"}>
                            <NavLink className={"nav-link"} to={item.href}>{item.title}</NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Header;