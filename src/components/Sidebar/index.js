import React from "react";
import "./style.scss";
import Icon from "../Elements/Icon";
import {Link, NavLink} from "react-router-dom";
import {v4 as uuid} from "uuid";

class Sidebar extends React.Component {

    lists = {
        "logged-in": [{
            icon: "user",
            href: "/profile",
            title: "Mein Profil"
        },{
            icon: "settings",
            href: "/settings",
            title: "Einstellungen"
        },{
            icon: "bookmark",
            href: "/favorites",
            title: "Favoriten"
        },{
            icon: "info",
            href: "/help",
            title: "Hilfe & Feedback"
        },{
            icon: "turn-off",
            href: "/signout",
            title: "Abmelden"
        }],
        "logged-out": [{
            icon: "user-add",
            href: "/signup",
            title: "Registrieren / Anmelden"
        },{
            icon: "settings",
            href: "/settings",
            title: "Einstellungen"
        },{
            icon: "info",
            href: "/help",
            title: "Hilfe & Feedback"
        }],
        footer: [{
            href: "/discord",
            title: "Discord"
        },{
            href: "/twitter",
            title: "Twitter"
        },{
            href: "/patreon",
            title: "Patreon"
        },{
            href: "/spreadshirt",
            title: "Spreadshirt"
        },{
            href: "/impressum",
            title: "Impressum"
        },{
            href: "/privacypolicy",
            title: "Datenschutzbestimmungen"
        }]
    };

    isOpener(target) {
        if(!target || target.tagName === "BODY") return false;
        if(!target.classList.contains("nav-profile")) return this.isOpener(target.parentElement);
        return true;
    }

    isSidebar(target) {
        if(!target || target.tagName === "BODY") return false;
        if(target.id !== "sidebar-container") return this.isSidebar(target.parentElement);
        return true;
    }

    componentDidMount() {
        document.addEventListener("click", ({target}) => {
            if(this.props.open && !this.isOpener(target) && !this.isSidebar(target)) this.props.toggle();
        });
    }

    render() {
        return (
            <div id={"sidebar-container"} className={this.props.open ? "" : "hide"}>
                <div id={"sidebar-header"} >
                    <div className={"title"}>
                        <h2>Menü</h2>
                    </div>
                    <Icon className={"close"} type={"close"} clickable={true} onClick={this.props.toggle}/>
                </div>
                <ul id={"sidebar-menu"}>
                    {this.lists[this.props.userIsLoggedIn ? "logged-in" : "logged-out"].map(item => (
                        <li key={uuid()}>
                            <NavLink to={item.href} onClick={this.props.toggle}>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <ul id={"sidebar-footer"}>
                    {this.lists.footer.map(item => (
                        <li key={uuid()}>
                            <Link to={item.href}>{item.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Sidebar;
