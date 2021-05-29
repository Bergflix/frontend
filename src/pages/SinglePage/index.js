import React from 'react';
import "./style.scss";

const SinglePage = (props) => {
  return (
    <div>
      <h2>{props.page.title}</h2>
      <p>{props.page.text}</p>
    </div>
  );
};

export default SinglePage;
