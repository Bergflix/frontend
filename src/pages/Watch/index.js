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
        key: "",
        type: "",
        ytid: "",
        title: "",
        date: {},
        producer: "",
        thumbnail: "",
        description: "",
        tags: [],
        logo: "",
        seasons: []
    };

    constructor(props) {
        super(props);
        Backend.get(props.match.params.key).then(data => this.setState({loading: false, error: !!data.error, ...data.response}));
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
