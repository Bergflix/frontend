import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

const Logo = () => {
  return (
    <Link className={"logo-wrapper"} to={"/"}>
      <span>Bergflix</span>
      <span id={"logoDot"}>.</span>
    </Link>
  );
};

export default Logo;
