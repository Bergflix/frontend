import React from 'react';
import {v4 as uuid} from 'uuid';
import "./style.scss";
import {withRouter, NavLink} from "react-router-dom";
import SearchField from "../../components/Controls/SearchField";
import Logo from "../Elements/Logo";
import Icon from "../Elements/Icon";

class Header extends React.Component {
    navItems = [{
        title: "Home",
        href: "home"
    },{
        title: "Filme",
        href: "movies"
    },{
        title: "Serien",
        href: "series"
    },{
        title: "Party",
        href: "party"
    }];

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
                        <SearchField label={"Durchsuchen"} onSubmit={({query}) => this.props.history.push(`/search?q=${query}`)} />
                    </li>
                    <li className={"nav-profile nav-item"}>
                        <Icon type={"user"} />
                    </li>
                </ul>
            </div>
        );
    }
}

export default withRouter(Header);
