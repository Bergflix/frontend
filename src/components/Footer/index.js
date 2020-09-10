import React from 'react';
import {v4 as uuid} from 'uuid';
import "./style.scss";
import {NavLink} from "react-router-dom";
import Icon from "../Elements/Icon";

class Footer extends React.Component {

    mobileNavItems = [{
        title: "Filme",
        icon: "video",
        href: "/movies"
    },{
        title: "Party",
        icon: "users",
        href: "/party"
    },{
        title: "Home",
        icon: "home",
        href: "/home"
    },{
        title: "Favoriten",
        icon: "bookmark",
        href: "/lists/favorites"
    },{
        title: "Einstellungen",
        icon: "settings",
        href: "/settings"
    }];

    render() {
        return (
            <div id={"footer-container"}>
                <ul id={"foot-nav"}>
                    {this.mobileNavItems.map(item => (
                        <li key={uuid()} className={"nav-item"}>
                            <NavLink className={"nav-link"} exact to={item.href}>
                                <Icon type={item.icon} />
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Footer;
