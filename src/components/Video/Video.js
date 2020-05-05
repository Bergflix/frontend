import React from "react";
import "./style.scss";
import TitleBox from "./titleBox";
import DescriptionBox from "./descriptionBox";
import VideoBox from "./videoBox";
import OriginalBox from "./originalBox";
import Loading from "../Loading";

class Video extends React.Component {
    constructor(props) {
        super(props);

        let item;
        let loading = false;

        if(this.props.id !== ""){
            this.props.list.forEach(el => {
                if (this.props.id === el.value._id) {
                    item = el.value;
                }
            });
        }
        if(item === undefined){
            if(this.props.list.length > 0) {
                item = (this.props.list[0]).value;
            }else {
                loading = true;
            }
        }

        let subtitle = "Kurzfilm";

        this.state = {
            item,
            subtitle,
            loading
        };
    }

    render() {
        if(this.state.loading){
            return (<Loading />);
        }

        let item = this.state.item;
        let date = new Date(item.date);
        let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        let month = date.getMonth() < 10 ? "0"+date.getMonth() : date.getMonth();
        let dateStr = day+"."+month+"."+date.getFullYear();
        let producer = item.producer ? item.producer : "HerrBergmann";

        return (
            <div id={"video-container"}>
                <img id={"background-img"} alt={"Background"} src={item.thumbnail} width={"100%"} height={"auto"} />
                <div id={"overlay-container"}>
                    <TitleBox menuToggled={this.props.menuToggled} title={item.title} subtitle={this.state.subtitle} />
                    <DescriptionBox menuToggled={this.props.menuToggled} description={item.description} producer={producer} date={dateStr} />
                    <VideoBox ytid={item.ytid} />
                    <OriginalBox display={item.original} />
                </div>
            </div>
        );
    }
}

export default Video;
