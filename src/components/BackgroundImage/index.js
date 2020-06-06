import React from 'react';
import "./style.scss";

class BackgroundImage extends React.Component {
    render() {
        return (
            <span id={"background"} style={{
                backgroundImage: `linear-gradient(100deg, rgba(0,0,0, 0.95) 0, transparent 14rem),
                                  linear-gradient(180deg, rgba(0,0,0, 0.6) 0, transparent 6rem),
                                  linear-gradient(10deg, #f40f3a 1rem, transparent 7rem),
                                  linear-gradient(-5deg, #f40f3a 1rem, transparent 8rem),
                                  url(${this.props.image})`
            }} />
        );
    }
}

export default BackgroundImage;
