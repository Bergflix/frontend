import io from "socket.io-client";
import config from "./config.json";
import crypto from "crypto";

export function createPartyRoom(name, password){
    let id = crypto.randomBytes(6).toString("hex");
    let socket = io.connect(config.backend);
    socket.emit("ehlo", {room: id});
    return id;
}