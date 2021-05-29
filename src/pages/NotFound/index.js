import React, { useEffect } from 'react';
import "./style.scss";

const NotFound = (props) => {

  useEffect(() => props.setBackground && props.setBackground('https://cdn.bergflix.de/imgs/bergi.png'));

  return (
    <div id={"nf-container"}>
      <span className={"nf-title"}>
        404
        <p className={"ops"}>Ooops!</p>
        <p>Diese Seite wurde nicht gefunden.</p>
      </span>
    </div>
  );
};

export default NotFound;
