import React from "react";
import TitleBox from "./titleBox";
import DescriptionBox from "./descriptionBox";
import VideoBox from "./videoBox";
import OriginalBox from "./originalBox";
import PartSwitchBox from "./partSwitchBox";

class Series extends React.Component {
    constructor(props) {
        super(props);

        let item;
        let part;
        let subtitle;
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

        if(item){
            part = item.parts[0];
            subtitle = part.title;
        }

        this.state = {
            item,
            part,
            subtitle,
            loading
        };
    }

    render() {
        if(this.state.loading){
            return (
                <div>Loading...</div>
            );
        }

        let item = this.state.item;
        let part = this.state.part;
        let date = new Date(item.date);
        let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        let month = date.getMonth() < 10 ? "0"+date.getMonth() : date.getMonth();
        let dateStr = day+"."+month+"."+date.getFullYear();
        let producer = item.producer ? item.producer : "HerrBergmann";

        return (
            <div id={"series-container"}>
                <img id={"background-img"} alt={"Background"} src={item.thumbnail} width={"100%"} height={"auto"} />
                <div id={"overlay-container"}>
                    <TitleBox menuToggled={this.props.menuToggled} title={item.title} subtitle={this.state.subtitle} />
                    <DescriptionBox menuToggled={this.props.menuToggled} description={part.description} producer={producer} date={dateStr} />
                    <VideoBox ytid={part.ytid} />
                    <PartSwitchBox parts={item.parts} />
                    <OriginalBox display={part.original} />
                </div>
            </div>
        );
    }
}

export default Series;