const socket = io.connect(server);
let emit = {
    play: true,
    pause: true
};

socket.on("logToConsole", console.log);
socket.on("play", data => {
    emit.play = false;
    player.seekTo(data.time);
    player.playVideo();
});
socket.on("pause", () => {
    emit.pause = false;
    player.pauseVideo();
});



let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: 'A2UqIa7QgD0',
        playerParams: {
            enablejsapi: 1,
            modestbranding: 0,
            showinfo: 0
        },
        events: {
            'onReady': function(e){
                socket.emit("playerReady", {playerid: 1});
            },
            'onStateChange': function(e){
                switch(e.data) {
                    case YT.PlayerState.PLAYING:
                        if(emit.play){
                            socket.emit("playing", {time: e.target.getCurrentTime()});
                        }else{
                            emit.play = true;
                        }
                        break;
                    case YT.PlayerState.PAUSED:
                        if(emit.pause){
                            socket.emit("paused");
                        }else{
                            emit.pause = true;
                        }
                        break;
                }
            },
            'onPlaybackRateChange': function(e){
                e.target.setPlaybackRate(1);
            }
        }
    });
}