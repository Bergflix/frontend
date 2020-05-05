import React from "react";
import $ from "jquery";

class DescriptionBox extends React.Component {
    componentDidMount() {
        if(this.props.menuToggled) {
            setTimeout(() => {
                $("#description-content").addClass("toggled");
            }, 1);
        }else{
            setTimeout(() => {
                $("#description-content").removeClass("toggled");
            }, 1)
        }
    }

    render() {
        return (
            <div id={"description-box"}>
                <div id={"description-content"} className={this.props.menuToggled ? "" : "toggled"} >
                    <h2 className={"description title"}>{"Beschreibung"}</h2>
                    <p className={"description text"}>{this.props.description}</p>
                    <div className={"description data"}>
                        <h3>Produzent &emsp; - &emsp; {this.props.producer}</h3>
                        <h3>Erschienen &emsp; - &emsp; {this.props.date}</h3>
                    </div>
                </div>
            </div>
        );
    }
}

export default DescriptionBox;