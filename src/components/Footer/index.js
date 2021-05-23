import React from 'react';
import { v4 as uuid } from 'uuid';
import "./style.scss";
import { NavLink } from "react-router-dom";
import Icon from "../Elements/Icon";

const Footer = () => {
  const mobileNavItems = [{
    icon: "users",
    href: "/party"
  }, {
    icon: "search",
    href: "/search"
  }, {
    icon: "home",
    href: "/home"
  }, {
    icon: "video",
    href: "/media"
  }, {
    icon: "user",
    href: "/profile"
  }];


  return (
    <div id={"footer-container"}>
      <ul id={"foot-nav"}>
        {mobileNavItems.map(item => (
          <li key={uuid()} className={"nav-item"}>
            <NavLink className={"nav-link"} exact to={item.href}>
              <Icon type={item.icon} className={"nav-icon"} clickable={true} />
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Footer;
