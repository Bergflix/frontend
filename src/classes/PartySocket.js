import crypto from "crypto";

class PartySocket {
    constructor(socket) {
        this.socket = socket;

        socket.on("party", this.eventHandler);
    }

    eventHandler(e){
        let {event, data} = e;
        switch(event){
            case "created":
                console.log("CREATED", data);
                break;
            case "play":
                break;
            case "pause":
                break;
            default:
                console.warn(`Unknown event: ${event}`, data);
        }
    }

    emit(event, data){
        this.socket.emit("party", {event, data});
    }

    createRoom(name, password){
        let id = crypto.randomBytes(6).toString("hex");
        this.emit("create", {id, name, password});
        return id;
    }
}

export default PartySocket;
