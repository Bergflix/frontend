import React from 'react';
import "./controls.scss";

const TextField = (props) => {
  return (
    <label className={"control"}>
      <span>{props.label || "Text field"}</span>
      <input
        className={props.className || ""}
        type={props.type || "text"}
        name={props.name || ""}
        onChange={props.onChange || (() => { })}
        value={props.value || ""}
        autoComplete={props.autoComplete || ""}
      />
    </label>
  );
};

export default TextField;
