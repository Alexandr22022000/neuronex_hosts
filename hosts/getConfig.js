const pg = require('pg'),
    store = require('./store'),
    QUERY = require('./pSQL'),
    config = require('../config');

module.exports = () => {
    const pool = pg.Pool({connectionString: config.DATABASE_URL});
    pool.query(QUERY.GET_CONFIG)
        .then((data) => store.hosts = data.rows);
};