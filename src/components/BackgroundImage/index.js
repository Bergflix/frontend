import React from 'react';
import "./style.scss";

class BackgroundImage extends React.Component {
    render() {
        return (
            <span id={"background"} style={{
                backgroundImage: `linear-gradient(100deg, rgba(0, 0, 0, 0.95) 5%, transparent 25%),
                                  linear-gradient(170deg, rgba(0, 0, 0, 0.95) 5%, transparent 20%),
                                  url(${this.props.image})`
            }} />
        );
    }
}

export default BackgroundImage;