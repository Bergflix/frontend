import React from "react";
import "./style.scss";
import Icon from "../../components/Elements/Icon";

class Rotate extends React.Component {

    render() {
        return (
            <div id={"rotate-container"}>
                <div className={"content"}>
                    <h1>Bitte drehe dein Gerät</h1>
                    <Icon type={"settings"} />
                </div>
            </div>
        );
    }
}

export default Rotate;
