import React from "react";
import {withRouter, Link} from "react-router-dom";
import io from "socket.io-client";
import YouTube from "react-youtube";
const config = require("../../config.json");

class PartyRoom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            video: "pupdeq1MoVw",
            room: props.match.params.room
        };
        this.emit = {
            play: true,
            pause: true
        };

        this.socket = io.connect(config.backend);
    }

    componentDidMount() {
        this.props.setBackground && this.props.setBackground("");
    }

    render() {
        return (
            <div id={"room-container"}>
                ROOM SITE
                <YouTube videoId={this.state.video} opts={{
                    width: 640,
                    height: 360,
                    playerVars: {
                        enablejsapi: 1,
                        modestbranding: 0,
                        showinfo: 0
                    }}} onReady={this.readyHandling} onPlay={this.playHandling} onPause={this.pauseHandling} onPlaybackRateChange={this.playbackHandling} />
                <Link to={"/party"} type={"button"}>Party verlassen</Link>
            </div>
        );
    }



    readyHandling = function(e){
        this.player = e.target;

        this.socket.on("play", function(data){
            this.setEmitPlay(false);
            this.player.seekTo(data.time);
            this.player.playVideo();
        }.bind(this));
        this.socket.on("pause", function(){
            this.setEmitPause(false);
            this.player.pauseVideo();
        }.bind(this));

        this.socket.emit("playerReady");
    }.bind(this);

    playHandling = function(){
        if(this.getEmitPlay()){
            this.socket.emit("playing", {room: this.props.room, time: this.player.getCurrentTime()});
        }else{
            this.setEmitPlay(true);
        }
    }.bind(this);

    pauseHandling = function(){
        if(this.getEmitPause()){
            this.socket.emit("paused", {room: this.props.room});
        }else{
            this.setEmitPause(true);
        }
    }.bind(this);

    playbackHandling = function(e){
        e.target.setPlaybackRate(1);
    };

    getEmitPlay(){
        return this.emit.play;
    }
    setEmitPlay(bool){
        this.emit.play = bool;
    }
    getEmitPause(){
        return this.emit.pause;
    }
    setEmitPause(bool){
        this.emit.pause = bool;
    }
}

export default withRouter(PartyRoom);
