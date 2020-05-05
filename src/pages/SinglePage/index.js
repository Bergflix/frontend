import React from 'react';

import "./style.scss";

class SinglePage extends React.Component {
    render() {
        return(
            <div>
                <h2>{this.props.page.title}</h2>
                <p>{this.props.page.text}</p>
            </div>
        );
    }
}

export default SinglePage;
