import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
PouchDB.plugin(PouchDBFind);

class Backend {

    db;
    loaded = false;
    loadListeners = [];

    constructor() {
      this.db = new PouchDB('content');
      this.callLoadListener();
      
      this.db.replicate.from(process.env.REACT_APP_DB_PATH, {
        live: true,
        retry: true
      }).on('paused', e => {
        this.callLoadListener();
        console.log(`DB replication paused${e && e.message ? ` - Cause: ${e.message}` : ''}`);
      }).on('complete', () => {
        this.callLoadListener();
        console.log(`DB repilcation successfully`);
      }).on('error', ({message}) => {
        this.callLoadListener();
        console.log(`DB replication error: ${message}`);
      });
    }

    onLoad(func) {
      if(this.loaded) func.call(this);
      else this.loadListeners.push(func);
    }

    callLoadListener() {
      this.loaded = true;
      this.loadListeners.forEach(func => func.call(this));
    }

    async get(key = '') {
      return await this.db.get(key);
    }

    async getList(type, orderBy = 'date', limit = 0, start = 0) {
      const { rows } = await this.db.query(`media/${type}-by-${orderBy}`, {
        reduce: false,
        descending: true
      });
      let ret = [];
      for(let i = 0; i < rows.length; i++) {
        if(i < start) continue;
        if(ret.length >= limit) break;
        ret.push(rows[i].value);
      }
      return ret;
    }

    async find(query = {}) {
      if(!Object.keys(query).length) return [];

      const selector = {};
      if(query.type) selector.type = {$eq: query.type};
      if(query.title) selector.title = {$regex: RegExp(query.title, 'i')};

      const { docs } = await this.db.find({selector});
      return docs;
    }
}

export default new Backend();
