import io from "socket.io-client";
import PartySocket from "./PartySocket";

class User {
    socket;

    constructor() {
        this.socket = io.connect("https://backend.bergflix.de");
        this.partySocket = new PartySocket(this.socket);
    }

    conn(){
        this.socket.emit("conn", {});
    }

    login(){
        this.socket.emit("login", {user: "Test", password: "Test"});
    }
}

export default new User();
