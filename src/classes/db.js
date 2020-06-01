import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";
PouchDB.plugin(PouchDBFind);

class DB {
    db;
    loaded = false;
    cache = {};
    loadListeners = [];

    constructor() {
        this.db = new PouchDB("bergflix");
        if(navigator.onLine){
            this.db.replicate.from("https://data.bergflix.de/").on("complete", () => {
                this.loaded = true;
                this.loadListeners.forEach(func => func());
            });
        }else{
            this.loaded = true;
            this.loadListeners.forEach(func => func());
        }
    }

    onLoad(func){
        this.loadListeners.push(func);
    }

    async getLatestList(limit){
        let docs = await this.db.query("scripts/all");
        let data = [];
        docs.rows.forEach(row => data.push(row.value));
        data.sort((a, b) => {
            a = new Date(a.date.added);
            b = new Date(b.date.added);
            return a > b ? -1 :  a < b ? 1 : 0;
        }).slice(0, limit);
        return data;
    }
    async getMovieList(){
        let docs = await this.db.query("scripts/movies");
        let data = [];
        docs.rows.forEach(row => data.push(row.value));
        return data;
    }
    async getSeriesList(){
        let docs = await this.db.query("scripts/series");
        let data = [];
        docs.rows.forEach(row => data.push(row.value));
        return data;
    }
    async getElementByKey(key){
        let data = await this.db.find({selector: {key}})
        return data.docs[0];
    }
    async getElementsByTitle(title) {
        let data = await this.db.find({
            selector: {
                title: {
                    "$regex": title
                }
            }
        });
        return data.docs;
    }
}

export default new DB();
