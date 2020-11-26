import axios from "axios";

class Backend {

    static remoteURL = "https://europe-west1-bergflix.cloudfunctions.net/backend/";
    static localURL = `http://${window.location.hostname}:5001/bergflix/europe-west1/backend/`;

    static axios;
    loaded = false;
    loadListeners = [];

    constructor() {
        let url = Backend.remoteURL;
        if(!process.env.NODE_ENV || process.env.NODE_ENV === "development") url = Backend.localURL;

        Backend.axios = axios.create({baseURL: url});
        Backend.axios.get("").then(() => {
            this.loaded = true;
            this.loadListeners.forEach(func => func.call(this));
        }).catch(() => {
            Backend.axios = axios.create({baseURL: Backend.remoteURL});
            Backend.axios.get("").then(() => {
                this.loaded = true;
                this.loadListeners.forEach(func => func.call(this));
            }).catch(e => console.log("DB-ERROR", e));
        });
    }

    onLoad(func) {
        if(this.loaded) func.call();
        else this.loadListeners.push(func);
    }

    async get(key = "") {
        try {
            return (await Backend.axios.get(`media/${key}`)).data;
        } catch(e) {
            return {error: true, response: e};
        }
    }

    async getList(type, limit = 0, start = 0) {
        try {
            return (await Backend.axios.get(`${type}?sort=date${limit?`&limit=${limit}`:``}${start?`&start=${start}`:``}`)).data;
        } catch(err) {
            return {error: true, response: err};
        }
    }

    async find(query = {}) {
        let keys = Object.keys(query);
        if(!keys.length) return [];

        let list = [];
        keys.forEach(prop => query[prop] && list.push(prop + "=" + query[prop]));
        try {
            return (await Backend.axios.get(`media?${list.join("&")}`)).data;
        } catch(err) {
            return {error: true, response: err};
        }
    }
}

export default new Backend();
