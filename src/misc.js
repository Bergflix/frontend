import crypto from "crypto";
import Socket from "./classes/Socket";

export function createPartyRoom(name, password){
    let id = crypto.randomBytes(6).toString("hex");
    Socket.partyHandler.emit("create", {id, name, password});
    return id;
}