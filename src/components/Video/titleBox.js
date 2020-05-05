import React from "react";
import $ from "jquery";

class TitleBox extends React.Component {
    componentDidMount() {
        if(this.props.menuToggled) {
            setTimeout(() => {
                $("#title-content").addClass("toggled");
            }, 1);
        }else{
            setTimeout(() => {
                $("#title-content").removeClass("toggled");
            }, 1)
        }
    }

    render() {
        return (
            <div id={"title-box"}>
                <div id={"title-content"} className={this.props.menuToggled ? "" : "toggled"} >
                    <h1>{this.props.title}</h1>
                    <p>{this.props.subtitle}</p>
                </div>
            </div>
        );
    }
}

export default TitleBox;