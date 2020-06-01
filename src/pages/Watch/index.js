import React from "react";
import {withRouter} from "react-router-dom";
import YouTube from "react-youtube";
import "./style.scss";
import {getElementByKey} from "../../misc";

class Watch extends React.Component {
    state = {
        type: "",
        ytid: "",
        title: "",
        date: "",
        producer: "",
        thumbnail: "",
        description: "",
        parts: ""
    };
    constructor(props) {
        super(props);

        let key = props.match.params.key;
        getElementByKey(key).then(data => {
            this.setState({
                type: data.type,
                ytid: data.ytid,
                title: data.title,
                date: data.date,
                producer: data.producer,
                thumbnail: data.thumbnail,
                description: data.description,
                parts: data.parts
            });
        });
    }

    shouldComponentUpdate(nextProps, nextState, nextContext){
        return nextState.ytid !== "" && nextState !== this.state;
    }

    render() {
        let ytid = this.state.ytid;
        if(!ytid || ytid === "") {
            if(!this.parts || !(ytid = this.parts[0].ytid) || ytid === "") {
                return (
                    <div>
                        Loading...
                    </div>
                );
            }
        }

        return (
            <div id={"watch-container"}>
                <YouTube containerClassName={"video-container"} id={"video"} videoId={ytid} opts={{
                    enablejsapi: 1,
                    width: "100%",
                    height: "100%",
                    iv_load_policy: 3,
                    modestbranding: 1,
                    origin: "dev.bergflix.de",
                    rel: 0,
                    showinfo: 0
                }} />
            </div>
        );
    }
}

export default withRouter(Watch);