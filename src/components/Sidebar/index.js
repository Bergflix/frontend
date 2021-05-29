import { useState, useEffect } from "react";
import "./style.scss";
import Icon from "../Elements/Icon";
import { Link, /* NavLink*/ } from "react-router-dom";
import { v4 as uuid } from "uuid";
//import TextField from "../Controls/TextField";

const Sidebar = (props) => {
  const lists = {
    main: [{
      icon: "user",
      href: "/profile",
      title: "Mein Profil"
    }, {
      icon: "settings",
      href: "/settings",
      title: "Einstellungen"
    }, {
      icon: "bookmark",
      href: "/favorites",
      title: "Favoriten"
    }, {
      icon: "info",
      href: "/help",
      title: "Hilfe & Feedback"
    }, {
      icon: "turn-off",
      href: "/signout",
      title: "Abmelden"
    }],
    footer: [{
      href: "/discord",
      title: "Discord"
    }, {
      href: "/twitter",
      title: "Twitter"
    }, {
      href: "/patreon",
      title: "Patreon"
    }, {
      href: "/spreadshirt",
      title: "Spreadshirt"
      /*
      }, {
          href: "/impressum",
          title: "Impressum"
      }, {
          href: "/privacypolicy",
          title: "Datenschutz"
      */
    }]
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isOpener = (target) => {
    if (!target || target.tagName === "BODY") return false;
    if (!target.classList.contains("nav-profile")) return isOpener(target.parentElement);
    return true;
  };

  const isSidebar = (target) => {
    if (!target || target.tagName === "BODY") return false;
    if (target.id !== "sidebar-container") return isSidebar(target.parentElement);
    return true;
  };

  useEffect(() => {
    document.addEventListener("click", ({ target }) => {
      if (props.open && !isOpener(target) && !isSidebar(target)) props.toggle();
    });
  });

  return (
    <div id={"sidebar-container"} className={props.open ? "" : "hide"}>
      <div id={"sidebar-header"} >
        <div className={"title"}>
          <h2>Menü</h2>
        </div>
        <Icon className={"close"} type={"close"} clickable={true} onClick={props.toggle} />
      </div>
      <ul id={"sidebar-footer"}>
        {lists.footer.map(item => (
          <li key={uuid()}>
            <Link to={item.href}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
