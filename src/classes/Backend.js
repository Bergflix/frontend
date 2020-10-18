import axios from "axios";

class Backend {

    static baseUrl = "https://europe-west1-bergflix.cloudfunctions.net/backend/";
    loaded = false;
    loadListeners = [];

    constructor() {
        axios.get(Backend.baseUrl).then(() => {
                this.loaded = true;
                this.loadListeners.forEach(func => func.call());
            }).catch(e => console.error(e));
    }

    onLoad(func) {
        if(this.loaded) func.call();
        else this.loadListeners.push(func);
    }

    async get(key = "") {
        try {
            return (await axios.get(Backend.baseUrl + "media/" + key)).data;
        } catch(err) {
            return {error: true, response: err};
        }
    }

    async getList(type, limit = 0, start = 0) {
        try {
            return (await axios.get(Backend.baseUrl + type + "?sort=date" + (limit ? "&limit="+limit : "") + (start ? "&start="+start : ""))).data;
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
            return (await axios.get(Backend.baseUrl + "media?" + list.join("&"))).data;
        } catch(err) {
            return {error: true, response: err};
        }
    }
}

export default new Backend();
