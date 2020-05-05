import React from "react";
import {withRouter} from "react-router-dom";

class VideoBox extends React.Component {
    render() {
        return (
            <div id={"video-box"}>
                <div id={"video-content"}>
                    <img alt={"Thumbnail"} src={"https://img.youtube.com/vi/"+this.props.ytid+"/maxresdefault.jpg"} />
                    <div id={"img-overlay"} onClick={this.handleClick}>
                        <p><i className={"fas fa-play-circle"} />Jetzt flixxen</p>
                    </div>
                </div>
            </div>
        );
    }

    handleClick = function(){
        this.props.history.push("/watch/" + this.props.ytid);
    }.bind(this);
}

export default withRouter(VideoBox);