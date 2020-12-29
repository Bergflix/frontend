import React from "react";
import {withRouter, Redirect} from "react-router-dom";
import YouTube from "react-youtube";
import "./style.scss";
import Backend from "../../classes/Backend";
import Loading from "../../components/Loading";

class Watch extends React.Component {
    state = {
        loading: true,
        error: false,
        ytid: null
    };

    constructor(props) {
        super(props);
        const { key, part } = props.match.params;
        Backend.get(key)
            .then(data => {
                let ytid;
                if(data.type === 'movies') ytid = data.ytid;
                if(data.type === 'series' && part) ytid = part;
                this.setState({ loading: false, error: !ytid, ytid });
            })
            .catch(() => this.setState({ loading: false, error: true }));
    }

    componentDidMount() {
        this.props.setBackground && this.props.setBackground("");
    }

    render() {
        if(this.state.loading) return <Loading/>;
        if(this.state.error) return <Redirect to={"/home"} />;

        return (
            <div id={"watch-container"}>
                <YouTube containerClassName={"video-container"} id={"video"} videoId={this.state.ytid} opts={{
                    enablejsapi: 1,
                    width: "100%",
                    height: "100%",
                    iv_load_policy: 3,
                    modestbranding: 1,
                    origin: "bergflix.de",
                    rel: 0,
                    showinfo: 0
                }} />
            </div>
        );
    }
}

export default withRouter(Watch);
