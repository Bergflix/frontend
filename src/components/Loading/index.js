import React from 'react';
import "./style.scss";

class Loading extends React.Component {
    render() {
        return (
            <div id={"loading-container"}>
                <div className={"loading-spinner"} />
            </div>
        );
    }
}

export default Loading;