import React from 'react';
import "./style.scss";

class BackgroundImage extends React.Component {
    render() {
        return (
            <span id={"background"} style={{backgroundImage: `linear-gradient(103deg, rgba(0, 0, 0, 0.95) 5%, transparent 40%), url(${this.props.image})`}} />
        );
    }
}

export default BackgroundImage;