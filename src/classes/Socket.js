import io from "socket.io-client";
import PartySocket from "./PartySocket";

class Socket {
    socket;

    constructor() {
        this.socket = io.connect("http://192.168.178.74:8080" || "https://backend.bergflix.de");
        this.partySocket = new PartySocket(this.socket);
    }

    conn(){
        this.socket.emit("conn", {});
    }

    login(){
        this.socket.emit("login", {user: "Test", password: "Test"});
    }
}

export default new Socket();
