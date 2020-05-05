import React from "react";

class OriginalBox extends React.Component {
    render() {
        return (
            <div id={"original-box"}>
                <div id={"original-content"} className={this.props.display === true ? "" : "hide"}>
                    <p>A <b>Bergflix</b> Original Production</p>
                </div>
            </div>
        );
    }
}

export default OriginalBox;