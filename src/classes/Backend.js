import axios from "axios";

class Backend {

    static baseUrl = "https://backend.bergflix.de/";
    loaded = false;
    loadListeners = [];

    constructor() {
        axios.get(Backend.baseUrl)
            .then(r => {
                this.loaded = true;
                this.loadListeners.forEach(func => func.call());
            })
            .catch(e => console.error(e));
    }

    onLoad(func){
        if(this.loaded) func.call();
        else this.loadListeners.push(func);
    }

    async getList(type, limit = 0, start = 0) {
        return (await axios.get(Backend.baseUrl + type + "?sort=date" + (limit ? "&limit="+limit : "") + (start ? "&start="+start : ""))).data;
    }

    async find(title) {
        return (await axios.get(Backend.baseUrl + "media?title=" + title)).data;
    }
}

export default new Backend();
