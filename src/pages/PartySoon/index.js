import React from 'react';
import "./style.scss";

class PartySoon extends React.Component {

    componentDidMount() {
        this.props.setBackground && this.props.setBackground("https://cdn.bergflix.de/imgs/captain_pineapple.png");
    }

    render() {
        return (
            <div id={"ps-container"}>
                <span className={"ps-info"}>
                    <p className={"ps-title"}>Coming soon!</p>
                    <p>Wir arbeiten tatenkräftig am <span>Partymodus</span>.</p>
                    <p>Bitte habe noch etwas Geduld!</p>
                </span>
            </div>
        );
    }
}

export default PartySoon;
