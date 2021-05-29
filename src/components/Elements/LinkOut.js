import { Fragment, useEffect } from "react";

const LinkOut = (props) => {

  useEffect(() => {
    if(props.to) {
      window.open(props.to, '_blank');
      window.history.back();
    };
  });

  return <Fragment />;
};

export default LinkOut;
