const store = require('./store');

module.exports = (domains) => {
    let parent = -1, url = null;

    for (let i = 0; i < domains.length; i++) {
        url = null;

        for (let key in store.hosts) {
            if (store.hosts[key].domain === domains[i] && +store.hosts[key].parent === parent) {
                url = store.hosts[key].url;
                parent = +store.hosts[key].uid;
            }
        }

        if (url !== null) continue;

        for (let key in store.hosts) {
            if (store.hosts[key].domain === null && +store.hosts[key].parent === parent) {
                url = store.hosts[key].url;
                parent = +store.hosts[key].uid;
            }
        }

        if (url !== null) continue;

        return null;
    }

    return url;
};