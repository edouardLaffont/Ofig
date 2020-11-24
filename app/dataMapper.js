const client = require('./database');

const dataMapper = {
    getAllFigurines: (callback) => {
        client.query(`SELECT * FROM "figurine"`, (err, data) => {
            if (err) {
                callback();
            } else {
                callback(data.rows);
            }
        });
    },

    getOneFigurine: (id, callback) => {
        client.query(`SELECT * FROM "figurine" WHERE "id"=$1`, [id], (err, data) => {
            if (err) {
                callback();
            } else {
               callback(data.rows[0]);

    }

        });
    },
}


module.exports = dataMapper;