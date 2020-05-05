import shuffle from "shuffle-array";

// Helper to get the 6 newest Elements (films AND series)
export function getLatestList(db){
    return new Promise(function(resolve, reject){
        db.query("allvideos/all").then(docs => {
            let data = [];
            docs.rows.forEach(row => data.push(row.value));
            data.sort((a, b) => {
                a = new Date(a.date.added);
                b = new Date(b.date.added);
                return a > b ? -1 :  a < b ? 1 : 0;
            }).slice(0, 6);
            shuffle(data);
            resolve(data);
        }).catch(err => reject(err));
    });
}

// Helper to get all Films
export function getFilmList(db){
    return new Promise(function(resolve, reject){
        db.query("allvideos/videos").then(docs => {
            let data = [];
            docs.rows.forEach(row => data.push(row.value));
            resolve(data);
        }).catch(err => reject(err));
    });
}

// Helper to get all Series
export function getSeriesList(db){
    return new Promise(function(resolve, reject){
        db.query("allvideos/series").then(docs => {
            let data = [];
            docs.rows.forEach(row => data.push(row.value));
            resolve(data);
        }).catch(err => reject(err));
    });
}

// Helper to get one specific element (by the hash)
export function getElementByHash(db, hash) {
    return new Promise((resolve, reject) => {
        db.find({selector: {hash}}).then(data => {
            resolve(data.docs[0]);
        }).catch(err => reject(err));
    });
}