import React from 'react';
import "./style.scss";

class NotFound extends React.Component {

    componentDidMount() {
        this.props.setBackground && this.props.setBackground("https://share.bergflix.de/imgs/bergi.png");
    }

    render() {
        return (
            <div id={"nf-container"}>
                <span id={"nf-title"}>
                    404
                    <p id={"ops"}>Ooops!</p>
                    <p>Diese Seite wurde nicht gefunden.</p>
                </span>
            </div>
        );
    }
}

export default NotFound;