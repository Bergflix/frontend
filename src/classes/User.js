import io from "socket.io-client";
import PartySocket from "./PartySocket";

class User {
    socket;
    partySocket;

    name;
    email;


    constructor() {
        this.socket = io.connect("https://backend.bergflix.de");
        this.partySocket = new PartySocket(this.socket);
    }

    conn(){
        this.socket.emit("conn", {});
    }

    login(){
        // Basic auth und Token auth sollten möglich sein. (Token auth für "angemeldet bleiben")
        this.socket.emit("login", {
            auth: "Basic",
            data: {
                name: "test@bergflix.de",
                password: "geheim"
            }
        });
    }
}

export default new User();
